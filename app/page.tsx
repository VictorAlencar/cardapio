import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MenuApp from "@/components/MenuApp";

export default function Home() {
  return (
    <>
      <MenuApp hero={<Hero />} />
      <Footer />
    </>
  );
}
