let fs = require("fs")
let infoApp = ["Name" ] //"Exec", "Keywords"
//let infoDesktop = {}

function readDesktop(infoDesktop = {}){
    let file = fs.readFileSync("./main.text", "utf-8")    
    let fileDesktop = file.split("\n").join()
    
    infoApp.forEach(atr => {
        let name = fileDesktop.indexOf(atr),
            igual = fileDesktop.indexOf("=", name),
            value = fileDesktop.indexOf(",", igual);
            infoDesktop[atr] = fileDesktop.slice(igual+1, value)
    })
    
    return infoDesktop
}

console.log(readDesktop({"algo":"alfo"}))
