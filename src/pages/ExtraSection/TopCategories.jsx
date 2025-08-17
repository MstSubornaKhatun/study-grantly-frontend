import React from 'react';

const categories = [
    { name: "Engineering", img: "https://i.ibb.co/KcGWPKyS/Screenshot-2025-07-15-200846.png" },
    { name: "Medical", img: "https://i.ibb.co/Vcrpr8G4/Screenshot-2025-07-15-201004.png" },
    { name: "Business", img: "https://i.ibb.co/zhdrg9kW/Screenshot-2025-07-15-201147.png" },
    { name: "Arts & Humanities", img: "https://i.ibb.co/7d0vVg4J/Screenshot-2025-07-15-201418.png" },
];

const TopCategories = () => { 
    return (
        <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#640d14] dark:text-[#f4a261] mb-6 transition-colors duration-300">
                        Top Categories
                    </h2>
                    <p className="text-lg text-[#264653] dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
                        Explore scholarship opportunities across various academic disciplines
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 dark:hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-[#f4a261]"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={cat.img}
                                    alt={cat.name}
                                    className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#640d14]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="bg-gradient-to-r from-[#640d14] to-[#4a0a10] dark:from-[#f4a261] dark:to-[#e09449] text-white dark:text-[#640d14] text-center py-4 font-bold text-lg transition-all duration-300 group-hover:from-[#f4a261] group-hover:to-[#e09449] group-hover:text-[#640d14]">
                                {cat.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopCategories;