import React from 'react';

const SliderItem = ({ slide }) => {
    const { image, id, prev, next } = slide;
    return (
            <div id={`slide${id}`} className="carousel-item relative w-full">
                <img src={image} alt="" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href={`#slide${prev}`} className="btn btn-circle">❮</a>
                    <a href={`#slide${next}`} className="btn btn-circle">❯</a>
                </div>
            </div>
    );
};

export default SliderItem;