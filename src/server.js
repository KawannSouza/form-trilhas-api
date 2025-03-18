import express from 'express';
import candidateRoutes from './routes/candidateRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/users", candidateRoutes);

app.get("/", (req, res) => {
    res.send("API working! 🚀")
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});