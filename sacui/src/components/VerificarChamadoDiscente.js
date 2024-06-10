import Footer from "./Footer";
import Header from "./Header";

const VerificarChamadoDiscente = () => {
  const chamados = [
    { id: 0, protocolo: 123456789 },
    { id: 1, protocolo: 987654321 },
    { id: 2, protocolo: 256969691 },
  ];

  const status = "Aberto";

  return (
    <div>
      <Header />
      <h1>Verificar Chamados</h1>
      <label>
        <select
          name="chamados"
          style={{ marginTop: "20px", fontSize: "medium" }}
        >
          {chamados.map((chamado) => (
            <option value={chamado.id}>{chamado.protocolo}</option>
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
