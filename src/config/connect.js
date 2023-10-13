import mongoose from "mongoose";

const DB_PASSWORD = 'zkUpgpPDv1sq72O5';

const conectaNaDatabase = () => {
  mongoose.connect(`mongodb+srv://tenorio:${DB_PASSWORD}@cluster0.19cyclg.mongodb.net/restaurante?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado ao banco de dados com sucesso!");
  })
  .catch(erro => {
    console.error("Erro ao conectar ao banco de dados:", erro);
  });
};

export default conectaNaDatabase;
