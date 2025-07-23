import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import api from '../src/api/api';
import 'swiper/css';

const HomeImageSwiper = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/home-swiper-get');
        setItems(data.items);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  /* ---------- INLINE STYLES THAT MAKE IT FULL‑SCREEN ---------- */
  const swiperStyle = {
    position: 'absolute',  // let it sit under your text
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',       // fill the whole banner section
    zIndex: 1,
  };

  const slideStyle = { width: '100%', height: '100%' };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',   // crop to fill, no black bars
  };

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      loop
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      modules={[Autoplay]}
    >
      {items.map((item) => (
        <SwiperSlide key={item._id} style={slideStyle}>
          <a href={item.link} style={{ display: 'block', width: '100%', height: '100%' }}>
            <img src={item.image.url} alt='banner' style={imgStyle} />
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeImageSwiper;
