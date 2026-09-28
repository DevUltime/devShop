import { CategoryCard } from "./categorieCard/categorieCard";


export function SectionProduits(){

    const produitElectronique = [
        {text: "Ordinateur", alt: "cover produit ordinateur", url: "/src/assets/coverProduits/electronique/coverlaptop.png"},
        {text: "Casque Audio", alt: "cover produit casque", url: "/src/assets/coverProduits/electronique/coverCasque.png"},
        {text: "Clavier", alt: "cover produit clavier", url: "/src/assets/coverProduits/electronique/coverClavier.png"},
        {text: "Souris", alt: "cover produit souris", url: "/src/assets/coverProduits/electronique/coverSouris.png"},
        {text: "Smart watch", alt: "Cover produit smart watch", url: "/src/assets/coverProduits/electronique/coverSmartWatch.png"},
        {text: "Disque Dur", alt: "cover produit disque dur", url: "/src/assets/coverProduits/electronique/coverDisqueDur.png"},
        {text: "Ring Light", alt: "cover produit ring light", url: "/src/assets/coverProduits/electronique/coverRingLight.png"},
    ];

    const produitFashion = [
        {text: "Sneakers", alt: "cover produit Sneakers", url: "/src/assets/coverProduits/fashion/coverSneakers.png"},
        {text: "Sacs a main", alt: "cover produit sac a main", url: "/src/assets/coverProduits/fashion/coverSacMain.png"},
        {text: "Jeans", alt: "cover produit jeans", url: "/src/assets/coverProduits/fashion/coverJean.png"},
        {text: "Casquettes", alt: "cover produit casquette", url: "/src/assets/coverProduits/fashion/coverCasquette.png"},
        {text: "T-shirts", alt: "Cover produit smart t-shirt", url: "/src/assets/coverProduits/fashion/coverT-shirt.png"},
        {text: "Robes", alt: "cover produit robe", url: "/src/assets/coverProduits/fashion/coverRobe.png"},
        {text: "Ceinture", alt: "cover produit ceinture", url: "/src/assets/coverProduits/fashion/coverCeinture.png"},
    ];


    return (
        <section className="mt-15 flex flex-col gap-7 ">
            <h2 className="text-center">Explorer nos Articles</h2>
            <CategoryCard title="Électronique" datas={produitElectronique} /> 
            <CategoryCard title="Mode & Accessoires" datas={produitFashion} />
        </section>
    )
}