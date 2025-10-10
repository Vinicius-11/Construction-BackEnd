const Tarefa = require("./modelo.js");

async function adicionarTarefa(nome) {
  try {
    const tarefa = new Tarefa(nome, false);
    await tarefa.inserir();
    console.log("Tarefa adicionada:", tarefa);
  } catch (erro) {
    console.error("Erro ao adicionar tarefa:", erro);
  }
}

async function buscarTarefa(nome) {
  try {
    const tarefa = new Tarefa(nome, false);
    await tarefa.buscar();
    return tarefa;
  } catch (erro) {
    console.error("Erro ao buscar tarefa:", erro);
  }
}

async function atualizarTarefa(nome, concluida) {
  try {
    const tarefa = new Tarefa(nome, concluida);
    await tarefa.buscar();

    if (tarefa.id) {
      tarefa.concluida = concluida;
      await tarefa.alterar();
      console.log("Tarefa atualizada:", tarefa);
    } else {
      console.log("Tarefa não encontrada");
    }
  } catch (erro) {
    console.error("Erro ao atualizar tarefa:", erro);
  }
}

async function removerTarefa(nome) {
  try {
    const tarefa = new Tarefa(nome, false);
    await tarefa.buscar();

    if (tarefa.id) {
      await tarefa.deletar();
      console.log("Tarefa removida:", tarefa);
    } else {
      console.log("Tarefa não encontrada");
    }
  } catch (erro) {
    console.error("Erro ao remover tarefa:", erro);
  }
}

module.exports = {
  adicionarTarefa,
  buscarTarefa,
  atualizarTarefa,
  removerTarefa,
};
