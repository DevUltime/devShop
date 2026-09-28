import { Header } from "./components/header/header";
import { Hero } from "./components/hero/hero";
import { SectionProduits } from "./components/sectionProduits/sectionProduits";
import { Footer } from "./components/footer/footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionProduits />
      </main>
      <Footer />
    </>
  );
}
