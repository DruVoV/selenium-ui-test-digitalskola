const { By } = require('selenium-webdriver');

class CompletePage {
    constructor(driver){
        this.driver = driver;
        this.backhomeButton = By.css('#back-to-products');
    }

    async navigate(){
        await this.driver.get("https://www.saucedemo.com/checkout-complete.html")
    }

    async overviewpage(){
        await this.driver.findElement(this.backhomeButton).click();
    }

    async isOncompletepage(){
        const title = await this.driver.findElement(By.className('complete-header'));
        return title.getText();
    }

}

module.exports = CompletePage;