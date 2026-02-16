import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", //Test escritos en TS
  testEnvironment: "node", //Ejecuta los tests como si estuvieran en Node.js
  clearMocks: true, //Limpia cache de test anteriores
  rootDir: ".", //Define la raíz del proyecto para Jest
  testMatch: ["**/*.test.ts"], //Busca todos los archivos que terminan en test.ts
  setupFiles: ["<rootDir>/jest.setup.ts"], // Antes de correr cualquier test, Jest ejecuta esto
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Permite usar alias para optimizar imports
  },
};

export default config;
