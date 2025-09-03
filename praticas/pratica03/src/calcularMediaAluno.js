function calcularMediaAluno(a1, a2, a3) {
    if (a1 === undefined || a2 === undefined) {
        throw new Error("Notas a1 ou a2 não informadas");
    }

    // LETRA C e D
    if (a1 < 0 || a2 < 0) {
        throw new Error("Notas a1 ou a2 não podem ser negativas");
    }

    // LETRA E e F
    if (a3 === undefined) {
        return a1 * 0.4 + a2 * 0.6
    }

    // LETRA G e H
    if (a3 < 0) {
        throw new Error("Nota a3 não pode ser negativa");
    }

    const mediaA1A2 = a1 * 0.4 + a2 * 0.6;
    const mediaA1A3 = a1 * 0.4 + a3 * 0.6;
    const mediaA3A2 = a2 * 0.4 + a3 * 0.6;
  
    return Math.max(mediaA1A2, mediaA1A3, mediaA3A2);
}


module.exports = { calcularMediaAluno };