const { By } = require('selenium-webdriver');

class DashboardPage {
    constructor(driver){
        this.driver = driver;
        this.addtocartbutton = By.css('#add-to-cart-sauce-labs-backpack');
        this.cartbutton = By.css('.shopping_cart_link');
    }

    async navigate(){
        await this.driver.get("https://www.saucedemo.com/inventory.html")
    }

    async dashboarditem(){
        await this.driver.findElement(this.addtocartbutton).click();
        await this.driver.findElement(this.cartbutton).click();
    }
    
    async isOnDashboard(){
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
    }

    async isOnCartpage(){
        const item = await this.driver.findElement(By.className('inventory_item_name'));
        return item.getText();
    }

}

module.exports = DashboardPage;