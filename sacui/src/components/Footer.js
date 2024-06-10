import "./Footer.css";

const Footer = ({pos, bot}) => {
  return (
    <div className="footer" style={{ position: pos, bottom: bot }}>
      <p>
        Trabalho acadêmico de Projeto Integrador - Gabriel Santos, Igor
        Rodrigues e Raphael Santos
      </p>
    </div>
  );
};

export default Footer;
