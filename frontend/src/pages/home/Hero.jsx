import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// import sliders
import Img1 from "../../assets/hero-carousel/img1.webp";
import Img2 from "../../assets/hero-carousel/img2.webp";
import Img3 from "../../assets/hero-carousel/img3.jpg";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:gap-14 gap-8">
      <div className="md:w-1/2 w-full items-center">
        <h1 className="md:text-5xl text-3xl font-bold md:leading-tight">
          Lorem, ipsum dolor sit amet consectetur
        </h1>
        <p className="py-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum id
          quidem libero alias animi? Recusandae laborum cumque perspiciatis
          minima nam nobis expedita, optio assumenda quisquam harum illum
          consequuntur impedit, provident explicabo ratione sint aliquam
          eligendi corporis. Deleniti molestias veniam ut.
        </p>
      </div>
      <div className="md:w-1/2 w-full mx-auto">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              className="w-full lg:h-[420px] sm:h-96 h-80"
              src={Img1}
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-full lg:h-[420px] sm:h-96 h-80"
              src={Img2}
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-full lg:h-[420px] sm:h-96 h-80"
              src={Img3}
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
