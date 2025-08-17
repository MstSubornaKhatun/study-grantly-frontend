import { GraduationCap, Globe, BadgeCheck } from 'lucide-react';

const FeaturedScholarships = () => {
    const features = [
        {
            icon: <GraduationCap className="w-10 h-10 text-[#f4a261]" />,
            title: "Undergraduate Excellence",
            description: "Find top global scholarships for undergraduate programs at leading universities.",
        },
        {
            icon: <Globe className="w-10 h-10 text-[#f4a261]" />,
            title: "Study Abroad Grants",
            description: "Get access to travel, tuition, and living cost grants for international study.",
        },
        {
            icon: <BadgeCheck className="w-10 h-10 text-[#f4a261]" />,
            title: "Merit-Based Awards",
            description: "Apply easily for merit scholarships directly through StudyGrantly.",
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#640d14] dark:text-[#f4a261] mb-6 transition-colors duration-300">
                        Featured Scholarships
                    </h2>
                    <p className="text-lg text-[#264653] dark:text-gray-300 mb-4 max-w-2xl mx-auto transition-colors duration-300">
                        Explore top picks for your education journey with our carefully curated scholarship opportunities
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 dark:hover:shadow-2xl hover:scale-105 transition-all duration-300 text-left border-2 border-transparent hover:border-[#f4a261] dark:hover:border-[#f4a261] group"
                        >
                            <div className="mb-6 p-4 bg-gradient-to-br from-[#640d14] to-[#4a0a10] dark:from-white dark:to-[#e09449] rounded-2xl inline-block shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <div className="text-white dark:text-[#640d14]">
                                    {item.icon}
                                </div>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-[#640d14] dark:text-[#f4a261] mb-4 transition-colors duration-300">
                                {item.title}
                            </h3>
                            <p className="text-[#264653] dark:text-gray-300 text-base leading-relaxed transition-colors duration-300">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedScholarships;