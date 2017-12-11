let fs = require("fs")
let infoApp = ["Name" ] //"Exec", "Keywords"

//@desktop: path of the desktop file to read
//@infoSearch: atribute of the desktop file to search []
//@infoDesktop: return of the attribute sought {}
function readAtrDesktop(desktop,infoSearch,infoDesktop = {}){
    let file = fs.readFileSync(desktop, "utf-8")    
    let fileDesktop = file.split("\n").join()
    
    infoSearch.forEach(atr => {
        let name = fileDesktop.indexOf(atr),
            igual = fileDesktop.indexOf("=", name),
            value = fileDesktop.indexOf(",", igual);
            infoDesktop[atr] = fileDesktop.slice(igual+1, value)
    })
    
    return infoDesktop
}
    
console.log(readAtrDesktop("./main.text", infoApp))