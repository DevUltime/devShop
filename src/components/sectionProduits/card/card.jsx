export function Card({ text, url, alt, style = {} }) {

  return (
    <div className="relative group h- w-100 overflow-hidden cursor-pointer swiper-slide">
      <img src={url} alt={alt} className="w-full h-full object-cover" />
      <div  className="absolute top-0 left-0 h-full w-full group-hover:bg-linear-to-t from-purple/50 to-transparent transition ease-out"></div>
      <p className="absolute text-lg bottom-5 text-white text-center w-full translate-y-15 group-hover:translate-y-0 transition ease-out">
        {text}
      </p>
    </div>
  );
}
