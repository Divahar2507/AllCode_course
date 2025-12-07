import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaChevronLeft, FaChevronRight, FaMoon, FaUserCircle, FaPlayCircle, FaFileAlt, FaCheckCircle, FaChevronDown, FaChevronUp, FaLock, FaGlobe, FaCode, FaTerminal } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup'; // HTML
import 'prismjs/themes/prism-tomorrow.css';
import './LessonView.css';
import API_URL from '../config';

const LessonView = () => {
    const { courseId, topicId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [currentTopic, setCurrentTopic] = useState(null);
    const [currentModule, setCurrentModule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedModule, setExpandedModule] = useState(null);

    // Editor State
    const [editorMode, setEditorMode] = useState('java'); // 'java' or 'web'

    // Java State
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false); // For backend run
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Web State
    const [webCode, setWebCode] = useState({
        html: '',
        css: '',
        js: ''
    });
    const [activeWebTab, setActiveWebTab] = useState('html');
    const [srcDoc, setSrcDoc] = useState('');
    const [consoleLogs, setConsoleLogs] = useState([]);

    useEffect(() => {
        fetchCourseAndTopic();
    }, [courseId, topicId]);

    // Listen for console messages from iframe
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data && event.data.type === 'console') {
                setConsoleLogs(prev => [...prev, {
                    type: event.data.method,
                    message: event.data.args.join(' ')
                }]);
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const fetchCourseAndTopic = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/api/courses/${courseId}`);
            const courseData = res.data;
            setCourse(courseData);

            let foundTopic = null;
            let foundModule = null;

            if (courseData.modules) {
                for (const mod of courseData.modules) {
                    const topic = mod.topics.find(t => t._id === topicId);
                    if (topic) {
                        foundTopic = topic;
                        foundModule = mod;
                        setExpandedModule(mod._id);
                        break;
                    }
                }
                if (!expandedModule && courseData.modules.length > 0) {
                    setExpandedModule(courseData.modules[0]._id);
                }
            }

            if (foundTopic) {
                const enrichedTopic = enrichTopicData(foundTopic);
                setCurrentTopic(enrichedTopic);
                setCurrentModule(foundModule);

                // Initialize default code
                setCode(enrichedTopic.problem?.starterCode || '// Write your code here');
                setOutput('');
                setIsSubmitted(false);

                // Auto-switch mode based on topic content/title if applicable
                if (foundTopic.title.toLowerCase().includes('html') || foundTopic.title.toLowerCase().includes('web')) {
                    setEditorMode('web');
                } else {
                    setEditorMode('java');
                }
            }
            setLoading(false);
        } catch (err) {
            console.error('Error fetching course:', err);
            setLoading(false);
        }
    };

    const enrichTopicData = (topic) => {
        const enriched = { ...topic };
        if (!enriched.intro) enriched.intro = `Welcome to the deep dive on **${topic.title}**. In this section, we will explore the core concepts.`;
        if (!enriched.story) enriched.story = `**${topic.title}** logic is fundamental...`;
        if (!enriched.importantQuestions || enriched.importantQuestions.length === 0) {
            enriched.importantQuestions = [
                { question: `What is ${topic.title}?`, answer: "It is a key concept." }
            ];
        }
        if (!enriched.summary) enriched.summary = `Review **${topic.title}** to master it.`;

        if (!enriched.problem) {
            enriched.problem = {
                title: `Practice: ${topic.title}`,
                description: `Write a program to demonstrate ${topic.title}.`,
                starterCode: `public class Main {\n    public static void main(String[] args) {\n        // Implement ${topic.title}\n        System.out.println("Hello World");\n    }\n}`,
                solution: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Success");\n    }\n}`,
                testCase: { input: "", output: "Success" }
            };
        }
        return enriched;
    };

    const handleTopicClick = (modId, tId) => {
        navigate(`/course/${courseId}/lesson/${tId}`);
    };

    const toggleModule = (modId) => {
        setExpandedModule(expandedModule === modId ? null : modId);
    };

    const handleNext = () => {
        if (!course) return;
        const allTopics = [];
        course.modules.forEach(mod => mod.topics.forEach(t => allTopics.push(t)));
        const idx = allTopics.findIndex(t => t._id === topicId);
        if (idx < allTopics.length - 1) {
            navigate(`/course/${courseId}/lesson/${allTopics[idx + 1]._id}`);
        } else {
            alert("Course Completed!");
        }
    };

    const handlePrev = () => {
        if (!course) return;
        const allTopics = [];
        course.modules.forEach(mod => mod.topics.forEach(t => allTopics.push(t)));
        const idx = allTopics.findIndex(t => t._id === topicId);
        if (idx > 0) {
            navigate(`/course/${courseId}/lesson/${allTopics[idx - 1]._id}`);
        }
    };

    // --- JAVA RUN ---
    const handleRunJava = async () => {
        setIsRunning(true);
        setOutput("Running...");
        try {
            const res = await axios.post(`${API_URL}/api/run`, {
                language: 'java',
                code: code,
                input: currentTopic.problem?.testCase?.input || ''
            });
            setOutput(res.data.output);
        } catch (err) {
            setOutput("Error: " + err.message);
        } finally {
            setIsRunning(false);
        }
    };

    const handleJavaSubmit = () => {
        if (output.trim().includes(currentTopic.problem?.testCase?.output)) {
            setIsSubmitted(true);
            alert("Correct! Good job.");
        } else {
            alert(`Incorrect. Expected output: ${currentTopic.problem?.testCase?.output}`);
        }
    };

    // --- WEB RUN ---
    const handleRunWeb = () => {
        setConsoleLogs([]); // Clear console
        const script = `
            <script>
                const customConsole = {
                    log: function(...args) { window.parent.postMessage({type: 'console', method: 'log', args: args}, '*'); },
                    error: function(...args) { window.parent.postMessage({type: 'console', method: 'error', args: args}, '*'); },
                    warn: function(...args) { window.parent.postMessage({type: 'console', method: 'warn', args: args}, '*'); },
                    info: function(...args) { window.parent.postMessage({type: 'console', method: 'info', args: args}, '*'); }
                };
                window.console = { ...window.console, ...customConsole };
                window.onerror = function(msg, url, line) {
                    customConsole.error(msg + " (Line " + line + ")");
                };
            </script>
        `;
        const combined = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>${webCode.css}</style>
            </head>
            <body>
                ${webCode.html}
                ${script}
                <script>${webCode.js}</script>
            </body>
            </html>
        `;
        setSrcDoc(combined);
    };

    if (loading) return <div className="loading-spinner">Loading...</div>;
    if (!currentTopic) return <div className="error-message">Topic not found</div>;

    return (
        <div className="lesson-page">
            <header className="lesson-header">
                <div className="lesson-header-left">
                    <div className="topic-breadcrumb">
                        <span className="folder-icon">📁</span>
                        <span>{currentModule?.title}</span>
                        <FaChevronRight size={10} />
                        <span>{currentTopic.title}</span>
                    </div>
                </div>
                <div className="lesson-header-right">
                    <div className="toggle-switch">
                        <button className="toggle-btn active">Learn</button>
                        <button className="toggle-btn">Practice</button>
                    </div>
                    <button className="icon-only-btn" onClick={() => navigate('/profile')}><FaUserCircle /></button>
                </div>
            </header>

            <div className="lesson-body-container">
                {/* Sidebar */}
                <div className="course-sidebar">
                    <div className="sidebar-header">Course Content</div>
                    <div className="sidebar-content">
                        {course.modules.map(mod => (
                            <div key={mod._id} className="module-group">
                                <div className="module-header" onClick={() => toggleModule(mod._id)}>
                                    <span>{mod.title}</span>
                                    {expandedModule === mod._id ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {expandedModule === mod._id && (
                                    <div className="topic-list">
                                        {mod.topics.map(t => (
                                            <div
                                                key={t._id}
                                                className={`topic-item-sidebar ${t._id === topicId ? 'active' : ''}`}
                                                onClick={() => handleTopicClick(mod._id, t._id)}
                                            >
                                                {t.completed ? <FaCheckCircle className="check-icon" /> : <div style={{ width: 12, height: 12, borderRadius: '50%', border: '1px solid #ccc' }}></div>}
                                                <span>{t.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="main-content-area">
                    <div className="content-wrapper">
                        {/* 1. Content Sections */}
                        <div className="lesson-section">
                            <div className="section-label">Introduction</div>
                            <div className="intro-box">
                                <ReactMarkdown>{currentTopic.intro}</ReactMarkdown>
                            </div>
                        </div>

                        {/* ... (Other content sections: Story, Core etc.) omitted for brevity, keeping main structure ... */}
                        <div className="lesson-section">
                            <div className="section-label">Analogy & Story</div>
                            <div className="story-box">
                                <ReactMarkdown>{currentTopic.story}</ReactMarkdown>
                            </div>
                        </div>

                        <div className="lesson-section">
                            <div className="section-label">Core Concept</div>
                            {currentTopic.type === 'video' && currentTopic.videoUrl && (
                                <div className="video-container" style={{ marginBottom: 20 }}>
                                    <iframe src={currentTopic.videoUrl.replace('watch?v=', 'embed/')} style={{ width: '100%', height: '400px', borderRadius: 8, border: 'none' }} allowFullScreen></iframe>
                                </div>
                            )}
                            <div className="markdown-body"><ReactMarkdown>{currentTopic.content || 'Content...'}</ReactMarkdown></div>
                        </div>

                        {currentTopic.importantQuestions && currentTopic.importantQuestions.length > 0 && (
                            <div className="lesson-section">
                                <div className="section-label">Important Questions</div>
                                {currentTopic.importantQuestions.map((q, i) => (
                                    <div key={i} className="question-card">
                                        <div className="q-header">Q: {q.question}</div>
                                        <div className="a-body">A: {q.answer}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="lesson-section">
                            <div className="section-label">Summary</div>
                            <div className="summary-box">
                                <ReactMarkdown>{currentTopic.summary}</ReactMarkdown>
                            </div>
                        </div>

                        {/* Practice Area - Hidden for Aptitude/Reasoning */}
                        {!course?.title?.toLowerCase().includes('aptitude') && !course?.title?.toLowerCase().includes('reasoning') && (
                            <div className="practice-container">
                                <h3>👨‍💻 Challenge: {currentTopic.problem?.title}</h3>
                                <div className="problem-desc" style={{ marginBottom: 20 }}>
                                    <p>{currentTopic.problem?.description}</p>
                                </div>

                                <div className="ide-split-container">
                                    {/* Editor Toolbar & Mode Switch */}
                                    <div className="main-toolbar">
                                        <div className="mode-selector">
                                            <button className={`mode-btn ${editorMode === 'java' ? 'active' : ''}`} onClick={() => setEditorMode('java')}>
                                                <FaCode /> Java
                                            </button>
                                            <button className={`mode-btn ${editorMode === 'web' ? 'active' : ''}`} onClick={() => setEditorMode('web')}>
                                                <FaGlobe /> Web (HTML/CSS/JS)
                                            </button>
                                        </div>
                                        <div className="action-buttons">
                                            {editorMode === 'java' ? (
                                                <button className="run-btn" onClick={handleRunJava} disabled={isRunning}>{isRunning ? 'Running...' : 'Run Java ▶'}</button>
                                            ) : (
                                                <button className="run-btn" onClick={handleRunWeb}>Refresh Browser ↻</button>
                                            )}
                                            {editorMode === 'java' && <button className="submit-btn" onClick={handleJavaSubmit} disabled={!output}>Submit</button>}
                                        </div>
                                    </div>

                                    {/* JAVA EDITOR LAYOUT */}
                                    {editorMode === 'java' && (
                                        <div className="ide-split">
                                            <div className="code-editor-wrapper">
                                                <div className="lang-tag">Java</div>
                                                <Editor
                                                    value={code}
                                                    onValueChange={code => setCode(code)}
                                                    highlight={code => highlight(code, languages.java)}
                                                    padding={10}
                                                    style={{
                                                        fontFamily: '"Fira Code", monospace',
                                                        fontSize: 14,
                                                        backgroundColor: '#1e1e1e',
                                                        color: '#f8f8f2',
                                                        minHeight: '300px'
                                                    }}
                                                />
                                            </div>
                                            <div className="editor-output">
                                                <div className="panel-header">Output</div>
                                                <pre>{output || 'Run to see output...'}</pre>
                                            </div>
                                        </div>
                                    )}

                                    {/* WEB EDITOR LAYOUT */}
                                    {editorMode === 'web' && (
                                        <div className="web-ide-layout">
                                            {/* Left: Editors */}
                                            <div className="web-editors">
                                                <div className="web-tabs">
                                                    <button className={`tab-btn ${activeWebTab === 'html' ? 'active' : ''}`} onClick={() => setActiveWebTab('html')}>HTML</button>
                                                    <button className={`tab-btn ${activeWebTab === 'css' ? 'active' : ''}`} onClick={() => setActiveWebTab('css')}>CSS</button>
                                                    <button className={`tab-btn ${activeWebTab === 'js' ? 'active' : ''}`} onClick={() => setActiveWebTab('js')}>JS</button>
                                                </div>
                                                <div className="code-editor-wrapper">
                                                    <Editor
                                                        value={webCode[activeWebTab]}
                                                        onValueChange={val => setWebCode({ ...webCode, [activeWebTab]: val })}
                                                        highlight={code => highlight(code, languages[activeWebTab === 'html' ? 'markup' : activeWebTab === 'js' ? 'javascript' : 'css'])}
                                                        padding={10}
                                                        style={{
                                                            fontFamily: '"Fira Code", monospace',
                                                            fontSize: 14,
                                                            backgroundColor: '#1e1e1e',
                                                            color: '#f8f8f2',
                                                            minHeight: '400px'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            {/* Right: Preview + Console */}
                                            <div className="web-preview-area">
                                                <div className="browser-frame">
                                                    <div className="browser-header">
                                                        <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                                                        <div className="fake-url">localhost:3000/preview</div>
                                                    </div>
                                                    <iframe
                                                        title="preview"
                                                        srcDoc={srcDoc}
                                                        sandbox="allow-scripts"
                                                        style={{ width: '100%', height: '100%', border: 'none', background: 'white' }}
                                                    />
                                                </div>
                                                <div className="console-panel">
                                                    <div className="panel-header"><FaTerminal /> Console</div>
                                                    <div className="console-logs">
                                                        {consoleLogs.length === 0 && <span style={{ color: '#666' }}>No logs...</span>}
                                                        {consoleLogs.map((log, i) => (
                                                            <div key={i} className={`log-entry ${log.type}`}>
                                                                <span className="log-type">[{log.type}]</span> {log.message}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Footer Nav */}
                        <div className="lesson-footer-nav">
                            <button className="nav-btn" onClick={handlePrev}>← Previous Topic</button>
                            <button className="nav-btn" onClick={handleNext}>Next Topic →</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonView;
