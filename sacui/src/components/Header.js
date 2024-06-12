import "./Header.css";

/**
 * 
 * @param {*} toHome callback para retornar ao menu principal quando o usuário clicar no logo. 
 * @returns 
 */
const Header = ({toHome}) => {
  return (
    <div>
      <div className="Header" onClick={toHome}>
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
