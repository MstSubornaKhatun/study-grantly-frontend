import React from 'react';

const categories = [
    { name: "Engineering", img: "https://source.unsplash.com/400x300/?engineering" },
    { name: "Medical", img: "https://source.unsplash.com/400x300/?medical" },
    { name: "Business", img: "https://source.unsplash.com/400x300/?business" },
    { name: "Arts & Humanities", img: "https://source.unsplash.com/400x300/?humanities" },
];

const TopCategories = () => {
    return (
        <section className="py-16 bg-white mb-6">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-[#38040e] mb-10">Top Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            className="group rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300 cursor-pointer"
                        >
                            <img
                                src={cat.img}
                                alt={cat.name}
                                className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
                            />
                            <div className="bg-[#640d14] text-white text-center py-3 font-semibold text-lg">
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