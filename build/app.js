"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const PORT = 3005;
(0, server_1.createServer)()
    .then((server) => {
    server.listen(PORT, () => {
        console.info(`Executando em http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error("Erro: ", err);
});
