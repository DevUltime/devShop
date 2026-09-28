import iconPanierAchat from "/src/assets/icons/panierAchat.svg";
import logoDevShop from "/src/assets/icons/logo_devShop.svg";

export function Header({ statePanier = 0 }) {
  return (
    <header className="flex h-12 justify-between px-8 items-center fixed w-full z-2">
      <div className="text-xl font-bold cursor-pointer flex ">
        <span className="h-8 mr-4">
          <img src={logoDevShop} alt="logo devShop" className="h-full w-full" />
        </span>
        <span>dev</span>
        <span className="text-purple">Shop</span>
      </div>
      <div className="relative flex h-12 w-12 justify-center items-center rounded-full cursor-pointer hover:bg-purple/5">
        <img
          src={iconPanierAchat}
          alt="icone panier d'achat"
          className="h-6/10 w-full"
        />
        <div className="absolute top-1 right-0 text-[10px] h-4 w-4 flex justify-center items-center rounded-full bg-red-600 font-bold text-white ">
          {statePanier}
        </div>
      </div>
    </header>
  );
}
