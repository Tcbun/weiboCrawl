const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch({
        headless: false,
    });

    const page = await browser.newPage();

    await page.goto('https://weibo.com/');

    await page.waitFor(10000);

    await page.setViewport({
        width: 1440,
        height: 1080
    })

    await page.waitFor(2000);

    const user = '微博用户名';
    const pwd = '微博密码';
    await page.type('input[node-type=username]', user, { delay: 0 });
    await page.type('input[node-type=password]', pwd, { delay: 1 });

    await page.click('.login_btn a');

    await page.waitFor(10000);

    await page.goto('https://weibo.com/5237951642/IcRgvaT2K?filter=hot&root_comment_id=0&type=comment#_rnd1574832700280');

    await page.waitFor(2000);

    await page
        .mainFrame()
        .addScriptTag({
            url: 'https://code.jquery.com/jquery-3.4.1.min.js'
        });

    const PLLength = 7350;
    const pages = await parseInt(PLLength) / 15;
 

    // for (let i = 0; i < 10; i++) {

        await page.click('.more_txt');

        const result = await page.evaluate(() => {
            var id = 0;
            var data = [];
            let ulList = Array.from($('.list_con > .WB_text'));
            ulList.map(v => {
                id++;
                let dataItem = {};
                let username = $(v).find('a:eq(0)').text();
                let content = $(v).text().trim().replace('/\\n/', '');
                dataItem['id'] = id;
                dataItem['username'] = username;
                dataItem['content'] = content;
                data.push(dataItem);
            });
            return data;
        });


        console.log(result);
    // };

    await browser.close();

})();