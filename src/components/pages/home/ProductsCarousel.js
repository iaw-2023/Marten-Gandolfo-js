
import ProductCard from './ProductCard';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ProductsCarousel({products}){
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true
    };

    return (
        <div className="m-5">
            <Slider {...settings}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </Slider>
        </div>
    );
}