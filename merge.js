const fs = require('fs')
const { PDFDocument } = require('pdf-lib')
const _ = require('underscore')
const{
    PATH
} = require('./lib/api')

async function mergeFile(listSKPD, directoryAttachment){
    for (const skpd of listSKPD) {
        let pdfBuffer = []
        for (const attachment of directoryAttachment) {
            let dir = `${PATH.DPA.UTAMA}\\${attachment}`
            let skpdFolder = `${dir}\\${skpd}`
            // kalo folder, kita walk through them
            if(fs.existsSync(skpdFolder) && fs.lstatSync(skpdFolder).isDirectory()){
                let fileInDir = fs.readdirSync(skpdFolder)
                for (const fileDir of fileInDir) {
                    let buffer = fs.readFileSync(`${skpdFolder}\\${fileDir}`)
                    pdfBuffer.push(buffer)
                }
            } else {
                let file = `${skpdFolder}.pdf`
                if(fs.existsSync(file) && fs.lstatSync(file).isFile()){
                    let buffer = fs.readFileSync(file)
                    pdfBuffer.push(buffer)
                }
            }
        }
        const mergedPdf = await PDFDocument.create()

        for (const pdfBytes of pdfBuffer) {
            let pdf = await PDFDocument.load(pdfBytes)
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
            copiedPages.forEach((page) => {
                mergedPdf.addPage(page)
            })
        }    

        const res = await mergedPdf.save()
        const finalPath = `${PATH.DPA.UTAMA}\\8. DPA Lengkap`

        if(!fs.existsSync(finalPath)){
            console.log(`Membuat Folder ${finalPath}`)
            fs.mkdirSync(finalPath)
        }

        let savePath = `${finalPath}\\${skpd}.pdf`
        console.log(savePath)
        if(fs.existsSync(savePath)){
            fs.unlinkSync(savePath)
        }

        fs.open(savePath, 'w', function (err, fd) {
            fs.write(fd, res, 0, res.length, null, function (err) {
                fs.close(fd, function () {
                    console.log('merge file successfully');
                }); 
            }); 
        });
    }
}

const directoryAttachment = [
    '1. Halaman Persetujuan',
    '2. Halaman Depan',
    '3. DPA SKPD',
    '4. DPA Pendapatan',
    '5. DPA Belanja',
    '6. DPA Rincian Belanja',
    '7. Pembiayaan',
]

const listSKPD = fs.readdirSync(PATH.DPA.RINCIANBELANJA)

mergeFile(listSKPD, directoryAttachment)