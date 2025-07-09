import { Lightbulb, UserCheck, ShieldCheck } from 'lucide-react';

const WhyChooseUs = () => {
    const reasons = [
        {
            icon: <Lightbulb className="w-8 h-8 text-white" />,
            title: "Smart Matching",
            desc: "We match students with scholarships that fit their profile perfectly.",
        },
        {
            icon: <UserCheck className="w-8 h-8 text-white" />,
            title: "Verified Providers",
            desc: "All listed scholarships are from trusted and reviewed institutions.",
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-white" />,
            title: "Secure & Easy",
            desc: "Apply securely and track your status inside your dashboard.",
        },
    ];

    return (
        <section className="py-20 bg-[#640d14] text-white mb-6">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-extrabold mb-6">Why Choose StudyGrantly?</h2>
                <p className="text-white/80 mb-12">We simplify your scholarship journey</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {reasons.map((reason, idx) => (
                        <div key={idx} className="bg-[#38040e] rounded-xl p-6 shadow-lg hover:scale-[1.02] transition">
                            <div className="mb-4 p-3 bg-white/10 rounded-full inline-block">{reason.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                            <p className="text-white/80 text-sm">{reason.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;