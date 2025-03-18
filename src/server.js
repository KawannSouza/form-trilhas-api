import express from 'express';
import cors from 'cors';
import setupSwagger from '../config/swaggerConfig.js';
import candidateRoutes from './routes/candidateRoutes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/users", candidateRoutes);

app.get("/", (req, res) => {
    res.send("API working! 🚀")
})

setupSwagger(app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});