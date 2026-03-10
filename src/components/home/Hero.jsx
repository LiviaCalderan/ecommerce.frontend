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

const colors = ["bg-[#FDC200]", "bg-[#FF2C2C]", "bg-[#21AD61]"];

const Hero = () => {
    return (
        <div className='py-2 rouded-md'>
            <Swiper
                grabCursor={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                // pagination={{
                //     dynamicBullets: false,
                // }}
                navigation
                scrollbar={{
                    hide: true,
                }}
                slidesPerView={1}
                modules={[Pagination, EffectFade, Autoplay, Scrollbar]}>

                {bannerList.map((item, i) => (
                    <SwiperSlide key={item.id}>
                        <div className={`carousel-item sm:h-[500px] h-96 ${colors[i]}`}>
                            <div className='flex items-center justify-center'>
                                
                                {/* Padrão: tela pequena -> texto escondido (hidden) */}
                                <div className='hidden lg:flex justify-center w-1/2 p-2'>
                                    <div className='text-center'>
                                        <h3 className='text-3xl text-white font-bold'>
                                            {item.title}
                                        </h3>
                                        <h1 className='text-5xl text-white font-bold mt-2'>
                                            {item.subtitle}
                                        </h1>
                                        <p className='text-white font-semibold mt-4'>
                                            {item.description}
                                        </p>

                                        {/* Futuramente colocar o link direto para um produto especifico - já no bannerList */}
                                        <Link className='mt-6 inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800 font-semibold'
                                            to={"/products"}>
                                            Shop
                                        </Link>
                                    </div>
                                </div>
                                <div className='w-full flex justify-center lg:w-1/2 p-4'>
                                    <img src={item?.image} alt="product image" />
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