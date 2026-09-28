import { Button } from "../button/button"
import { AnimationLogo } from "../animationLogo/animationLogo"
import logoDevShop from "/src/assets/icons/logo_devShop.svg"


export function Footer(){

    return (

        <footer className="mt-15 px-10 flex flex-col gap-10">
            <div>
                <div className="h-9 flex items-center gap-3">
                    <img src={logoDevShop} alt="logo devShop" className="h-full" />
                    <span className="text-xl font-bold">dev<span className="text-purple">Shop</span></span>
                </div>
                <p>La reference en matière de vente en ligne</p>
            </div>
            <Button value={"Order now"} onClick={() => null } >
                <img className="h-5 w-10 brightness-0 invert-100 -ml-3" src={logoDevShop} alt="logo devShop" />
                </Button> 
            <div className="h-30">
                <AnimationLogo />
            </div>
            <p className="text-center mb-13">&copy; 2026 devShop tous droits réserves</p>
        </footer>
    )
}