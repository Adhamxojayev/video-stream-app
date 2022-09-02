import fs from 'fs'
import path from 'path'


function read (fileName) {
    let data =  fs.readFileSync(path.resolve(process.cwd(), 'src', 'database', fileName + '.json'), 'utf-8')
    return JSON.parse(data) || []
}


function write (fileName, data) {
    fs.writeFileSync(path.resolve(process.cwd(), 'src', 'database', fileName + '.json'), JSON.stringify(data, null, 4))
    return true
}

export {
    read, write
}