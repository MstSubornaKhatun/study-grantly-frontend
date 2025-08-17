import React from 'react';
import StudyLogo from '../StudyLogo/StudyLogo';

const Footer = () => { 
    return (
        <footer className="bg-gradient-to-r from-[#640d14] to-[#4a0a10] dark:from-gray-900 dark:to-gray-800 text-white dark:text-gray-300 py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    
                    {/* Logo and Copyright Section */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="mb-4">
                            <StudyLogo />
                        </div>
                        <p className="text-white/90 dark:text-gray-400 font-medium transition-colors duration-300">
                            Copyright © {new Date().getFullYear()} StudyGrantly - All rights reserved
                        </p>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex items-center gap-4">
                        <a 
                            href="#" 
                            className="p-3 bg-[#f4a261] hover:bg-[#e09449] text-[#640d14] rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                            aria-label="Twitter"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                            </svg>
                        </a>
                        
                        <a 
                            href="#" 
                            className="p-3 bg-[#f4a261] hover:bg-[#e09449] text-[#640d14] rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                            aria-label="YouTube"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>
                        
                        <a 
                            href="#" 
                            className="p-3 bg-[#f4a261] hover:bg-[#e09449] text-[#640d14] rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                            aria-label="Facebook"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                        
                        <a 
                            href="#" 
                            className="p-3 bg-[#f4a261] hover:bg-[#e09449] text-[#640d14] rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                            aria-label="LinkedIn"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                
                {/* Divider Line */}
                <div className="mt-8 pt-8 border-t border-white/20 dark:border-gray-700 text-center transition-colors duration-300">
                    <p className="text-sm text-white/80 dark:text-gray-400 transition-colors duration-300">
                        Empowering students worldwide with scholarship opportunities
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;