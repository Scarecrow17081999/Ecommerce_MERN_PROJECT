import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default class ProductCarousel extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      accessibility: true,
    };
    return (
      <div style={{ width: "100%" }}>
        <Slider {...settings}>
          {this &&
            this.props.data?.map((e, i) => (
              <img
                key={e._id}
                className="CarouselImage"
                src={e.url}
                alt={`${i + 1} Slide`}
              />
            ))}
        </Slider>
      </div>
    );
  }
}
