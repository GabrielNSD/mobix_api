"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./src/server");
(0, server_1.createServer)()
    .then((server) => {
    server.listen(3005, () => {
        console.info("Executando em http://localhost:3000");
    });
})
    .catch((err) => {
    console.error("Erro: ", err);
});
