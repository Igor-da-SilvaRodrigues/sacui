import Footer from "./Footer"
import Header from "./Header"
import WaterMark from "./WaterMark"
import "./CriarNovoChamado.css"

const CriarNovoChamado = () => {
  return (
    <div>
        <Header />
        <WaterMark />
        <h1>CRIAR NOVO CHAMADO</h1>
        <label className="novochamado">
            <span>Nome do chamado:</span>
            <input type="text" name="nome" placeholder="Digite um nome para o novo chamado" />
            <span>Possíveis motivos:</span>
            <input type="text" name="op1" placeholder="Digite uma opção..." />
            <input type="text" name="op2" placeholder="Digite uma opção..." />
            <input type="text" name="op3" placeholder="Digite uma opção..." />
            <input type="text" name="op4" placeholder="Digite uma opção..." />
            <input type="text" name="op5" placeholder="Digite uma opção..." />
            <input type="text" name="op6" placeholder="Digite uma opção..." />
            <span>Prioridade:</span>
            <select name="prioridade">
                <option value="0">Baixa</option>
                <option value="1">Média</option>
                <option value="2">Alta</option>
            </select>
            <div>
                <button>Cancelar</button>
                <button>Salvar</button>
            </div>
        </label>
        <Footer pos={"fixed"} bot={0} />
    </div>
  )
}

export default CriarNovoChamado