import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import bannerImg1 from '../../../src/assets/banner/bannerImg1.png';
import bannerImg2 from '../../../src/assets/banner/bannerImg2.png';
import bannerImg3 from '../../../src/assets/banner/bannerImg3.png';
import bannerImg4 from '../../../src/assets/banner/bannerImg4.png';

const Banner = () => {
    const slides = [
        { img: bannerImg1, title: "Discover Global Scholarships" },
        { img: bannerImg2, title: "Unlock Your Dream University" },
        { img: bannerImg3, title: "Study Without Limits" },
        { img: bannerImg4, title: "Build a Brighter Future" },
    ];

    return (
        <div className="w-full max-h-[80vh] overflow-hidden rounded-b-2xl mb-6 shadow-2xl">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={4000}
                transitionTime={800}
                emulateTouch
                showArrows={true}
                swipeable
                stopOnHover={false}
                dynamicHeight={false}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="relative">
                        <img
                            src={slide.img}
                            alt="{Slide ${index + 1}}"
                            className="w-full object-cover max-h-[80vh]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#38040e]/80 to-transparent flex items-end p-8">
                            <div className="text-white text-left space-y-2">
                                <h2 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg">
                                    {slide.title}
                                </h2>
                                <p className="text-sm md:text-base font-light opacity-90">
                                    Apply for fully funded scholarships today.
                                </p>
                                <button className="mt-3 px-5 py-2 bg-white text-[#640d14] font-semibold rounded-full shadow hover:bg-[#ffe5e8] transition-all duration-300">
                                    Explore Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;