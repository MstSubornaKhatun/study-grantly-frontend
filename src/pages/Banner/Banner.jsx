// import React from 'react';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';
// import bannerImg1 from '../../../src/assets/banner/bannerImg1.png';
// import bannerImg2 from '../../../src/assets/banner/bannerImg2.png';
// import bannerImg3 from '../../../src/assets/banner/bannerImg3.png';
// import bannerImg4 from '../../../src/assets/banner/bannerImg4.png';

// const Banner = () => {
//     const slides = [
//         { img: bannerImg1, title: "Discover Global Scholarships" },
//         { img: bannerImg2, title: "Unlock Your Dream University" },
//         { img: bannerImg3, title: "Study Without Limits" },
//         { img: bannerImg4, title: "Build a Brighter Future" },
//     ];

//     return (
//         <div className="w-full max-h-[80vh] overflow-hidden rounded-b-2xl pb-6 shadow-2xl">
//             <Carousel
//                 autoPlay
//                 infiniteLoop
//                 showThumbs={false}
//                 showStatus={false}
//                 interval={4000}
//                 transitionTime={800}
//                 emulateTouch
//                 showArrows={true}
//                 swipeable
//                 stopOnHover={false}
//                 dynamicHeight={false}
//             >
//                 {slides.map((slide, index) => (
//                     <div key={index} className="relative">
//                         <img
//                             src={slide.img}
//                             alt="{Slide ${index + 1}}"
//                             className="w-full object-cover max-h-[80vh]"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-[#38040e]/80 to-transparent flex items-end p-8">
//                             <div className="text-white text-left space-y-2">
//                                 <h2 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg">
//                                     {slide.title}
//                                 </h2>
//                                 <p className="text-sm md:text-base font-light opacity-90">
//                                     Apply for fully funded scholarships today.
//                                 </p>
//                                 <button className="mt-3 px-5 py-2 bg-white text-[#640d14] font-semibold rounded-full shadow hover:bg-[#ffe5e8] transition-all duration-300">
//                                     Explore Now
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </Carousel>
//         </div>
//     );
// };

// export default Banner;










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
        <div className="w-full max-h-[80vh] overflow-hidden rounded-lg shadow-xl">
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
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <button
                            type="button"
                            onClick={onClickHandler}
                            title={label}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-[#640d14]/80 hover:bg-[#640d14] text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                        <button
                            type="button"
                            onClick={onClickHandler}
                            title={label}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-[#640d14]/80 hover:bg-[#640d14] text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )
                }
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                    if (isSelected) {
                        return (
                            <li
                                className="inline-block w-4 h-4 mx-1 bg-[#f4a261] rounded-full cursor-pointer shadow-md"
                                aria-label={`Selected: ${label} ${index + 1}`}
                                title={`Selected: ${label} ${index + 1}`}
                            />
                        );
                    }
                    return (
                        <li
                            className="inline-block w-3 h-3 mx-1 bg-white/60 hover:bg-[#f4a261] rounded-full cursor-pointer transition-all duration-200"
                            onClick={onClickHandler}
                            onKeyDown={onClickHandler}
                            value={index}
                            key={index}
                            role="button"
                            tabIndex={0}
                            title={`${label} ${index + 1}`}
                            aria-label={`${label} ${index + 1}`}
                        />
                    );
                }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="relative">
                        <img
                            src={slide.img}
                            alt={`Slide ${index + 1}`}
                            className="w-full object-cover max-h-[80vh]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#640d14]/90 via-[#640d14]/40 to-transparent flex items-end p-6 md:p-12">
                            <div className="text-white text-left space-y-4 max-w-2xl">
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-2xl leading-tight">
                                    {slide.title}
                                </h2>
                                <p className="text-base md:text-lg lg:text-xl font-light opacity-95 drop-shadow-lg">
                                    Apply for fully funded scholarships today.
                                </p>
                                <button className="mt-6 px-8 py-3 bg-gradient-to-r from-[#f4a261] to-[#e09449] text-[#640d14] font-bold rounded-full shadow-lg hover:from-[#e09449] hover:to-[#cc7a2e] transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
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