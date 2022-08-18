import express from "express";

const app = express();
const port = 3000; //variavel de ambiente

app.get("/", (req, res) => {
  res.send("Ola mundo");
});

app.listen(port, () => {
  console.log(`app rodando na porta ${port}`);
});
