import React from 'react';

const Footer = () => {
    return (
        <footer className="py-8 border-t border-secondary/30 mt-16 text-center">
            <div className="mb-4">
                <a href="https://macsampson.artstation.com/albums/14768734" target="_blank" rel="noopener noreferrer"
                    className="hover:opacity-70 transition-colors underline font-merriweather" style={{ color: '#463a2e' }}>
                    Digital & Traditional Art Portfolio
                </a>
            </div>
            <p className="text-sm opacity-60">
                &copy; {new Date().getFullYear()} Mackenzie Sampson.
            </p>
        </footer>
    );
};

export default Footer;
