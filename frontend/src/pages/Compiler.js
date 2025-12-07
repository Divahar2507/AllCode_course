import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-dark.css';
import { FaPlay } from 'react-icons/fa';
import axios from 'axios';
import './Compiler.css';

const Compiler = () => {
    const [code, setCode] = useState(`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, AllCode AI!");
    }
}`);
    const [language, setLanguage] = useState('java');
    const [output, setOutput] = useState('');
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRun = async () => {
        setIsLoading(true);
        setOutput('Running...');
        try {
            const response = await axios.post('/api/run', {
                language,
                code,
                input
            });
            setOutput(response.data.output);
        } catch (error) {
            console.error('Error running code:', error);
            setOutput('Error: Could not connect to the execution server.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLanguageChange = (e) => {
        const lang = e.target.value;
        setLanguage(lang);
        if (lang === 'java') {
            setCode(`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
    }
}`);
        } else if (lang === 'python') {
            setCode(`print("Hello from Python!")`);
        } else if (lang === 'javascript') {
            setCode(`console.log("Hello from JavaScript!");`);
        }
    };

    return (
        <div className="compiler-page">
            <Navbar />
            <div className="compiler-container">
                <div className="compiler-header">
                    <select
                        value={language}
                        onChange={handleLanguageChange}
                        className="lang-select"
                    >
                        <option value="java">Java (OpenJDK 13.0.1)</option>
                        <option value="python">Python 3</option>
                        <option value="javascript">JavaScript (Node.js)</option>
                    </select>
                    <button className="run-btn" onClick={handleRun} disabled={isLoading}>
                        <FaPlay size={12} /> {isLoading ? 'Running...' : 'Run'}
                    </button>
                </div>

                <div className="editor-layout">
                    <div className="editor-section">
                        <Editor
                            value={code}
                            onValueChange={code => setCode(code)}
                            highlight={code => highlight(code, languages.js)}
                            padding={10}
                            style={{
                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                fontSize: 14,
                                backgroundColor: '#1e1e1e',
                                color: '#f8f8f2',
                                minHeight: '100%'
                            }}
                            className="code-editor"
                        />
                    </div>

                    <div className="io-section">
                        <div className="panel input-panel">
                            <div className="panel-header">Input</div>
                            <textarea
                                className="panel-content"
                                placeholder="Enter custom input here"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="panel output-panel">
                            <div className="panel-header">Output</div>
                            <div className="panel-content output-text">
                                {output}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Compiler;
