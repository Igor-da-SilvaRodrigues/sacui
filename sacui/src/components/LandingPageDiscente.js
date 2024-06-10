import { useState } from "react";
import "./LandingPageDiscente.css";
import Header from "./Header";
import Footer from "./Footer";

const LandingPageDiscente = () => {
  const [name] = useState("Ana");

  return (
    <div>
      <Header />
      <h1 style={{ marginTop: '70px' }}>Olá, {name}! Como podemos ajudar?</h1>
      <div className="buttonsLandDisc">
        <button name="openSac">Abrir Chamado</button>
        <button name="verifySac">Verificar Chamado</button>
      </div>
      <Footer pos="fixed" bot={0} />
    </div>
  );
};

export default LandingPageDiscente;
