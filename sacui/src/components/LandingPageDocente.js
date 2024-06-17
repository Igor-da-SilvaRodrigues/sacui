import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

const LandingPageDocente = () => {
  const [showDates, setShowDates] = useState(false);

  const adm = { name: "Bob", mat: 123456 };

  const abertos = [
    {
      prot: 123456789,
      pri: "1",
      name: "Ana Maria",
      mat: "123456",
      abert: "01/06/2024",
      mod: "01/06/2024",
      fech: "02/06/2024",
    },
    {
      prot: 123456789,
      pri: "1",
      name: "Ana Maria",
      mat: "123456",
      abert: "01/06/2024",
      mod: "01/06/2024",
      fech: "02/06/2024",
    },
    {
      prot: 123456789,
      pri: "1",
      name: "Ana Maria",
      mat: "123456",
      abert: "01/06/2024",
      mod: "01/06/2024",
      fech: "02/06/2024",
    },
    {
      prot: 123456789,
      pri: "1",
      name: "Ana Maria",
      mat: "123456",
      abert: "01/06/2024",
      mod: "01/06/2024",
      fech: "02/06/2024",
    },
  ];

  const handleRadioChange = (event) => {
    if (event.target.value === "0") {
      setShowDates(true);
    } else {
      setShowDates(false);
    }
  };

  return (
    <div>
      <Header />
      <h3>
        Você está logado como {adm.name} - Mat.: {adm.mat}
      </h3>
      <h1>Revisão de Chamados</h1>

      {/* Table de chamados abertos */}
      <table>
        <thead>
          <tr>
            <th
              colSpan={8}
              style={{
                color: "#fff",
                backgroundImage: "linear-gradient(to top, #063E63, #549BC7)",
              }}
            >
              ABERTOS
            </th>
          </tr>
          <tr>
            <th></th>
            <th>CHAMADO</th>
            <th>PRIORIDADE</th>
            <th>ALUNO</th>
            <th>MATRÍCULA</th>
            <th>ABERTURA</th>
            <th>MODIFICAÇÃO</th>
            <th>FECHAMENTO</th>
          </tr>
        </thead>
        <tbody>
          {abertos.map((aberto, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{aberto.prot}</td>
              <td>{aberto.pri}</td>
              <td>{aberto.name}</td>
              <td>{aberto.mat}</td>
              <td>{aberto.abert}</td>
              <td>{aberto.mod}</td>
              <td>{aberto.fech}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <label>
        <span>Período:</span>
        <input
          type="radio"
          name="periodo"
          value={30}
          onChange={handleRadioChange}
        />
        30 dias
        <input
          type="radio"
          name="periodo"
          value={60}
          onChange={handleRadioChange}
        />
        60 dias
        <input
          type="radio"
          name="periodo"
          value={90}
          onChange={handleRadioChange}
        />
        90 dias
        <input
          type="radio"
          name="periodo"
          value={0}
          onChange={handleRadioChange}
        />
        Outro
      </label>
      {showDates && (
        <div
          style={{
            display: "flex",
            width: "fit-content",
            margin: "0 auto",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <input type="date" name="dataInicial" />
          <p style={{ color: "#000", fontSize: "medium" }}>até</p>
          <input type="date" name="dataFinal" />
          <input
            type="submit"
            value="Ok"
            style={{ marginLeft: "10px", borderRadius: "10px" }}
          />
        </div>
      )}

      {/* Table de chamados em andamento */}
      <table>
        <thead>
          <tr>
            <th
              colSpan={8}
              style={{
                color: "#fff",
                backgroundImage: "linear-gradient(to top, #063E63, #549BC7)",
              }}
            >
              EM ANDAMENTO
            </th>
          </tr>
          <tr>
            <th></th>
            <th>CHAMADO</th>
            <th>PRIORIDADE</th>
            <th>ALUNO</th>
            <th>MATRÍCULA</th>
            <th>ABERTURA</th>
            <th>MODIFICAÇÃO</th>
            <th>FECHAMENTO</th>
          </tr>
        </thead>
        <tbody>
          {abertos.map((aberto, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{aberto.prot}</td>
              <td>{aberto.pri}</td>
              <td>{aberto.name}</td>
              <td>{aberto.mat}</td>
              <td>{aberto.abert}</td>
              <td>{aberto.mod}</td>
              <td>{aberto.fech}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <label>
        <span>Período:</span>
        <input
          type="radio"
          name="periodo"
          value={30}
          onChange={handleRadioChange}
        />
        30 dias
        <input
          type="radio"
          name="periodo"
          value={60}
          onChange={handleRadioChange}
        />
        60 dias
        <input
          type="radio"
          name="periodo"
          value={90}
          onChange={handleRadioChange}
        />
        90 dias
        <input
          type="radio"
          name="periodo"
          value={0}
          onChange={handleRadioChange}
        />
        Outro
      </label>
      {showDates && (
        <div
          style={{
            display: "flex",
            width: "fit-content",
            margin: "0 auto",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <input type="date" name="dataInicial" />
          <p style={{ color: "#000", fontSize: "medium" }}>até</p>
          <input type="date" name="dataFinal" />
          <input
            type="submit"
            value="Ok"
            style={{ marginLeft: "10px", borderRadius: "10px" }}
          />
        </div>
      )}

      {/* Table de chamados retornados */}
      <table>
        <thead>
          <tr>
            <th
              colSpan={8}
              style={{
                color: "#fff",
                backgroundImage: "linear-gradient(to top, #063E63, #549BC7)",
              }}
            >
              RETORNADOS
            </th>
          </tr>
          <tr>
            <th></th>
            <th>CHAMADO</th>
            <th>PRIORIDADE</th>
            <th>ALUNO</th>
            <th>MATRÍCULA</th>
            <th>ABERTURA</th>
            <th>MODIFICAÇÃO</th>
            <th>FECHAMENTO</th>
          </tr>
        </thead>
        <tbody>
          {abertos.map((aberto, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{aberto.prot}</td>
              <td>{aberto.pri}</td>
              <td>{aberto.name}</td>
              <td>{aberto.mat}</td>
              <td>{aberto.abert}</td>
              <td>{aberto.mod}</td>
              <td>{aberto.fech}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <label>
        <span>Período:</span>
        <input
          type="radio"
          name="periodo"
          value={30}
          onChange={handleRadioChange}
        />
        30 dias
        <input
          type="radio"
          name="periodo"
          value={60}
          onChange={handleRadioChange}
        />
        60 dias
        <input
          type="radio"
          name="periodo"
          value={90}
          onChange={handleRadioChange}
        />
        90 dias
        <input
          type="radio"
          name="periodo"
          value={0}
          onChange={handleRadioChange}
        />
        Outro
      </label>
      {showDates && (
        <div
          style={{
            display: "flex",
            width: "fit-content",
            margin: "0 auto",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <input type="date" name="dataInicial" />
          <p style={{ color: "#000", fontSize: "medium" }}>até</p>
          <input type="date" name="dataFinal" />
          <input
            type="submit"
            value="Ok"
            style={{ marginLeft: "10px", borderRadius: "10px" }}
          />
        </div>
      )}

      {/* Table de chamados encerrados */}
      <table>
        <thead>
          <tr>
            <th
              colSpan={8}
              style={{
                color: "#fff",
                backgroundImage: "linear-gradient(to top, #063E63, #549BC7)",
              }}
            >
              ENCERRADOS
            </th>
          </tr>
          <tr>
            <th></th>
            <th>CHAMADO</th>
            <th>PRIORIDADE</th>
            <th>ALUNO</th>
            <th>MATRÍCULA</th>
            <th>ABERTURA</th>
            <th>MODIFICAÇÃO</th>
            <th>FECHAMENTO</th>
          </tr>
        </thead>
        <tbody>
          {abertos.map((aberto, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{aberto.prot}</td>
              <td>{aberto.pri}</td>
              <td>{aberto.name}</td>
              <td>{aberto.mat}</td>
              <td>{aberto.abert}</td>
              <td>{aberto.mod}</td>
              <td>{aberto.fech}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <label>
        <span>Período:</span>
        <input
          type="radio"
          name="periodo"
          value={30}
          onChange={handleRadioChange}
        />
        30 dias
        <input
          type="radio"
          name="periodo"
          value={60}
          onChange={handleRadioChange}
        />
        60 dias
        <input
          type="radio"
          name="periodo"
          value={90}
          onChange={handleRadioChange}
        />
        90 dias
        <input
          type="radio"
          name="periodo"
          value={0}
          onChange={handleRadioChange}
        />
        Outro
      </label>
      {showDates && (
        <div
          style={{
            display: "flex",
            width: "fit-content",
            margin: "0 auto",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <input type="date" name="dataInicial" />
          <p style={{ color: "#000", fontSize: "medium" }}>até</p>
          <input type="date" name="dataFinal" />
          <input
            type="submit"
            value="Ok"
            style={{ marginLeft: "10px", borderRadius: "10px" }}
          />
        </div>
      )}

      <div>
        <button>Revisar</button>
        <button>Criar novo chamado</button>
      </div>

      <Footer mtop="10px" />
    </div>
  );
};

export default LandingPageDocente;
