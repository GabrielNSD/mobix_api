import { createServer } from "./server";

const PORT = process.env.API_PORT ? process.env.API_PORT : 3005;

createServer()
  .then((server) => {
    server.listen(PORT, () => {
      console.info(`Executando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro: ", err);
  });
