import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomePage from "./home/HomePage";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <HomePage />
      </main>
      <Footer />
    </>
  );
};

export default App;
