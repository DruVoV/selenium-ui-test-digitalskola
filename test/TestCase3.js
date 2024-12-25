const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const DashboardPage = require('../WebComponent/DashboardPage');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 3', function () {
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
        await dashboardpage.navigate(baseUrl);
        await dashboardpage.dashboarditem();
    })

    it('adding item and verify the item on cart', async function(){
        const dashboardPage = new DashboardPage(driver);
        const item = await dashboardPage.isOnCartpage();
        assert.strictEqual(item, 'Sauce Labs Backpack', 'Expected item name to be Sauce Labs Backpack')

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