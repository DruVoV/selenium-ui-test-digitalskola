const { By } = require('selenium-webdriver');

class FormPage {
    constructor(driver){
        this.driver = driver;
        this.firstname = By.css('#first-name');
        this.lastname = By.css('#last-name');
        this.zipcode = By.css('#postal-code');
        this.continueButton = By.css('#continue');
    }

    async navigate(){
        await this.driver.get("https://www.saucedemo.com/checkout-step-one.html")
    }

    async FillForm(){
        await this.driver.findElement(this.firstname).sendKeys("josh");
        await this.driver.findElement(this.lastname).sendKeys("bart");
        await this.driver.findElement(this.zipcode).sendKeys("5555");
        await this.driver.findElement(this.continueButton).click();
    }
    
    async isOnformPage(){
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
    }

}

module.exports = FormPage;