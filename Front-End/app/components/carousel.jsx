import React from "react";
import "./Custom CSS/carousel.css"; // <-- we’ll define custom animation here

const images = [
    "/assets/devs/debasish.jpg",
    "/assets/display/item1.jpg",
    "/assets/display/item2.jpg",
    "/assets/display/item3.jpg",
    "/assets/display/item4.jpg",
    "/assets/display/item5.jpg",
];

const Carousel = () => {
    return (
        <div className="overflow-hidden w-full py-4">
            <div className="carousel-track">
                {[...images, ...images].map((src, i) => (
                    <div key={i} className="inline-block px-50">
                        <img src={src} alt={`carousel-${i}`} className="w-100 rounded-box" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
