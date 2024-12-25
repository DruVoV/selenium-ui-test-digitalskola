const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const DashboardPage = require('../WebComponent/DashboardPage');
const assert = require('assert');
const fs = require('fs');
const CartPage = require('../WebComponent/CartPage');
const FormPage = require('../WebComponent/FormPage');
const OverviewPage = require('../WebComponent/OverviewPage');
const CompletePage = require('../WebComponent/CompletePage');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 4 #Function', function () {
    this.timeout(40000);
    let driver;

    switch(browser.toLowerCase()){
        case 'firefox' :
            const firefox = require('selenium-webdriver/chrome');
            options = new firefox.Options();
            options.addArguments('--headless');
        case 'edge' :
            const edge = require('selenium-webdriver/chrome');
            options = new edge.Options();
            options.addArguments('--headless');
        case 'chrome' :
        default:
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');
            break;
    }

    before(async function (){
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });

    beforeEach(async function (){
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, password);
    });

    beforeEach(async function (){
        const dashboardpage = new DashboardPage(driver);
        await dashboardpage.navigate();
        await dashboardpage.dashboarditem();
    })

    beforeEach(async function (){
        const Cartpage = new CartPage(driver);
        await Cartpage.navigate();
        await Cartpage.cartpage();
    })

    beforeEach(async function (){
        const Formpage = new FormPage(driver);
        await Formpage.navigate();
        await Formpage.FillForm();
    })

    beforeEach(async function (){
        const Formpage = new OverviewPage(driver);
        await Formpage.navigate();
        await Formpage.overviewpage();
    })

    it('buying item until succeed', async function(){
        const Completepage = new CompletePage(driver);
        const title = await Completepage.isOncompletepage();
        assert.strictEqual(title, 'Thank you for your order!', 'Expected title name to be Thank you for your order!')
    });

    afterEach(async function (){
        const screenshot =await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
    })

    after(async function (){
        await driver.quit();
    });

});