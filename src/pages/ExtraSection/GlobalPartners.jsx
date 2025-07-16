import React from 'react';

const partners = [
    "Harvard", "Oxford", "MIT", "Stanford", "Cambridge", "Toronto", "Sydney", "Tokyo"
];

const GlobalPartners = () => {
    return (
        <section className="py-20 bg-[#f9f3f4]">
            <div className="max-w-5xl mx-auto text-center px-4">
                <h2 className="text-3xl font-extrabold text-[#38040e] mb-6">Our Global University Partners</h2>
                <p className="text-gray-600 mb-10">
                    We work with world-class institutions to bring the best opportunities to students.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {partners.map((name, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-lg p-4 shadow hover:shadow-md transition"
                        >
                            <p className="text-[#640d14] font-bold text-lg cursor-pointer">{name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GlobalPartners;