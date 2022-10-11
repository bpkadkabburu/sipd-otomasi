const fs = require('fs')

const writeFile = (p, f) => {
    console.log(p)
    console.log(f)
}

const cookieList = (c, p) => {
    let r = ''
    if (fs.existsSync(p)) {
        const cs = fs.readFileSync(p)
        const pc = JSON.parse(cookiesString)
        for (let ck of pc) {
            if(ck.name === c){
                let n = new Date()
                let ckD = new Date(ck.expires * 1000)
                result = `${ck.name}=${ck.value}; Path=${ck.path}; HttpOnly; Expires=${ckD.toUTCString()};`
            }
        }
    }
    return r
}

const httpsAgent = () => new https.Agent({ rejectUnauthorized:false, keepAlive:true})

module.exports = {
    writeFile,
    cookieList,
    httpsAgent
}