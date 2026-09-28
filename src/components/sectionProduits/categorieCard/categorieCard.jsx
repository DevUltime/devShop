import { Card } from "../card/card";
import { useId, useRef, useEffect } from "react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function CategoryCard({ title, datas, style}) {

  const swiperRef = useRef(null);
  const swiperInstance = useRef(null);

  useEffect(() => {
    swiperInstance.current = new Swiper(swiperRef.current, {
      modules: [Navigation, Pagination],
      slidesPerView: 4,
      spaceBetween: 30,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        Backgroundcolor: "#ffffff"
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
        hideOnClick: true,
      },
    });

    return () => {
      swiperInstance.current?.destroy(true, true)
    }
  }, []);

  return (
    <div>
      <h2  className="mt-4 ml-10 mb-5">{title}</h2>
      <div ref={swiperRef} className="swiper">
        <div className="swiper-wrapper">
          {datas.map((d) => {
            const key = useId();
            return <Card key={key} text={d.text} alt={d.alt} url={d.url} />;
          })}
        </div>

        <div className="swiper-pagination "></div>
        <div className="swiper-button-prev "></div>
        <div className="swiper-button-next"></div>
      </div>
    </div>
  );
}
