import React from 'react';
import Categories from '../Categories/Categories';
import Recommendation from '../Recommendation/Recommendation';
import Slider from '../Slider/Slider';

const Home = () => {
    return (
        <div>
            <Categories></Categories>
            <Slider></Slider>
            <Recommendation></Recommendation>
        </div>
    );
};

export default Home;