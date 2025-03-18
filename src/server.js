//IMPORTAÇÕES
import express from 'express';
import cors from 'cors';
import setupSwagger from '../config/swaggerConfig.js';
import candidateRoutes from './routes/candidateRoutes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/users", candidateRoutes);

//ROTA DE TESTE
app.get("/", (req, res) => {
    res.send("API working! 🚀")
})

//SWAGGER-API
setupSwagger(app);

//COLOCANDO A API PARA ESCUTAR NA PORTA QUE FOI DESIGNADA
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});