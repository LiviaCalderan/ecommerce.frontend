import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Autoplay, Scrollbar } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

import { bannerList } from '../../utils';
import { Link } from 'react-router-dom';


const Hero = () => {
    return (
        <div className='py-2 rounded-md font-raleway'>
            <Swiper
                grabCursor={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                navigation
                scrollbar={{ hide: true }}
                slidesPerView={1}
                modules={[Pagination, EffectFade, Autoplay, Scrollbar]}
            >
                {bannerList.map((item, i) => (
                    <SwiperSlide key={item.id}>
                        <div
                            className="carousel-item relative flex items-center min-h-[400px] lg:min-h-[500px]"
                            style={{
                                backgroundImage: `url(${item?.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'top left',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            {/* Overlay escuro para melhorar leitura do texto */}
                            <div className="absolute inset-0 bg-black/20" />

                            {/* Conteúdo sobre o background */}
                            <div className="relative z-10 flex justify-end w-full px-8 lg:px-20">
                                <div className="text-center lg:text-end md:text-end max-w-lg">
                                    <h3 className="lg:text-md md:text-md text-md text-gray-200 font-bold">
                                        {item.title}
                                    </h3>
                                    <h1 className="lg:text-7xl md:text-7xl text-4xl text-white font-bold tracking-[0.03em] mt-2 font-anton-sc">
                                        {item.subtitle}
                                    </h1>
                                    <p className="lg:text-md md:text-md text-sm text-gray-200 font-semibold mt-4">
                                        {item.description}
                                    </p>
                                    <Link
                                        className="mt-6 inline-block bg-white text-black text-sm py-2 px-15 rounded-md hover:bg-gray-200 font-semibold"
                                        to="/products"
                                    >
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Hero