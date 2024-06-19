export const ChamadoStatus = {
    'FECHADO':0,
    'EM_ANDAMENTO':1,
    'ABERTO':2,
    'RETORNADO':3
}

export const statusFromString = (string) => {
    const s = String(string).toUpperCase().replace(' ','_')
    switch (s) {
        case "FECHADO":
            return ChamadoStatus.FECHADO
        case "EM_ANDAMENTO":
            return ChamadoStatus.EM_ANDAMENTO
        case "ABERTO":
            return ChamadoStatus.ABERTO
        case "RETORNADO":
            return ChamadoStatus.RETORNADO
        default:
            throw new Error(`Illegal argument ${s}`)
    }
}