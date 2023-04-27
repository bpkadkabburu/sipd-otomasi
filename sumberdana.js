const {
    rekening : rek,
    dinas,
    bidangPUDiambil,
    bidangPendidikanDiambil,
    bidangKesehatanDiambil,
    yangTidakDiambil,
    yangDiambil
} = require('./sumberdanasource1')

function format(x) {
    return Intl.NumberFormat('id-ID', { style: "currency", currency: "IDR" }).format(x)
}

function total(x){
    return x.reduce((acc, item) => acc + parseInt(item.rincian), 0)
}

let rekening = rek.map(item => {
    item.nama_sub_giat = item.nama_sub_giat.replace(/\n\n/g, ' ')
    return item
})

const paguDBH = 13105949000
const paguDAU = 495841678000
const paguPAD = 45000000000
const paguPTAD = 15218474836
const paguDAKFisik = 58006807000
const paguDAKNonFisik = 106818338000
const paguDD = 74990012000
const paguPembiayaan = 1195172942

console.log("PAGU DAU " + format(paguDBH+paguDAU+paguPAD+paguPTAD))
console.log("PAGU DAK FISIK " + format(paguDAKFisik))
console.log("PAGU DAK NON FISIK " + format(paguDAKNonFisik))
console.log("PAGU DAK " + format(paguDAKNonFisik+paguDAKFisik))
console.log("PAGU DD " + format(paguDD))
console.log("PAGU TOTAL " + format(paguDBH+paguDAU+paguPAD+paguPTAD+paguDAKNonFisik+paguDAKFisik+paguDD))

const paguBelanja = 807786085894
console.log("PAGU BELANJA " + format(paguBelanja))
let kurang = paguBelanja - total(rekening)
console.log('TOTAL SIPD ' + format(total(rekening)))
console.log('BELUM MASUK KE MAPPING SUMBER DANA ' + format(kurang))

const DAU = rekening.filter(item => {
    if(/Dana Alokasi Umum/.test(item.nama_dana) === true){
        return item
    }
    if(/daerah/.test(item.nama_dana.toLowerCase()) === true){
        return item
    }
})

const DAK = rekening.filter(item => {
    if(/DAK/.test(item.nama_dana) === true){
        return item
    }

    if(/Dana Alokasi Khusus/.test(item.nama_dana) === true){
        return item
    }
})

const DAKFisik = rekening.filter(item => {
    if(/Dana Alokasi Khusus Fisik/.test(item.nama_dana) === true){
        return item
    }
})

const DAKNonFisik = rekening.filter(item => {
    if(/Non Fisik/.test(item.nama_dana) === true){
        return item
    }
})

const DD = rekening.filter(item => {
    if(/Dana Desa/.test(item.nama_dana) === true){
        return item
    }
})

console.log('MAPPING DAU ' + format(total(DAU)))
console.log('MAPPING DAK ' + format(total(DAK)))
console.log('MAPPING DAK FISIK ' + format(total(DAKFisik)))
console.log('MAPPING DAK NON FISIK ' + format(total(DAKNonFisik)))
console.log('MAPPING DD ' + format(total(DD)))
const totalMapping = total(DAU) + total(DAKFisik) + total(DAKNonFisik) + total(DD)
console.log('TOTAL MAPPING ' + format(totalMapping))

const selisihDAU = (paguDBH+paguDAU+paguPAD+paguPTAD) - total(DAU)
const selisihDAK = (paguDAKNonFisik+paguDAKFisik) - total(DAK)
const selisihDAKFisik = paguDAKFisik - total(DAKFisik)
const selisihDAKNonFisik = paguDAKNonFisik - total(DAKNonFisik)
const selisihDD = paguDD - total(DD)
const totalSelisih = paguBelanja - totalMapping

console.log('SELISIH DAU ' + format(selisihDAU))
console.log('SELISIH DAK ' + format(selisihDAK))
console.log('SELISIH DAK FISIK ' + format(selisihDAKFisik))
console.log('SELISIH DAK NON FISIK ' + format(selisihDAKNonFisik))
console.log('SELISIH DD ' + format(selisihDD))
console.log('TOTAL SELISIH ' + format(totalSelisih))

let rekeningGroup = rekening.reduce((accumulator, currentValue) =>{
    (accumulator[currentValue.nama_dana] = accumulator[currentValue.nama_dana] || []).push(currentValue);
    return accumulator;
}, {})

for (const key in rekeningGroup) {
    if (Object.hasOwnProperty.call(rekeningGroup, key)) {
        const element = rekeningGroup[key];
        console.log('\x1b[31m%s\x1b[0m', key)
        // console.log(total(element))
        console.log(format(total(element)))
    }
}

/****************************** BIDANG PU **************************************/
const bidangPU = bidangPUDiambil.map(item => {
    let pattern = new RegExp(item.toLowerCase())
    let filter = DAU.filter(itemDau => {
        if(pattern.test(itemDau.nama_sub_giat.toLowerCase().replace(/\(/g,'').replace(/\)/g,'')) === true){
            return itemDau
        }
    })
    return {
        'nama':item,
        'rincian':total(filter),
        'jumlah':format(total(filter))
    }
})
console.log('Bidang PU')
console.log(format(total(bidangPU)))
// console.log(bidangPU)


