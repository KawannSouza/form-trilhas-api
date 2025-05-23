//IMPORTAÇÕES
import prisma from '../prisma/prismaClient.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

//LÓGICA DE REGISTRO DE USUÁRIOS
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, cpf, cep, uf, logradouro } = req.body;
        const externalId = uuidv4();

        if(!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "Fill in all fields" });
        }

        if(password !== confirmPassword) {
            return res.status(401).json({ message: "Passwords do not match" });
        }

        const userExists = await prisma.users.findUnique({ where: { email } });
        if(userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.users.create({
            data: {
                externalId,
                name,
                email,
                password: hashedPassword,
                cpf,
                cep,
                uf, 
                logradouro
            }
        });

        const token = jwt.sign({ id: user.externalId, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" }); 
        res.status(201).json({
            message: "User registered successfully",
            user: { name: user.name, email: user.email},
            token
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

//LÓGICA DE LOGIN DE USUÁRIOS
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: "Fill in all fields" });
        }

        const user = await prisma .users.findUnique({ where: { email } });
        if(!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        const token = jwt.sign({ id: user.id, externalId: user.externalId, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            message: "User logged in successfully",
            user: { externalId: user.externalId, name: user.name, email: user.email },
            token
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserData = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.users.findFirst({
            where: {
                externalId: id
            }
        })
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, cpf, cep, uf, logradouro } = req.body;

    try {

        const userFound = await prisma.users.findFirst({
            where: { externalId: id }
        });
        
        const user = await prisma.users.update({
            where: {
                id: userFound.id
            },
            data: {
                name,
                email,
                cpf,
                cep,
                uf,
                logradouro
            }
        });

        res.status(200).json({
            message: "User updated successfully",
            user: {
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
}