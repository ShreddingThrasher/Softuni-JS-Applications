const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://localhost:5500';

const mockData = {
    "d953e5fb-a585-4d6b-92d3-ee90697398a0":{
        "author":"J.K.Rowling",
        "title":"Harry Potter and the Philosopher's Stone"
    },
    "d953e5fb-a585-4d6b-92d3-ee90697398a1":{
        "author":"Svetlin Nakov",
        "title":"C# Fundamentals"
    }
}

describe('Tests', async function() {
    this.timeout(10000);

    let browser, page;

    before(async () => browser = await chromium.launch({headless: false, slowMo: 1000}));    
    after(async () => await browser.close());

    beforeEach(async () => page = await browser.newPage());
    afterEach(async () => await page.close());

    it('Loads all books', async () => {

        page.route('**/jsonstore/collections/books', (route, request ) => {
            route.fulfill({
                headers: {
                    'access-control-allow-origin': '*',
                    'content-type': 'application/json'
                },
                body: JSON.stringify(mockData)
            })
        })
        
        //navigate to page
        await page.goto(host)
        
        //find and click load button
        await page.click('text="LOAD ALL BOOKS"');
        await page.waitForSelector('text=Harry Potter');

        //check that books are displayed
        const rowData = await page.$$eval('tbody tr', rows => rows.map(r => r.textContent));

        expect(rowData[0]).to.contains('Harry Potter');
        expect(rowData[0]).to.contains('Rowling');
        expect(rowData[1]).to.contains('C# Fundamentals');
        expect(rowData[1]).to.contains('Nakov');
    })

    it('creates book', async () => {

        //navigate to page
        await page.goto(host);

        //find form
        //fill input fields
        await page.fill('input[name=title]', 'Title')
        await page.fill('input[name=author]', 'Author')


        //click submit
        const [request] = await Promise.all([
            page.waitForRequest((request) => request.method() == 'POST'),
            page.click('text=Submit')
        ])
        
        const data = JSON.parse(request.postData());

        expect(data.title).to.equal('Title');
        expect(data.author).to.equal('Author');
    })

    it('Edits book', async () => {

        //navigate to page
        await page.goto(host);
        await page.click('text="LOAD ALL BOOKS"')

        //click edit
        await page.click('[data-id="d953e5fb-a585-4d6b-92d3-ee90697398a0"] .editBtn');

        //fill field
        await page.fill('#editForm input[name=title]', 'testing edit button')

        //submit
        const [request] = await Promise.all([
            page.waitForRequest((request) => request.method() == 'PUT'),
            page.click('text="Save"')
        ])

        //check if edited
        await page.click('text="LOAD ALL BOOKS"')

        let bookTitle = await page.textContent('[data-id="d953e5fb-a585-4d6b-92d3-ee90697398a0"] td')
        const data = JSON.parse(request.postData());

        expect(data.title).to.equal('testing edit button');
        expect(bookTitle).to.equal('testing edit button');
        
    })

    it('Deletes book', async () => {

        page.on('dialog', dialog => dialog.accept());
        //navigate to page
        await page.goto(host);
        await page.click('text="LOAD ALL BOOKS"');

        //click delete
        const [request] = await Promise.all([
            page.waitForRequest((req) => req.method() == 'DELETE'),
            page.click('[data-id="d953e5fb-a585-4d6b-92d3-ee90697398a0"] .deleteBtn')
        ])
        
        const method = request.method();
        //check request

        expect(method).to.equal('DELETE');
    })
})