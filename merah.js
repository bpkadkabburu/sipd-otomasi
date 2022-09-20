const puppeteer = require('puppeteer');

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

    await page.waitForNavigation();

}

(async () => {
    const browser = await puppeteer.launch({headless:false, devtools: false, defaultViewport:null, args:['--start-maximized']}); //, devtools: true, defaultViewport:null, args:['--start-maximized'] 
    const page = await browser.newPage();
    await login(page)

    // jika dirasa lengkap, baru dilakukan merge file
    
    // await browser.close();
})();