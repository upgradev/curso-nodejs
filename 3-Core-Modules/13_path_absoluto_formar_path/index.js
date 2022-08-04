const path = require("path");

// path absoluto
console.log(path.resolve("./teste.txt"));

// formar path
const miodFolder = "relatorios"
const fileName = "teste2.txt"

const finalPath = path.join("/", "arquivos", miodFolder, fileName)

console.log(finalPath);