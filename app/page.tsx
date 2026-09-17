import Image from "next/image";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from './components/Features';
import Products from './components/Products';
import Reviews from './components/Reviews';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';

export default function Home() {
  return (
    <CartProvider>
      <Navbar />
      <Hero />
      <Features />
      <Products />
      <Reviews />
      <FAQSection />
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}