import React, { useState } from 'react';
import ImpressumModal from './ImpressumModal';
import { FaGithub } from 'react-icons/fa'; // Import the GitHub icon

const Footer = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    // Replace with your GitHub profile URL
    const githubUrl = 'https://github.com/your-username';

    return (
        <footer className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    {/* Copyright Info */}
                    <p className="text-sm mb-2 md:mb-0">&copy; {new Date().getFullYear()} Ragusa IT. All rights reserved.</p>

                    {/* Links and Icons */}
                    <div className="flex items-center space-x-4">
                        {/* GitHub Link */}
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub Profile"
                            className="text-gray-500 hover:text-text-light dark:hover:text-text-dark transition-colors duration-300"
                        >
                            <FaGithub size={24} />
                        </a>

                        {/* Impressum Button */}
                        <button onClick={openModal} className="text-sm text-gray-500 hover:underline">
                            Impressum
                        </button>
                    </div>
                </div>
            </div>
            <ImpressumModal isOpen={isModalOpen} onClose={closeModal} />
        </footer>
    );
};

export default Footer;
