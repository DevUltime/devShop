import { useEffect, useRef } from "react";
import { Button } from "../button/button";
import iconArrowMade from "/src/assets/icons/arrow_made.svg";
import { animate, stagger, splitText } from "animejs";







export function Hero() {

  const animationRef = useRef(null);

  useEffect(() => {
    const { chars } = splitText(".text-animate", {
      chars: { wrap: true },
    });

    animate(chars, {
      y: ["75%", "0%"],
      duration: 750,
      ease: "out(3)",
      delay: stagger(40),
      loop: true,
      alternate: true,
    });
  });

  return (
    <section className=" top-0 left-0 h-screen w-full -z-1 hero flex gap-10 flex-col justify-center items-center">
      <h1 className="w-2/3 text-center">
        Bienvenue sur{" "}
        <span>
          dev<span className="text-purple">Shop</span>
        </span>
        , ici vous trouverez votre <span ref={animationRef} className="text-animate">bonheur</span>
      </h1>
      <p className="opacity-[.5] -mt-5">
        La reference en matière de vente en ligne
      </p>
      <div className="flex gap-20">
        <Button value="Explorer les articles">
          <img
            src={iconArrowMade}
            alt="icon arrow made"
            className="-mt-0.5 w-6 h-6 group-hover:translate-x-1 rotate-30 transition duration-200 ease-out "
          />
        </Button>
        <Button value="Commander" primary={false} />
      </div>
    </section>
  );
}
