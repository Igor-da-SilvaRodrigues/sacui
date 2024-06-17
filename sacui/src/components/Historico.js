import Footer from "./Footer";
import Header from "./Header";
import WaterMark from "./WaterMark";
import "./Historico.css"

const Historico = () => {
  const chamado = {
    prot: 123456,
    resp: "Coordenação",
  };

  const parecer = [
    {
      data: "02/06/2024",
      parecer: "Parecer técnico adicionado.",
      status: "Em andamento",
    },
  ];

  return (
    <div>
      <Header />
      <WaterMark />
      <h1>Histórico do chamado {chamado.prot}</h1>
      <h3 style={{ marginTop: "20px" }}>Responsável:</h3>
      <p className="responsavel">{chamado.resp}</p>
      {parecer.map((parecer) => (
        <div className="parecer">
            <h3>Data:</h3>
            <p>{parecer.data}</p>
            <h3>Parecer:</h3>
            <p>{parecer.parecer}</p>
            <h3>Status:</h3>
            <p>{parecer.status}</p>
        </div>
      ))}
      <button>Fechar</button>
      <Footer pos={"fixed"} bot={0} />
    </div>
  );
};

export default Historico;
