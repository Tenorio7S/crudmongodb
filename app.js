import express from "express";
import conectaNaDatabase from "./src/config/connect.js";
import Restaurante from "./src/models/restauranteModel.js";

const app = express();

const conexao = conectaNaDatabase();


app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor está rodando na porta 3000!");
});

const restaurantes = [
  { id: 1, nome: "Restaurante A", tipo: "Comida Italiana", preco: "R$100,00"},
  { id: 2, nome: "Restaurante B", tipo: "Comida Mexicana", preco: "R$90,00"},
  { id: 3, nome: "Restaurante C", tipo: "Comida Japonesa", preco: "R$80,00"},
  { id: 4, nome: "Restaurante D", tipo: "Comida Chinesa", preco: "R$70,00"},
];




// Listar
app.get('/', (req, res) => {
  res.status(200).send('Inicio Restaurantes!')
})

app.get('/restaurantes', async (req, res) => {
  try {
    const restaurantesMongoDB = await Restaurante.find();
    const todosRestaurantes = [...restaurantes, ...restaurantesMongoDB];
    res.status(200).json(todosRestaurantes);
  } catch (error) {
    console.error("Erro ao buscar restaurantes:", error);
    res.status(500).json("Erro ao buscar restaurantes.");
  }
});



// Detalhes
app.get('/restaurantes/:id', async (req, res) => {
  try {
    const restaurante = await Restaurante.findById(req.params.id);
    if (restaurante) {
      res.status(200).json(restaurante);
    } else {
      res.status(404).send("Restaurante não encontrado.");
    }
  } catch (error) {
    console.error("Erro ao buscar restaurante por ID:", error);
    res.status(500).send("Erro ao buscar restaurante por ID.");
  }
});




// Adicionar
app.post('/restaurantes', async (req, res) => {
  try {
    const { nome, tipo, preco } = req.body;

    if (!nome || !tipo || !preco) {
      return res.status(400).json("Campos 'nome', 'tipo' e 'preco' são obrigatórios.");
    }
    const novoRestaurante = new Restaurante(req.body);
    await novoRestaurante.save();
    res.status(201).json({ message: "Restaurante cadastrado com sucesso!", restaurante: novoRestaurante});
  } catch (error) {
    console.error("Erro ao cadastrar restaurante:", error);
    res.status(500).json("Erro ao cadastrar restaurante.");
  }
});



// Atualizar
app.put('/restaurantes/:id', async (req, res) => {
  try {
    const restaurante = await Restaurante.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (restaurante) {
      res.status(200).json({ message: "Restaurante atualizado com sucesso!", restaurante });
    } else {
      res.status(404).send("Restaurante não encontrado.");
    }
  } catch (error) {
    console.error("Erro ao atualizar restaurante:", error);
    res.status(500).send("Erro ao atualizar restaurante.");
  }
});




// Deletar
app.delete("/restaurantes/:id", async (req, res) => {
  try {
    const restaurante = await Restaurante.findByIdAndDelete(req.params.id);
    if (restaurante) {
      res.status(200).json("Restaurante deletado com sucesso!");
    } else {
      res.status(404).send("Restaurante não encontrado.");
    }
  } catch (error) {
    console.error("Erro ao deletar restaurante:", error);
    res.status(500).send("Erro ao deletar restaurante.");
  }
});



// function buscaRestaurante(id) {return restaurantes.findIndex(restaurante => restaurante.id == id);}


export default app;
