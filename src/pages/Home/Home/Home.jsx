import React from 'react';
import Banner from '../../Banner/Banner';
import WhyChooseUs from '../../ExtraSection/WhyChooseUs';
import FeaturedScholarships from '../../ExtraSection/FeaturedScholarships';
import TopCategories from '../../ExtraSection/TopCategories';
import GlobalPartners from '../../ExtraSection/GlobalPartners';
import TopScholarship from '../../../components/TopScholarship/TopScholarship';
// import TopScholarship from '../../TopScholarship/TopScholarship';

const Home = () => {
    return (
        <div>
            <Banner/>
            <TopScholarship/>
            <WhyChooseUs/>
            <FeaturedScholarships/>
            <TopCategories/>
            <GlobalPartners/>
        </div>
    );
};

export default Home;