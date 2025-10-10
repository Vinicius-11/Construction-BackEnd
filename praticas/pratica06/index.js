const readline = require("readline-sync");

const controlador = require("./controlador");

function menu() {
  console.log(" MENU ");
  console.log("1 - Adicionar tarefa");
  console.log("2 - Buscar tarefa");
  console.log("3 - Atualizar tarefa");
  console.log("4 - Remover tarefa");
  console.log("5 - Sair");
}

async function escolherOpcao(opcao) {
  switch (opcao) {
    case "1":
      const nomeAdicionar = readline.question("Digite o nome da tarefa: ");
      await controlador.adicionarTarefa(nomeAdicionar);
      break;

    case "2":
      const nomeBuscar = readline.question("Digite o nome da tarefa: ");
      const tarefa = await controlador.buscarTarefa(nomeBuscar);
      if (tarefa && tarefa.id) {
        console.log("Tarefa encontrada:");
        console.log("ID:", tarefa.id);
        console.log("Nome:", tarefa.nome);
        console.log("Concluida:", tarefa.concluida);
      } else {
        console.log("Tarefa não encontrada.");
      }
      break;

    case "3":
      const nomeAtualizar = readline.question("Digite o nome da tarefa: ");
      const concluidaStr = readline.question("Tarefa concluida? (sim/nao): ");
      const concluida = concluidaStr.toLowerCase() === "sim";
      await controlador.atualizarTarefa(nomeAtualizar, concluida);
      break;

    case "4":
      const nomeRemover = readline.question("Digite o nome da tarefa: ");
      await controlador.removerTarefa(nomeRemover);
      break;

    case "5":
      process.exit(0);

    default:
      console.log("Opcao inválida!");
  }
}

async function main() {
  while (true) {
    menu();
    const opcao = readline.question("Escolha uma opcao: ");
    await escolherOpcao(opcao);
  }
}

main();
