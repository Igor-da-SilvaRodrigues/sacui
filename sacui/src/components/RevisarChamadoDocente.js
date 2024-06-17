import Footer from "./Footer";
import Header from "./Header";
import "./RevisarChamadoDocente.css";
import WaterMark from "./WaterMark";

const RevisarChamadoDocente = () => {
  const chamados = [
    {
      prot: 123456,
      mot: "Declaração",
      just: "Preciso reativar o Bilhete Único",
    },
  ];

  const responsaveis = ["Secretaria", "Coordenação", "Reitoria"];

  const status = ["Aberto", "Em andamento", "Retornado", "Fechado"];

  return (
    <div>
      <Header />
      <WaterMark />
      <h1 style={{ marginBottom: "10px" }}>Revisar Chamados</h1>
      <div className="bloco">
        <div className="chamado">
          <h3>Chamado:</h3>
          <p>{chamados.map((chamado) => chamado.prot)}</p>
          <h3>Motivo:</h3>
          <p>{chamados.map((chamado) => chamado.mot)}</p>
          <h3>Justificativa:</h3>
          <p>{chamados.map((chamado) => chamado.just)}</p>
        </div>
        <div className="revisao">
          <h3>Responsável:</h3>
          <select name="responsavel">
            {responsaveis.map((responsavel) => (
              <option>{responsavel}</option>
            ))}
          </select>
          <h3>Parecer:</h3>
          <textarea className="nota"
            name="parecer"
            placeholder="Nota técnica."
            rows={10}
            cols={50}
            style={{ resize: "none" }}
          ></textarea>
          <h3>Status:</h3>
          <select name="status">
            {status.map((status) => (
              <option>{status}</option>
            ))}
          </select>
        </div>
      </div>
      <button>Anterior</button>
      <button>Próximo</button>
      <button>Histórico</button>
      <button>Salvar</button>
      <button>Fechar</button>
      <Footer pos={"fixed"} bot={0} />
    </div>
  );
};

export default RevisarChamadoDocente;
