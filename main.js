let fs = require("fs")
let path = require("path")

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
    
//@keyword: name of the applications
//@foundApp: [Function] of return 
//@PathAppPlank: Path of the directory of applications
function findApplications(keyword, foundApp, pathAppPlank="/usr/share/applications/"){
    fs.readdir(pathAppPlank, (err, dir) => {
        if (err) throw err
        let infoApp = ["Name", "Exec", "Keywords" ] 
        
        let listApp = dir.filter(file => {
            return path.extname(file) === ".desktop"
        }).map(file => {
            return readAtrDesktop(path.join(pathAppPlank, file ),infoApp)
        }).filter(file => {
            return file.Keywords.search(keyword) >= 1
        })
    
        foundApp(listApp)
    })
}

function output(s){
    //console.log(s)
}
findApplications("file", output )

