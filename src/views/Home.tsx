import React from "react";
import Navbar from "../components/Navbar";
import LandingPage from "../components/LandingPage";
import AllProducts from "../components/AllProducts";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

function Home() {
  return (
    <div>
      <Toaster />
      <Navbar iconNumber={1} />
      <LandingPage />
      <AllProducts />
      <Footer />
    </div>
  );
}

export default Home;
