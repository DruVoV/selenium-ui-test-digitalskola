const { By } = require('selenium-webdriver');

class CartPage {
    constructor(driver){
        this.driver = driver;
        this.checkoutButton = By.css('#checkout');
    }

    async navigate(){
        await this.driver.get("https://www.saucedemo.com/cart.html")
    }

    async cartpage(){
        await this.driver.findElement(this.checkoutButton).click();
    }

    async isOnCartpage(){
        const item = await this.driver.findElement(By.className('inventory_item_name'));
        return item.getText();
    }

}

module.exports = CartPage;