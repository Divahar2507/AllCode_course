import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FaPlay, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-dark.css';
import axios from 'axios';
import './Practice.css';
import { practiceData } from '../data/PracticeData';
import { quantitativeQuestions, logicalQuestions, verbalQuestions } from '../data/aptitude/AptitudeData';

const Practice = () => {
    // UI State
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('statement'); // statement, submission, hint
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Selection state
    const [selectedCourse, setSelectedCourse] = useState('java');
    const [showHint, setShowHint] = useState(false);

    // Dynamic Modules Construction
    let currentModules = practiceData[selectedCourse] || [];

    if (selectedCourse === 'aptitude') {
        currentModules = [
            { id: 'apt1', title: 'Quantitative (50 Qs)', problems: quantitativeQuestions },
            { id: 'apt2', title: 'Logical Reasoning (50 Qs)', problems: logicalQuestions },
            { id: 'apt3', title: 'Verbal Ability (50 Qs)', problems: verbalQuestions }
        ];
    }

    // Selected Problem State
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [code, setCode] = useState('');
    const [expandedModule, setExpandedModule] = useState(null);

    // Aptitude State
    const [aptitudeAnswer, setAptitudeAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

    // Initialize/Reset when course changes
    useEffect(() => {
        if (currentModules.length > 0) {
            const firstMod = currentModules[0];
            setExpandedModule(firstMod.id);
            if (firstMod.problems.length > 0) {
                const firstProb = firstMod.problems[0];
                setSelectedProblem(firstProb);
                if (selectedCourse !== 'aptitude') {
                    setCode(firstProb.starterCode || '');
                }
            } else {
                setSelectedProblem(null);
                setCode('');
            }
        } else {
            setSelectedProblem(null);
            setCode('');
            setExpandedModule(null);
        }
        setOutput('');
        setShowHint(false);
        setAptitudeAnswer(null);
        setShowExplanation(false);
    }, [selectedCourse]); // Simplified dependency to avoid deep object cycle issues if currentModules is recreated

    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
    };

    const handleProblemSelect = (problem) => {
        setSelectedProblem(problem);
        if (selectedCourse !== 'aptitude') {
            setCode(problem.starterCode);
        }
        setOutput('');
        setShowHint(false);
        setAptitudeAnswer(null);
        setShowExplanation(false);
    };

    const toggleModule = (modId) => {
        setExpandedModule(expandedModule === modId ? null : modId);
    };

    const handleRun = async () => {
        if (!selectedProblem) return;

        setIsLoading(true);
        setOutput('Compiling and Running...');
        try {
            const response = await axios.post('/api/run', {
                language: selectedCourse,
                code: code,
                input: ''
            });
            setOutput(response.data.output);
        } catch (error) {
            console.error('Run failed:', error);
            if (selectedCourse === 'html') setOutput('PREVIEW: \n' + code);
            else setOutput('Error: Execution failed or server unavailable.\nCheck console for details.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAptitudeSubmit = () => {
        if (aptitudeAnswer) {
            setShowExplanation(true);
        } else {
            alert("Please select an option first!");
        }
    };

    const handleRetake = () => {
        setShowExplanation(false);
        setAptitudeAnswer(null);
    };

    const navToCourse = (e) => {
        handleCourseChange(e);
    };

    return (
        <div className="practice-ide-page">
            <Navbar />

            <div className="ide-container">
                {/* LEFT SIDEBAR - Problem List */}
                <div className={`ide-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                    <div className="sidebar-header">
                        {sidebarOpen && (
                            <div className="course-select-container">
                                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>COURSE</label>
                                <select
                                    value={selectedCourse}
                                    onChange={navToCourse}
                                    className="course-dropdown"
                                    style={{
                                        width: '100%', padding: '5px', background: 'var(--bg-primary)',
                                        color: 'var(--text-main)', border: '1px solid var(--border-color)',
                                        borderRadius: '4px', marginTop: '5px'
                                    }}
                                >
                                    {Object.keys(practiceData).map(key => (
                                        <option key={key} value={key}>{key.toUpperCase()}</option>
                                    ))}
                                    <option key="aptitude" value="aptitude">APTITUDE</option>
                                </select>
                            </div>
                        )}
                        <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            {sidebarOpen ? '<<' : '>>'}
                        </button>
                    </div>

                    {sidebarOpen && (
                        <div className="modules-list">
                            {currentModules.map(mod => (
                                <div key={mod.id} className="module-item">
                                    <div className="module-title" onClick={() => toggleModule(mod.id)}>
                                        {expandedModule === mod.id ? <FaChevronDown /> : <FaChevronRight />}
                                        <span>{mod.title}</span>
                                    </div>
                                    {expandedModule === mod.id && (
                                        <div className="problem-list">
                                            {mod.problems.map(prob => (
                                                <div
                                                    key={prob.id}
                                                    className={`problem-item ${selectedProblem?.id === prob.id ? 'active' : ''}`}
                                                    onClick={() => handleProblemSelect(prob)}
                                                >
                                                    <span className={`status-icon`}></span>
                                                    <span className="prob-title">{prob.title}</span>
                                                    <span className={`prob-diff ${prob.difficulty?.toLowerCase() || 'medium'}`}>{prob.difficulty || 'Medium'}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* MAIN AREA */}
                {selectedCourse === 'aptitude' ? (
                    /* APTITUDE / MCQ VIEW */
                    <div className="ide-main aptitude-view" style={{ flexDirection: 'column', padding: '40px', overflowY: 'auto' }}>
                        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                            <h2 style={{ color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                                {selectedProblem ? selectedProblem.title : 'Select a Question'}
                            </h2>

                            {selectedProblem ? (
                                <div className="mcq-container" style={{ marginTop: '30px' }}>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', lineHeight: '1.5' }}>
                                        {selectedProblem.question}
                                    </h3>

                                    <div className="options-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        {selectedProblem.options && selectedProblem.options.map((opt, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setAptitudeAnswer(opt)}
                                                disabled={showExplanation}
                                                style={{
                                                    padding: '15px',
                                                    textAlign: 'left',
                                                    borderRadius: '8px',
                                                    border: `2px solid ${aptitudeAnswer === opt ? 'var(--bg-primary)' : 'var(--border-color)'}`,
                                                    background: aptitudeAnswer === opt ? 'rgba(255, 152, 0, 0.2)' : 'var(--bg-card)',
                                                    color: 'var(--text-main)',
                                                    cursor: showExplanation ? 'default' : 'pointer',
                                                    fontSize: '1rem'
                                                }}
                                            >
                                                <span style={{ fontWeight: 'bold', marginRight: '10px' }}>{String.fromCharCode(65 + idx)}.</span>
                                                {opt}
                                            </button>
                                        ))}
                                    </div>

                                    {!showExplanation && (
                                        <div className="mcq-actions" style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
                                            <button
                                                onClick={handleAptitudeSubmit}
                                                style={{
                                                    padding: '10px 24px',
                                                    background: '#FF9800',
                                                    color: 'black',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold',
                                                    fontSize: '1rem'
                                                }}
                                            >
                                                Submit Answer
                                            </button>
                                        </div>
                                    )}

                                    {showExplanation && (
                                        <div className="explanation-box" style={{
                                            marginTop: '30px',
                                            background: aptitudeAnswer === selectedProblem.answer ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                                            padding: '20px',
                                            borderRadius: '8px',
                                            borderLeft: `5px solid ${aptitudeAnswer === selectedProblem.answer ? '#4CAF50' : '#F44336'}`
                                        }}>
                                            <h4 style={{ margin: '0 0 10px 0', color: aptitudeAnswer === selectedProblem.answer ? '#4CAF50' : '#F44336' }}>
                                                {aptitudeAnswer === selectedProblem.answer ? 'Correct! 🎉' : 'Incorrect ❌'}
                                            </h4>
                                            <p style={{ margin: 0 }}><strong>Correct Answer:</strong> {selectedProblem.answer}</p>
                                            <p style={{ marginTop: '10px' }}><strong>Explanation:</strong> {selectedProblem.explanation}</p>

                                            {/* Retake Button for Incorrect Answers */}
                                            {aptitudeAnswer !== selectedProblem.answer && (
                                                <button
                                                    onClick={handleRetake}
                                                    style={{
                                                        marginTop: '20px',
                                                        padding: '8px 20px',
                                                        background: 'var(--bg-primary)',
                                                        color: 'var(--text-main)',
                                                        border: '1px solid var(--border-color)',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    Retake Question 🔄
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p>Please select a question from the sidebar to begin practicing.</p>
                            )}
                        </div>
                    </div>
                ) : (
                    /* CODING IDE VIEW (Standard) */
                    <div className="ide-main">
                        {/* Problem Panel */}
                        <div className="problem-panel">
                            {/* ... (Existing panel tabs code) ... */}
                            <div className="panel-tabs">
                                <button className={`tab ${activeTab === 'statement' ? 'active' : ''}`} onClick={() => setActiveTab('statement')}>Statement</button>
                                <button className={`tab ${activeTab === 'hint' ? 'active' : ''}`} onClick={() => setActiveTab('hint')}>Hint</button>
                                <button className={`tab ${activeTab === 'submission' ? 'active' : ''}`} onClick={() => setActiveTab('submission')}>Submissions</button>
                            </div>

                            <div className="panel-content">
                                {activeTab === 'statement' && selectedProblem && (
                                    <div className="statement-content">
                                        <h2>{selectedProblem.title}</h2>
                                        <div className="tags">
                                            <span className={`tag ${selectedProblem.difficulty.toLowerCase()}`}>{selectedProblem.difficulty}</span>
                                            <span className="tag topic">{selectedCourse.toUpperCase()}</span>
                                        </div>
                                        <div className="description-text">
                                            <p>{selectedProblem.description}</p>
                                            <br />
                                            <h4>Example:</h4>
                                            <pre className="example-block">
                                                <strong>Input:</strong> {selectedProblem.exampleInput || 'None'}<br />
                                                <strong>Output:</strong> {selectedProblem.exampleOutput || 'See Description'}
                                            </pre>
                                        </div>
                                        <div className="action-area" style={{ marginTop: '20px' }}>
                                            <button onClick={() => setShowHint(!showHint)} style={{
                                                background: '#FF9800', color: 'black', border: 'none',
                                                padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
                                            }}>
                                                {showHint ? 'Hide Hint 💡' : 'Show Hint 💡'}
                                            </button>
                                            {showHint && (
                                                <div className="hint-box" style={{
                                                    marginTop: '10px', background: '#fff3e0', color: '#e65100',
                                                    padding: '10px', borderRadius: '4px', borderLeft: '4px solid #ff9800'
                                                }}>
                                                    {selectedProblem.hint}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* HINT TAB */}
                                {activeTab === 'hint' && selectedProblem && (
                                    <div className="hint-content" style={{ padding: '20px', textAlign: 'center' }}>
                                        <h3>Need a Clue?</h3>
                                        <div className="hint-card" style={{
                                            background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                                            padding: '20px', borderRadius: '8px', marginTop: '20px'
                                        }}>
                                            {selectedProblem.hint}
                                        </div>
                                    </div>
                                )}

                                {/* SUBMISSIONS TAB */}
                                {activeTab === 'submission' && (
                                    <div className="submission-content">
                                        <p>No submissions yet.</p>
                                    </div>
                                )}

                                {!selectedProblem && <p style={{ padding: '20px' }}>Select a problem to start.</p>}
                            </div>
                        </div>

                        {/* Editor Panel */}
                        <div className="editor-panel">
                            <div className="editor-header">
                                <span className="lang-label">{selectedCourse.toUpperCase()} Environment</span>
                                <button className="run-button" onClick={handleRun} disabled={isLoading}>
                                    <FaPlay /> {isLoading ? 'Running...' : 'Run Code'}
                                </button>
                            </div>
                            <div className="code-area">
                                <Editor
                                    value={code}
                                    onValueChange={code => setCode(code)}
                                    highlight={code => highlight(code, languages.java || languages.js)}
                                    padding={15}
                                    style={{
                                        fontFamily: '"Fira Code", monospace',
                                        fontSize: 14,
                                        backgroundColor: '#1e1e1e',
                                        color: '#f8f8f2',
                                        minHeight: '100%'
                                    }}
                                    className="ide-editor"
                                />
                            </div>
                            <div className="terminal-area">
                                <div className="term-header">Terminal / Output</div>
                                <pre className="term-output">{output || 'Ready to execute...'}</pre>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Practice;
