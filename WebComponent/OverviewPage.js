const { By } = require('selenium-webdriver');

class OverviewPage {
    constructor(driver){
        this.driver = driver;
        this.finishButton = By.css('#finish');
    }

    async navigate(){
        await this.driver.get("https://www.saucedemo.com/checkout-step-two.html")
    }

    async overviewpage(){
        await this.driver.findElement(this.finishButton).click();
    }

    async isOncompletepage(){
        const title = await this.driver.findElement(By.className('inventory_item_name'));
        return title.getText();
    }

}

module.exports = OverviewPage;