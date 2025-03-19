//ARQUIVO DE CONFIGURAÇÃO DO SWAGGER

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Form Trilhas API",
            version: "1.0.0",
            description: "API para o projeto Form Trilhas"
        },
        servers: [
            {
                url: "https://form-trilhas-api.onrender.com",
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;