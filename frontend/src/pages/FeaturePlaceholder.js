import React from 'react';
import Navbar from '../components/Navbar';
import { FaTools } from 'react-icons/fa';

const FeaturePlaceholder = ({ title }) => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Navbar />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh',
                textAlign: 'center',
                color: '#555'
            }}>
                <div style={{ fontSize: '60px', color: '#007BFF', marginBottom: '20px' }}>
                    <FaTools />
                </div>
                <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>{title}</h1>
                <p style={{ fontSize: '18px', maxWidth: '500px' }}>
                    This feature is currently under development. Stay tuned for updates!
                </p>
            </div>
        </div>
    );
};

export default FeaturePlaceholder;
