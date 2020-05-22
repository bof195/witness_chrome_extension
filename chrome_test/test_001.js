/* working off of this: https://gokatz.me/blog/automate-chrome-extension-testing/ */
const C = require('../chrome/assets/js/constants.js');

const puppeteer = require('puppeteer');

const assert = require('assert');

const extensionPath = "./chrome";
let extensionPage = null;
let browser = null;

describe('Extension UI Testing', function() {
	this.timeout(50000); // default is 2 seconds and that may not be enough to boot browsers and pages.
	before(async function() {
  		this.enableTimeouts(false) 
		await boot();
	});

	describe('Extension Popup Basics', async function() {
		it('Find Manual Witness Button', async function() {
			const targetSelector = '#'+C.K_MANUAL_WITNESS+C.C_BUTTON;
			const target = await extensionPage.$(targetSelector);
			assert.ok(target, targetSelector+' is not rendered');
    
		/*
      await extensionPage.type('[data-test-input]', 'Gokul Kathirvel');
      await extensionPage.click('[data-test-greet-button]');
    
      const greetMessage  = await extensionPage.$eval('#greetMsg', element => element.textContent)
      assert.equal(greetMessage, 'Hello, Gokul Kathirvel!', 'Greeting message is not shown');
	  */
		})

		it('Find Auto Witness Button', async function() {
			const targetSelector = '#'+C.K_AUTO_WITNESS+C.C_SLIDER;
			const target = await extensionPage.$(targetSelector);
			assert.ok(target, targetSelector+' is not rendered');
    
		/*
      await extensionPage.type('[data-test-input]', 'Gokul Kathirvel');
      await extensionPage.click('[data-test-greet-button]');
    
      const greetMessage  = await extensionPage.$eval('#greetMsg', element => element.textContent)
      assert.equal(greetMessage, 'Hello, Gokul Kathirvel!', 'Greeting message is not shown');
	  */
		})
	});

	after(async function() {
		await browser.close();
	});
});

// test.js




async function boot() {
	browser = await puppeteer.launch({
		executablePath: process.env.PUPPETEER_EXEC_PATH, // set by docker container in CI environment
		headless: false, // extension are allowed only in head-full mode
		args: [
			`--no-sandbox`,	//Required for CI to work
			`--enable-automation`,
			`--disable-extensions-file-access-check`, //Required for CI to work
			`--disable-extensions-except=${extensionPath}`,
			`--load-extension=${extensionPath}`
		]
	});

	const dummyPage = await browser.newPage();
	await dummyPage.waitFor(2000); // arbitrary wait time.

    const extensionName = "Witness This Media"; //Matches the name in the manifest (which is internationalized!!! I guess running this test in english only)

	const targets = await browser.targets();
	const extensionTarget = targets.find(({ _targetInfo }) => {
    	return _targetInfo.title === extensionName && _targetInfo.type === 'background_page';
	});

	//const extensionURL = "chrome-extension://laamipgenpgadjfhhhnmgcndkeaelhib/popup.html";
	//const extensionID = 'laamipgenpgadjfhhhnmgcndkeaelhib';
	const extensionUrl = extensionTarget._targetInfo.url || '';
	const [,, extensionID] = extensionUrl.split('/');

	const extensionPopupHTML = "popup.html";

	extensionPage = await browser.newPage();
	await extensionPage.goto(`chrome-extension://${extensionID}/${extensionPopupHTML}`);
}


/*
(async () => {
	const browser = await puppeteer.launch({
			headless:false,
			args: [
				`--disable-extensions-except=${extensionPath}`,
				`--load-extension=${extensionPath}`
			]
	});

	const extensionPage = await browser.newPage();
	await extensionPage.goto(`chrome-extension://${extensionID}/${extensionPopupHTML}`);
	const button = await extensionPage.$('#manual_process_button');
	assert.ok(button,'button is not rendered');
	extensionPage.click(button);
	*/
	
	/*
	await page.goto('file:///Users/djp3/git/witness_chrome_extension/chrome_test/html/test_001.html');

	const value = await page.evaluate( () => {
			return {
					size:monitoredImages.length
			};
	});*/
 
	//await page.screenshot({path: 'example.png'});

//	await browser.close();
//})();
