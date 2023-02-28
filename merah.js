const puppeteer = require('puppeteer');
const cookiesFilePath = 'merah.json';

async function login(page){
    console.log("Mengunjungi halaman login")
    try {
        await page.goto('https://burukab.sipd.kemendagri.go.id/daerah', {waitUntil: ['networkidle0', 'domcontentloaded']});   
    } catch (error) {
        await page.goto('https://burukab.sipd.kemendagri.go.id/daerah', {waitUntil: ['networkidle0', 'domcontentloaded']});   
    }

    let pageEvaluate = await page.evaluate(async () => {
        let m = document.querySelector("#wrapper > #page-wrapper-portal > .container-fluid > .row > .col-lg-12 > .wrapper-tengah > div:last-child > div:nth-child(2) > .bulet")
        m.onclick()
    })

    await page.waitForNetworkIdle()
    await page.type("[name='user_name']", 'erick')
    await page.type("[name='user_password']", 'erick')
    await page.click("button[type='submit']")

    await page.waitForNavigation()

}

(async () => {
    const browser = await puppeteer.launch({headless:false, devtools: false, defaultViewport:null, args:['--start-maximized']}); //, devtools: true, defaultViewport:null, args:['--start-maximized'] 
    const page = await browser.newPage()
    await login(page)
    
    await page.waitForNetworkIdle()
    await page.waitForSelector('.bulet')
    let pageEvaluate = await page.evaluate(async () => {
        let m = document.querySelector("#wrapper > #page-wrapper-portal > .container-fluid > .row > .col-lg-12 > .wrapper-tengah > #set_portal > div:last-child > .bulet")
        m.onclick()
    })

    await page.waitForSelector('canvas')
    await page.waitForNetworkIdle()

    

    
    // jika dirasa lengkap, baru dilakukan merge file
    
    // await browser.close();
})();

function gantiTanggal(){
    let nomor = document.getElementsByTagName('table')[2].querySelector('tr:nth-child(2)').querySelector('td:nth-child(5)')
    nomor.textContent = '43 Tahun 2022'
    let tanggal = document.getElementsByTagName('table')[2].querySelector('tr:nth-child(3)').querySelector('td:nth-child(5)')
    tanggal.textContent = '30 Desember 2022'
    let ttd = document.getElementsByTagName('table')[4]
    ttd.innerHTML = ''
}
gantiTanggal()