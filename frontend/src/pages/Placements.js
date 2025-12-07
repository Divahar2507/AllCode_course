import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './Placements.css';

const Placements = () => {
    // Mock data for Live Drives - Simulating open source/random job drives
    const [drives, setDrives] = useState([
        {
            id: 1,
            company: "Google",
            role: "Software Engineer III",
            type: "Full-time",
            location: "Bangalore / Remote",
            package: "28-45 LPA",
            skills: ["Java", "System Design", "Distributed Systems"],
            link: "https://careers.google.com/jobs/results/",
            date: "2025-01-15",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
        },
        {
            id: 2,
            company: "Amazon",
            role: "SDE I (Fresher)",
            type: "Full-time",
            location: "Hyderabad",
            package: "18-24 LPA",
            skills: ["C++", "DSA", "Problem Solving"],
            link: "https://www.amazon.jobs/en/",
            date: "2025-01-20",
            logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg"
        },
        {
            id: 3,
            company: "Microsoft",
            role: "Cloud Support Associate",
            type: "Internship",
            location: "Noida",
            package: "45k/month",
            skills: ["Azure", "Networking", "Linux"],
            link: "https://careers.microsoft.com/us/en",
            date: "2025-02-01",
            logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
        },
        {
            id: 4,
            company: "Zoho",
            role: "Software Developer",
            type: "Full-time",
            location: "Chennai / Tenkasi",
            package: "8-12 LPA",
            skills: ["Java", "JavaScript", "SQL"],
            link: "https://www.zoho.com/careers/",
            date: "2025-01-18",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Zoho_Corporation_logo.png/640px-Zoho_Corporation_logo.png"
        },
        {
            id: 5,
            company: "Flipkart",
            role: "UI Engineer",
            type: "Full-time",
            location: "Bangalore",
            package: "15-20 LPA",
            skills: ["React", "Redux", "CSS3"],
            link: "https://www.flipkartcareers.com/",
            date: "2025-01-25",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Flipkart_logo.svg/1200px-Flipkart_logo.svg.png"
        },
        {
            id: 6,
            company: "TCS Digital",
            role: "System Engineer",
            type: "Full-time",
            location: "Pan India",
            package: "7 LPA",
            skills: ["Python", "Aptitude", "Communication"],
            link: "https://www.tcs.com/careers",
            date: "2025-02-10",
            logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg"
        }
    ]);

    const [openSourceProjects, setOpenSourceProjects] = useState([
        {
            id: 1,
            name: "React",
            description: "A JavaScript library for building user interfaces.",
            stars: "220k+",
            issues: "Good First Issues",
            link: "https://github.com/facebook/react",
            tech: ["JavaScript", "React"]
        },
        {
            id: 2,
            name: "TensorFlow",
            description: "An Open Source Machine Learning Framework for Everyone.",
            stars: "180k+",
            issues: "Help Wanted",
            link: "https://github.com/tensorflow/tensorflow",
            tech: ["Python", "C++"]
        },
        {
            id: 3,
            name: "VS Code",
            description: "Code editing. Redefined. Built on open source.",
            stars: "160k+",
            issues: "Bugs & Features",
            link: "https://github.com/microsoft/vscode",
            tech: ["TypeScript", "Electron"]
        },
        {
            id: 4,
            name: "Linux Kernel",
            description: "The core of the Linux operating system.",
            stars: "170k+",
            issues: "Advanced",
            link: "https://github.com/torvalds/linux",
            tech: ["C", "Assembly"]
        },
        {
            id: 5,
            name: "Kubernetes",
            description: "Production-Grade Container Orchestration.",
            stars: "110k+",
            issues: "Beginner Friendly",
            link: "https://github.com/kubernetes/kubernetes",
            tech: ["Go", "Shell"]
        },
        {
            id: 6,
            name: "Flutter",
            description: "Google's UI toolkit for building natively compiled applications.",
            stars: "165k+",
            issues: "Community Help",
            link: "https://github.com/flutter/flutter",
            tech: ["Dart", "C++"]
        }
    ]);

    return (
        <div className="placements-page">
            <Navbar />
            <div className="placements-container">
                <header className="placements-header">
                    <h1>🚀 Live Placement Drives</h1>
                    <p>Participate in active hiring drives from top tech companies.</p>
                </header>

                <div className="updates-marquee" style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    padding: '10px',
                    marginBottom: '30px',
                    borderRadius: '8px',
                    color: 'var(--text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <span style={{ background: '#f44336', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>LATEST</span>
                    <marquee behavior="scroll" direction="left" style={{ flex: 1, fontSize: '14px' }}>
                        📢 TCS NQT Registration closes tomorrow! | 📢 Accenture is hiring for ASE role across India. | 📢 Zoho SDE Interview Walk-in on 15th Jan @ Chennai. | 📢 Wipro Velocity Hackathon registration open.
                    </marquee>
                </div>

                <div className="drives-grid">
                    {drives.map(drive => (
                        <div key={drive.id} className="drive-card">
                            <div className="drive-header">
                                <img src={drive.logo} alt={drive.company} className="company-logo" />
                                <div className="drive-title">
                                    <h3>{drive.company}</h3>
                                    <span className="drive-type">{drive.type}</span>
                                </div>
                            </div>

                            <div className="drive-body">
                                <h4>{drive.role}</h4>
                                <div className="drive-info">
                                    <span>📍 {drive.location}</span>
                                    <span>💰 {drive.package}</span>
                                    <span>📅 Deadline: {new Date(drive.date).toLocaleDateString()}</span>
                                </div>
                                <div className="drive-skills">
                                    {drive.skills.map((skill, idx) => (
                                        <span key={idx} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="drive-footer">
                                <a href={drive.link} target="_blank" rel="noopener noreferrer" className="apply-btn">Apply Now ↗</a>
                            </div>
                        </div>
                    ))}
                </div>

                <header className="placements-header" style={{ marginTop: '60px' }}>
                    <h1>🌐 Contribute to Open Source</h1>
                    <p>Build your profile by contributing to world-class projects.</p>
                </header>

                <div className="drives-grid">
                    {openSourceProjects.map(project => (
                        <div key={project.id} className="drive-card open-source-card">
                            <div className="drive-header">
                                <div className="project-initial" style={{
                                    width: '48px', height: '48px', background: '#333', color: '#fff',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    borderRadius: '8px', fontSize: '20px', fontWeight: 'bold'
                                }}>
                                    {project.name[0]}
                                </div>
                                <div className="drive-title">
                                    <h3>{project.name}</h3>
                                    <span className="drive-type" style={{ background: '#e3f2fd', color: '#1976d2' }}>⭐ {project.stars}</span>
                                </div>
                            </div>

                            <div className="drive-body">
                                <h4>{project.issues}</h4>
                                <div className="drive-info">
                                    <p className="project-desc">{project.description}</p>
                                </div>
                                <div className="drive-skills">
                                    {project.tech.map((t, idx) => (
                                        <span key={idx} className="skill-tag">{t}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="drive-footer" style={{ display: 'flex', gap: '10px' }}>
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="apply-btn" style={{ background: '#24292e', flex: 1 }}>View Repo ↗</a>
                                <a href="https://www.linkedin.com/jobs/search/?keywords=Open%20Source%20Developer" target="_blank" rel="noopener noreferrer" className="apply-btn" style={{ background: '#0e76a8', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                    <span>in</span> Connect
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Placements;
