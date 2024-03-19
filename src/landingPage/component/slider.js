import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';




const ImageSlider = ({ images }) => {


  return (
    <div className={""}>
      <Carousel showArrows={true} showThumbs={false}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
