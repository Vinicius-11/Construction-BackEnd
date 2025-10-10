const conectarDb = require("./database.js");

class Tarefa {
  db = null;
  collection = null;

  constructor(nome, concluida) {
    this.nome = nome;
    this.concluida = concluida;
    this.id = null;
  }

  async init() {
    this.db = await conectarDb();
    this.collection = this.db.collection("tarefas");
  }

  async inserir() {
    try {
      if (!this.collection) await this.init();

      const resultado = await this.collection.insertOne({
        nome: this.nome,
        concluida: this.concluida,
      });
      this.id = resultado.insertedId;
    } catch (erro) {
      console.error("Erro ao inserir tarefa:", erro);
    }
  }

  async alterar() {
    try {
      if (!this.collection) await this.init();

      const resultado = await this.collection.updateOne(
        { nome: this.nome },
        {
          $set: {
            nome: this.nome,
            concluida: this.concluida,
          },
        }
      );

      if (resultado.matchedCount === 0) {
        console.log("Nenhuma tarefa encontrada com esse nome.");
      }
    } catch (erro) {
      console.error("Erro ao alterar tarefa:", erro);
    }
  }

  async deletar() {
    try {
      if (!this.collection) await this.init();

      const resultado = await this.collection.deleteOne({ nome: this.nome });
      if (resultado.deletedCount === 0) {
        console.log("Nenhuma tarefa encontrada com esse nome.");
      }
    } catch (erro) {
      console.error("Erro ao deletar tarefa:", erro);
    }
  }

  async buscar() {
    try {
      if (!this.collection) await this.init();

      const resultado = await this.collection.findOne({ nome: this.nome });
      if (resultado) {
        this.id = resultado._id;
        this.nome = resultado.nome;
        this.concluida = resultado.concluida;
      } else {
        console.log("Tarefa não encontrada.");
      }
    } catch (erro) {
      console.error("Erro ao buscar tarefa:", erro);
    }
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      concluida: this.concluida,
    };
  }
}

module.exports = Tarefa;
