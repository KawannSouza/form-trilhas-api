//IMPORTAÇÕES
import { Router } from 'express';
import { registerUser, loginUser, getUserData, updateUser } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registra um novo usuário
 *     description: Cria um novo usuário no sistema, validando a senha, email e criando um token JWT.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: integer
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               cpf:
 *                 type: string
 *               cep:
 *                 type: string
 *               uf:
 *                 type: string
 *               logradouro:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Erro de validação, usuário já existe ou email já cadastrado
 *       500:
 *         description: Erro interno do servidor
 */

//ROTA DE REGISTRO DE USUÁRIOS
router.post("/register", registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Faz login no sistema
 *     description: Faz login no sistema, validando a senha e criando um token JWT.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Erro de validação, usuário já existe ou email já cadastrado
 *       500:
 *         description: Erro interno do servidor
 */

//ROTA DE LOGIN DE USUÁRIOS
router.post("/login", loginUser);

router.get("/:id/userdata", authenticate, getUserData);

router.put("/:id/update", authenticate, updateUser);

export default router;