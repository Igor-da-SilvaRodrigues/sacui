import "./Header.css";

const Header = () => {
  return (
    <div>
      <div className="Header">
        <div id="logo">
          <img src="/logo-cefet.svg" alt="" />
          <h1>CEFET/RJ</h1>
        </div>

        <div id="titulo">
          <h2>Sistema Acadêmico de Chamados</h2>
        </div>

        <a id="logon" href="">
          Logout
        </a>
      </div>
      <p id="margem-inferior">.</p>
    </div>
  );
};

export default Header;
