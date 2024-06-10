import Footer from "./Footer";
import Header from "./Header";
import "./AberturaChamadoDiscente.css";

const AberturaChamadoDiscente = () => {
  const tiposChamados = [
    { id: 0, name: "" },
    { id: 1, name: "Alteração de Cadastro" },
    { id: 2, name: "Colação de Grau" },
    { id: 3, name: "Declarações" },
    { id: 4, name: "Destrancamento" },
    { id: 5, name: "Dispensa de disciplinas" },
    { id: 6, name: "Ementas" },
    { id: 7, name: "Históricos" },
    { id: 8, name: "Outros assuntos" },
    { id: 9, name: "Quebra de choque de horário" },
    { id: 10, name: "Quebra de requisito" },
    { id: 11, name: "Readmissão de matrícula" },
    { id: 12, name: "Revisão de inscrição" },
    { id: 13, name: "Trancamento" },
  ];

  const motivos = [
    { id: 0, name: "" },
    { id: 1, name: "Primeira solicitação" },
    { id: 2, name: "Extravio" },
    { id: 3, name: "Outro motivo" },
  ];

  return (
    <div>
      <Header />
      <h1>Abertura de chamado:</h1>
      <label className="aberturaChamado">
        <span>Chamado</span>
        <select name="tipoChamado">
          {tiposChamados.map((tipoChamado) => (
            <option value={tipoChamado.id}>{tipoChamado.name}</option>
          ))}
        </select>
        <span>Motivo</span>
        <select name="motivo">
          {motivos.map((motivo) => (
            <option value={motivo.id}>{motivo.name}</option>
          ))}
        </select>
        <span>Justificativa:</span>
        <textarea
          name="justificativa"
          placeholder="Detalhe o motivo de seu chamado."
          rows={15}
          style={{ resize: "none" }}
        ></textarea>
        <input type="submit" className="submit"/>
      </label>
      <Footer pos="fixed" bot={0} />
    </div>
  );
};

export default AberturaChamadoDiscente;
