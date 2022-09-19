const puppeteer = require('puppeteer');

async function login(page){
    console.log("Mengunjungi halaman login")
    try {
        await page.goto('https://burukab.sipd.kemendagri.go.id/daerah', {waitUntil: ['networkidle0', 'domcontentloaded']});   
    } catch (error) {
        await page.goto('https://burukab.sipd.kemendagri.go.id/daerah', {waitUntil: ['networkidle0', 'domcontentloaded']});   
    }

    let m = await page.$('#wrapper > #page-wrapper-portal > .container-fluid > .row > .col-lg-12 > .wrapper-tengah > div:last-child')
    console.log(m)

}

(async () => {
    const browser = await puppeteer.launch({headless:false, devtools: true, defaultViewport:null, args:['--start-maximized']}); //, devtools: true, defaultViewport:null, args:['--start-maximized'] 
    const page = await browser.newPage();
    await login(page)

    // jika dirasa lengkap, baru dilakukan merge file
    
    // await browser.close();
})();