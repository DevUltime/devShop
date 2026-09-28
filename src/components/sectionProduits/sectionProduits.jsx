import { CategoryCard } from "./categorieCard/categorieCard";

// Images Électronique
import coverlaptop from "/src/assets/coverProduits/electronique/coverLaptop.png";
import coverCasque from "/src/assets/coverProduits/electronique/coverCasque.png";
import coverClavier from "/src/assets/coverProduits/electronique/coverClavier.png";
import coverSouris from "/src/assets/coverProduits/electronique/coverSouris.png";
import coverSmartWatch from "/src/assets/coverProduits/electronique/coverSmartWatch.png";
import coverDisqueDur from "/src/assets/coverProduits/electronique/coverDisqueDur.png";
import coverRingLight from "/src/assets/coverProduits/electronique/coverRingLight.png";

// Images Fashion
import coverSneakers from "/src/assets/coverProduits/fashion/coverSneakers.png";
import coverSacMain from "/src/assets/coverProduits/fashion/coverSacMain.png";
import coverJean from "/src/assets/coverProduits/fashion/coverJean.png";
import coverCasquette from "/src/assets/coverProduits/fashion/coverCasquette.png";
import coverTShirt from "/src/assets/coverProduits/fashion/coverT-shirt.png";
import coverRobe from "/src/assets/coverProduits/fashion/coverRobe.png";
import coverCeinture from "/src/assets/coverProduits/fashion/coverCeinture.png";

export function SectionProduits(){

    const produitElectronique = [
        {text: "Ordinateur", alt: "cover produit ordinateur", url: coverlaptop},
        {text: "Casque Audio", alt: "cover produit casque", url: coverCasque},
        {text: "Clavier", alt: "cover produit clavier", url: coverClavier},
        {text: "Souris", alt: "cover produit souris", url: coverSouris},
        {text: "Smart watch", alt: "Cover produit smart watch", url: coverSmartWatch},
        {text: "Disque Dur", alt: "cover produit disque dur", url: coverDisqueDur},
        {text: "Ring Light", alt: "cover produit ring light", url: coverRingLight},
    ];

    const produitFashion = [
        {text: "Sneakers", alt: "cover produit Sneakers", url: coverSneakers},
        {text: "Sacs a main", alt: "cover produit sac a main", url: coverSacMain},
        {text: "Jeans", alt: "cover produit jeans", url: coverJean},
        {text: "Casquettes", alt: "cover produit casquette", url: coverCasquette},
        {text: "T-shirts", alt: "Cover produit smart t-shirt", url: coverTShirt},
        {text: "Robes", alt: "cover produit robe", url: coverRobe},
        {text: "Ceinture", alt: "cover produit ceinture", url: coverCeinture},
    ];


    return (
        <section className="mt-15 flex flex-col gap-7 ">
            <h2 className="text-center">Explorer nos Articles</h2>
            <CategoryCard title="Électronique" datas={produitElectronique} /> 
            <CategoryCard title="Mode & Accessoires" datas={produitFashion} />
        </section>
    )
}