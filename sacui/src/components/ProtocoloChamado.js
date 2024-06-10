import Footer from "./Footer";
import Header from "./Header";

const ProtocoloChamado = () => {
  let protocolo = 1234567890;

  return (
    <div>
      <Header />
      <h1>Chamado {protocolo}:</h1>
      <div className="detalheChamado">
        <p
          style={{
            color: "#000",
            fontSize: "medium",
            width: "500px",
            marginTop: "6px",
            margin: "0 auto",
          }}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa est
          odio rerum. Atque maxime provident laudantium quo numquam voluptates
          libero, vitae alias beatae officiis quod at adipisci eveniet rerum
          aspernatur? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Est placeat velit, a totam quasi exercitationem neque fugit magnam
          reiciendis impedit veritatis ex quibusdam repellendus, tempore ipsum
          sapiente laudantium iste eos.
        </p>
        <button name="novo">Novo</button>
      </div>
      <Footer pos="fixed" bot={0} />
    </div>
  );
};

export default ProtocoloChamado;
