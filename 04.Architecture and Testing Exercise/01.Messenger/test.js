const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://localhost:5500';

const mockData = {
    "-LxHVtajG3N1sU714pVj":{
        "author":"Spami",
        "content":"Hello, are you there?"
    },
    "-LxIDxC-GotWtf4eHwV8":{
        "author":"Garry",
        "content":"Yep, whats up :?"
    },
    "-LxIDxPfhsNipDrOQ5g_":{
        "author":"Spami",
        "content":"How are you? Long time no see? :)"
    },
    "-LxIE-dM_msaz1O9MouM":{
        "author":"George",
        "content":"Hello, guys! :))"
    },
    "-LxLgX_nOIiuvbwmxt8w":{
        "author":"Spami",
        "content":"Hello, George nice to see you! :)))"
    }
}

describe('Messenger tests', function() {
    
    this.timeout(10000);

    let browser, page;

    before(async () => browser = await chromium.launch({headless: false, slowMo: 1000}));
    beforeEach(async () => page = await browser.newPage());
    afterEach(async () => page.close());
    after(async () => await browser.close());

    it('Should load all messages', async () => {
        page.route('**/jsonstore/messenger', (route, request ) => {
            route.fulfill({
                headers: {
                    'access-control-allow-origin': '*',
                    'content-type': 'application/json'
                },
                body: JSON.stringify(mockData)
            })
        })

        await page.goto(host);

        await page.click('#refresh');
        
        let data = await page.inputValue('#messages');
        let messages = data.split('\n');
        
        let index = 0;
        for (const key in mockData) {
            let message = `${mockData[key].author}: ${mockData[key].content}`
            
            expect(messages[index++]).to.equal(message);
        }
    })

    it('Should send request when adding a new message', async () => {

        await page.goto(host);

        await page.fill('#author', 'test author');
        await page.fill('#content', 'test content');

        const [request] = await Promise.all([
            page.waitForRequest((request) => request.method() == 'POST'),
            page.click('text=Send')
        ])
        
        const data = JSON.parse(request.postData());

        expect(data.author).to.equal('test author');
        expect(data.content).to.equal('test content');
    })
})