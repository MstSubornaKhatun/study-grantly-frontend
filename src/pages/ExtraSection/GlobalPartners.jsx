import React from 'react';

const partners = [
    "Harvard", "Oxford", "MIT", "Stanford", "Cambridge", "Toronto", "Sydney", "Tokyo"
];

const GlobalPartners = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#640d14] dark:text-[#f4a261] mb-6 transition-colors duration-300">
                        Our Global University Partners
                    </h2>
                    <p className="text-lg text-[#264653] dark:text-gray-300 mb-4 max-w-3xl mx-auto transition-colors duration-300">
                        We work with world-class institutions to bring the best scholarship opportunities to students worldwide.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
                    {partners.map((name, idx) => (
                        <div
                            key={idx}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 dark:hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-[#f4a261] group"
                        >
                            <div className="flex items-center justify-center h-16">
                                <p className="text-[#640d14] dark:text-[#f4a261] font-bold text-lg md:text-xl group-hover:text-[#f4a261] dark:group-hover:text-[#640d14] transition-colors duration-300 text-center">
                                    {name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GlobalPartners;