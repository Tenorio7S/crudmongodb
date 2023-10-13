import mongoose from "mongoose";

const restauranteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  preco: {
    type: String,
    required: true,
  },
});

const Restaurante = mongoose.model("Restaurante", restauranteSchema);

export default Restaurante;