/****************************** BIDANG PENDIDIKAN **************************************/
let bidangPendidikan = bidangPendidikanDiambil.map(item => {
    let pattern = new RegExp(item.toLowerCase().replace(/\(/g,'').replace(/\)/g,''))
    let filter = DAU.filter(itemDau => {
        if(pattern.test(itemDau.nama_sub_giat.toLowerCase().replace(/\(/g,'').replace(/\)/g,'')) === true){
            return itemDau
        }
    })

    return {
        'nama':item,
        'rincian':total(filter),
        'jumlah':format(total(filter))
    }
})

bidangPendidikan = bidangPendidikan.map(item => {
    if(item.nama === 'Penyediaan Gaji dan Tunjangan ASN'){
        item.rincian = 41811771000 * 20 / 100
        item.jumlah = format(item.rincian)
    }

    return item
})

console.log('Bidang Pendidikan')
console.log(format(total(bidangPendidikan)))

/****************************** BIDANG KESEHATAN **************************************/
const bidangKesehatan = bidangKesehatanDiambil.map(item => {
    let pattern = new RegExp(item.toLowerCase())
    let filter = DAU.filter(itemDau => {
        if(pattern.test(itemDau.nama_sub_giat.toLowerCase()) === true){
            return itemDau
        }
    })
    return {
        'nama':item,
        'rincian':total(filter),
        'jumlah':format(total(filter))
    }
})

console.log('Bidang Kesehatan')
console.log(format(total(bidangKesehatan)))

let gabung3Bidang = [...bidangPUDiambil, ...bidangPendidikanDiambil, ...bidangKesehatanDiambil]

gabung3Bidang = gabung3Bidang.map(item => item.toLowerCase())

let dauSetelahDifilter3Bidang = DAU.filter(item => {
    let word = item.nama_sub_giat.toLowerCase()
    let take = word.substring(16, word.length)
    if(!gabung3Bidang.includes(take)){
        return item
    }
})

let kodeYangTidakDiambil = yangTidakDiambil.map(item => item.kode)

let belanjaPegawai = rekening.filter(item => {
    let kodeAkun = item.kode_akun.substring(0,9);
    item.namaPendek = item.nama_sub_skpd.substring(23, item.nama_sub_skpd.length)
    if(kodeYangTidakDiambil.includes(kodeAkun)){
        item.induk = kodeAkun
        return item
    }
})

let belanjaPegawaiGroup = belanjaPegawai.reduce((accumulator, currentValue) =>{
    (accumulator[currentValue.induk] = accumulator[currentValue.induk] || []).push(currentValue);
    return accumulator;
}, {})


let kodeYangDiambil = yangDiambil.map(item => item.kode)

let dauSetelahFilter = dauSetelahDifilter3Bidang.filter(item => {
    let kodeAkun = item.kode_akun.substring(0,9);
    item.namaPendek = item.nama_sub_skpd.substring(23, item.nama_sub_skpd.length)
    if(kodeYangDiambil.includes(kodeAkun)){
        item.induk = kodeAkun
        return item
    }
})

let dauSebelumFilter = DAU.filter(item => {
    let kodeAkun = item.kode_akun.substring(0,9);
    item.namaPendek = item.nama_sub_skpd.substring(23, item.nama_sub_skpd.length)
    if(kodeYangDiambil.includes(kodeAkun)){
        item.induk = kodeAkun
        return item
    }
})

console.log('dau sebelum difilter')
console.log(format(total(dauSebelumFilter)))

console.log('dau setelah difilter')
console.log(format(total(dauSetelahFilter)))

let dauGroup = dauSetelahFilter.reduce((accumulator, currentValue) =>{
    (accumulator[currentValue.induk] = accumulator[currentValue.induk] || []).push(currentValue);
    return accumulator;
}, {})

let sortedKeys = Object.keys(dauGroup).sort((a, b) => a.localeCompare(b))

let sortedDauGroup = {}

sortedKeys.forEach((key) => {
    sortedDauGroup[key] = dauGroup[key]
})

for (const key in sortedDauGroup) {
    if (Object.hasOwnProperty.call(sortedDauGroup, key)) {
        const element = sortedDauGroup[key];
        const namaRekening = yangDiambil.filter(i => i.kode === key)
        // console.log('\x1b[31m%s\x1b[0m', namaRekening[0].kode +" " +namaRekening[0].uraian)
        // console.log(total(element))
        // console.log(format(total(element)))
    }
}

let dinasGroup = dauSetelahFilter.reduce((accumulator, currentValue) =>{
    (accumulator[currentValue.namaPendek] = accumulator[currentValue.namaPendek] || []).push(currentValue);
    return accumulator;
}, {})

for (const key in dinasGroup) {
    if (Object.hasOwnProperty.call(dinasGroup, key)) {
        const element = dinasGroup[key];
        const namaSKPD = dinas.filter(i => i === key)
        console.log('\x1b[31m%s\x1b[0m', namaSKPD[0])
        console.log(total(element))
        // console.log('\x1b[34m%s\x1b[0m','Rekening')
        const perRekening = element.reduce((accumulator, currentValue) =>{
            (accumulator[currentValue.induk] = accumulator[currentValue.induk] || []).push(currentValue);
            return accumulator;
        }, {})
        for (const keyRekening in perRekening) {
            if (Object.hasOwnProperty.call(perRekening, keyRekening)) {
                const elementRekening = perRekening[keyRekening];
                const namaRekening = yangDiambil.filter(i => i.kode === keyRekening)
                // console.log('\x1b[33m%s\x1b[0m', namaRekening[0].kode +" " +namaRekening[0].uraian)
                // console.log('\x1b[0m%s', total(elementRekening))
            }
        }
    }
}


