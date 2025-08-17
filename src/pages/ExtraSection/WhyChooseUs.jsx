import { Lightbulb, UserCheck, ShieldCheck } from 'lucide-react';

const WhyChooseUs = () => {
    const reasons = [
        {
            icon: <Lightbulb className="w-8 h-8 text-[#f4a261]" />,
            title: "Smart Matching",
            desc: "We match students with scholarships that fit their profile perfectly.",
        },
        {
            icon: <UserCheck className="w-8 h-8 text-[#f4a261]" />,
            title: "Verified Providers",
            desc: "All listed scholarships are from trusted and reviewed institutions.",
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-[#f4a261]" />,
            title: "Secure & Easy",
            desc: "Apply securely and track your status inside your dashboard.",
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-r from-[#640d14] to-[#4a0a10] dark:from-gray-900 dark:to-gray-800 text-white transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white dark:text-[#f4a261] mb-6 transition-colors duration-300">
                        Why Choose StudyGrantly?
                    </h2>
                    <p className="text-lg text-white/90 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
                        We simplify your scholarship journey with trusted providers and smart technology
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reasons.map((reason, idx) => (
                        <div 
                            key={idx} 
                            className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-left border-2 border-transparent hover:border-[#f4a261] dark:hover:border-[#f4a261] group"
                        >
                            <div className="mb-6 p-4 bg-gradient-to-br  from-white to-[#e09449] rounded-2xl inline-block shadow-lg group-hover:scale-110 transition-transform duration-300">
                                {reason.icon}
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white dark:text-[#f4a261] mb-4 transition-colors duration-300">
                                {reason.title}
                            </h3>
                            <p className="text-white/90 dark:text-gray-300 text-base leading-relaxed transition-colors duration-300">
                                {reason.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;