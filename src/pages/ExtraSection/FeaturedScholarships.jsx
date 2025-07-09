import { GraduationCap, Globe, BadgeCheck } from 'lucide-react';

const FeaturedScholarships = () => {
    const features = [
        {
            icon: <GraduationCap className="w-10 h-10 text-[#640d14]" />,
            title: "Undergraduate Excellence",
            description: "Find top global scholarships for undergraduate programs at leading universities.",
        },
        {
            icon: <Globe className="w-10 h-10 text-[#640d14]" />,
            title: "Study Abroad Grants",
            description: "Get access to travel, tuition, and living cost grants for international study.",
        },
        {
            icon: <BadgeCheck className="w-10 h-10 text-[#640d14]" />,
            title: "Merit-Based Awards",
            description: "Apply easily for merit scholarships directly through StudyGrantly.",
        },
    ];

    return (
        <section className="py-16 bg-[#f9f3f4] mb-6">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-extrabold text-[#38040e] mb-6">🌟 Featured Scholarships</h2>
                <p className="text-gray-600 mb-12">Explore top picks for your education journey</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 text-left"
                        >
                            <div className="mb-4">{item.icon}</div>
                            <h3 className="text-xl font-bold text-[#640d14] mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedScholarships;