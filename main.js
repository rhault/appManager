let fs = require("fs")
let path = require("path")
let os = require("os")

//@desktop: path of the desktop file to read
//@infoSearch: atribute of the desktop file to search []
//@infoDesktop: return of the attribute sought {}
function readAtrDesktop(desktop,infoSearch,infoDesktop = {}){
    let readDesktop = fs.readFileSync(desktop, "utf-8")    
    let fileDesktop = readDesktop.split("\n").join()
    
    infoSearch.forEach(atr => {
        let name = fileDesktop.indexOf(atr),
            igual = fileDesktop.indexOf("=", name),
            value = fileDesktop.indexOf(",", igual);
            infoDesktop[atr] = fileDesktop.slice(igual+1, value)
    })
    return infoDesktop
}
    
//@keyword: name of the applications
//@PathAppPlank: Path of the directory of applications
//return a promise
function findApplications(keyword, pathAppPlank="/usr/share/applications/"){
    
    let infoApp = ["Name", "Exec", "Keywords" ] 
    let promise = new Promise((resolve, reject) => {
        
        fs.readdir(pathAppPlank, (err, files) => {
            if (err) reject(err)
            
            let listApp = files.filter(file => {
                return path.extname(file) === ".desktop"
            }).map(file => {
                return readAtrDesktop(path.join(pathAppPlank, file ),infoApp)
            }).filter(file => {
                return file.Name.toLowerCase().search(keyword) >= 0
                
            })
            resolve(listApp)    
        })
    })
    return promise
}

//@pathHome: default, path of the directory home
//@keywork: name of the a finding file
//return a Json
function findFiles(keyword, pathHome = os.homedir()){
    
    let readDir = fs.readdirSync(pathHome)
    let allFile = []
    readDir.forEach(files => {
        if(files.indexOf(".") == 0) return 0 //ignore the file hidden
        
        let pathStat = path.join(pathHome,files)
        let stat = fs.lstatSync(pathStat)
        if(stat.isDirectory()){                
            allFile = allFile.concat(findFiles(keyword, pathStat))
        }
        else if(files.indexOf(keyword) >= 0){
                allFile.push({"name":files, "path":pathStat})
        } 
    })
    return allFile
}