import Footer from "./Footer";
import Header from "./Header";

import { useGetChamadosByUser } from "../hooks/useGetChamadosByUser";
import { useState } from "react";
import { useGetChamadoById } from "../hooks/useGetChamadoById";

const VerificarChamadoDiscente = ({ user, url, token }) => {
  //resgatando todos os chamados do discente
  const {
    isLoading: isLoadingGetChamados,
    isError: isErrorGetChamados,
    error: errorGetChamados,
    statusCode: statusCodeGetChamados,
    chamados,
  } = useGetChamadosByUser(
    `${url}/chamado/usuario`,
    null,
    user["matricula"],
    token
  );

  const [selectedChamado, setSelectedChamado] = useState("");

  //resgatando detalhes do chamado selecionado (pode ser nulo)
  const {
    isLoading: isLoadingChamado,
    isError: isErrorChamado,
    error: errorChamado,
    statusCode: statusCodeChamado,
    chamado,
  } = useGetChamadoById(
    `${url}/chamado`,
    null,
    selectedChamado,
    token
  );

  const status = "Aberto";
  const handleSelectChamadoChange = (e) => {
    setSelectedChamado(
      chamados.find(
        (chamado) => chamado["inicial"]["protocolo"] === e.target.value
      )["inicial"]["protocolo"]
    );
  };

  return (
    <div>
      <Header />
      <h1>Verificar Chamados</h1>
      <label>
        <select
          name="chamados"
          style={{ marginTop: "20px", fontSize: "medium" }}
        >
          <option value="default"> -- Protocolo -- </option>
          {chamados.map((chamado) => (
            <option value={chamado["inicial"]["protocolo"]}>
              {chamado["inicial"]["protocolo"]}
            </option>
          ))}
        </select>
      </label>
      <h3>Status: {status}</h3>
      <h3>Parecer:</h3>
      <p
        style={{
          color: "#000",
          fontSize: "medium",
          width: "500px",
          marginTop: "6px",
          margin: "0 auto",
        }}
        onChange={handleSelectChamadoChange}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quam
        adipisci ipsam? Vitae modi amet eveniet debitis. Ratione, molestias eius
        totam facere et hic saepe rerum possimus itaque, natus veritatis! Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Sequi incidunt
        eveniet ea tenetur, beatae ratione fugit necessitatibus rerum impedit!
        Error officia modi quod minima sed est aliquam in alias quas!
      </p>
      <button name="novo">Novo</button>
      <Footer pos="fixed" bot={0} />
    </div>
  );
};

export default VerificarChamadoDiscente;
