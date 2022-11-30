import React from 'react';
import img4 from "../../../assets/images/Diamond Bracelet.jpg";
import img2 from "../../../assets/images/Diamond Earring.jpg";
import img3 from "../../../assets/images/Diamond Pendant.jpg";
import img1 from "../../../assets/images/Gold Bracelet.jpg";
import img5 from "../../../assets/images/Gold Earring.jpg";
import img6 from "../../../assets/images/Gold Pendant.jpg";
import SliderItem from './SliderItem';

const SliderData = [
    {
        image: img1,
        prev: 6,
        id: 1,
        next: 2
    },
    {
        image: img2,
        prev: 1,
        id: 2,
        next: 3
    },
    {
        image: img3,
        prev: 2,
        id: 3,
        next: 4
    },
    {
        image: img4,
        prev: 3,
        id: 4,
        next: 5
    },
    {
        image: img5,
        prev: 4,
        id: 5,
        next: 6
    },
    {
        image: img6,
        prev: 5,
        id: 6,
        next: 1
    }
];

const Slider = () => {
    return (
        <div className="carousel w-full h-96 mt-2 rounded-lg">
            {
                SliderData.map(slide => <SliderItem
                    key={slide.id}
                    slide={slide}
                ></SliderItem>)
            }
        </div>
    );
};

export default Slider;