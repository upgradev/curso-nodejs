const readLine = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readLine.question("Qual a sua linguagem preferida? ", (language) => {
    if(language === "python"){
       console.log("Boaaa python é massa"); 
    }
    else{
        console.log(`A minha linguagem preferida é: ${language}`);
    }
 
  readLine.close();
});
