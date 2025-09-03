const { calcularMediaAluno } = require("../src/calcularMediaAluno.js");

test("Essa função existe? ", function() {
  expect(calcularMediaAluno).toBeDefined();
});

// LETRA A e B
test("Gerar erro quando a1 ou a2 nao forem informadas", () => {
  expect(() => calcularMediaAluno(undefined, 5, 6)).toThrow("Notas a1 ou a2 não informadas");
  expect(() => calcularMediaAluno(5, undefined, 6)).toThrow("Notas a1 ou a2 não informadas");
});

// LETRA C e D
test("Gerar erro quando a1 ou a2 forem negativo", function() {
    expect(() => calcularMediaAluno(-1, 5, 7)).toThrow("Notas a1 ou a2 não podem ser negativas");
    expect(() => calcularMediaAluno(5, -3, 7)).toThrow("Notas a1 ou a2 não podem ser negativas");
});
  


// LETRA E e F
test("Calculo base quando a3 não é informada", function() {
    expect(calcularMediaAluno(3, 3)).toBeCloseTo(3);
  });
  

// LETRA G e H
test("a3 é negativo", function() {
    expect(() => calcularMediaAluno(1, 5, -7)).toThrow("Nota a3 não pode ser negativa");
});

// LETRA I
test('quando a3 é informada e a melhor combinação é a3 com a1', function() {
    expect(calcularMediaAluno(6, 5, 9)).toBeCloseTo(7.8);
});

// LETRA J
test('quando a3 é informada e a melhor combinação é a3 com a2', function() {
    expect(calcularMediaAluno(2, 7, 9)).toBeCloseTo(8.2);
});


