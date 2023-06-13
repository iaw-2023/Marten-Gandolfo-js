
import ProductCard from './ProductCard';
import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ProductsCarousel({products}){
    const [slidesToShow, setSlidesToShow] = useState(5);
  
    useEffect(() => {
      const handleResize = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 670) {
          setSlidesToShow(1);
        } else if (windowWidth <= 940) {
          setSlidesToShow(2);
        } else if (windowWidth <= 1250) {
          setSlidesToShow(3);
        } else if (windowWidth <= 1500){
          setSlidesToShow(4);
        } else{
          setSlidesToShow(5);
        }
      };
  
      handleResize();
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true
    };

    return (
        <div className="m-5 carousel">
            <Slider {...settings}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </Slider>
        </div>
    );
}