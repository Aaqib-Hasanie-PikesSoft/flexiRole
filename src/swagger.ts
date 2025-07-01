import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FlexiRole API",
      version: "1.0.0",
      description: "API documentation for FlexiRole project",
    },
    servers: [
      {
        url: "http://localhost:3000", // Update this with your server's URL
      },
    ],
  },
  apis: ["./src/modules/**/routes.ts"], // Define the path to your routes or API docs (where your endpoint handlers are)
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
