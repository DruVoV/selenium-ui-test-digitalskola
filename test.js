const { Builder, By, Key, until } = require('selenium-webdriver')

async function exampleTest() {
    // Membuat koneksi dengan Browser Driver
    let driver = await new Builder().forBrowser('chrome').build();

    // Exception handling & Conclusion
    try {
        // Buka URL di BRowser
        await driver.get("https://www.google.com");

        // search box
        let searchBox = await driver.findElement(By.name('q'));

        // simulate user behavior typing 
        await searchBox.sendKeys("Hello World!", Key.RETURN);
        await driver.wait(until.elementLocated(By.id('result-stats')), 10000);

        let title = await driver.getTitle();
        console.log(`Page Title is: ${title}`);
    } finally {
        // close browser
        await driver.quit();

    }
}

exampleTest();