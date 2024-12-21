const { Builder } = require('selenium-webdriver');
const LoginPage = require('./WebComponent/LoginPage');
const DashboardPage = require('./WebComponent/DashboardPage');
const assert = require('assert');
const fs = require('fs');

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 3', function () {
    this.timeout(40000);
    let driver;

    before(async function (){
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async function (){
        const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    beforeEach(async function (){
        const dashboardpage = new DashboardPage(driver);
        await dashboardpage.navigate();
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