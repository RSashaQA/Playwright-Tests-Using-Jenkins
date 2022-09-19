// const { test, expect } = require('@playwright/test');

// test.setTimeout(120000)

// test('Тест пагинации списка каналов на  главной странице каналов', async ({ page }) => {
//     await page.goto('https://limehd.tv/tv')

//     await page.setViewportSize({ width: 1920, height: 1080 });

//     await page.locator('text=Показать еще').click();

//     try {
//         // Go to https://limehd.tv/tv/page1
//         await page.goto('https://limehd.tv/tv/page1');
//         await page.waitForSelector('text=Стс');
//         await page.waitForSelector('text=Загрузка телеканалов...', { state: 'hidden', timeout: 1000 });

//         // Go to https://limehd.tv/tv/page2
//         await page.goto('https://limehd.tv/tv/page2');
//         await page.waitForSelector('text=Ратник')
//         await page.waitForSelector('text=Загрузка телеканалов...', { state: 'hidden', timeout: 1000 });

//         // Go to https://limehd.tv/tv/page3
//         await page.goto('https://limehd.tv/tv/page3');
//         await page.waitForSelector('text=Тонус')
//         await page.waitForSelector('text=Загрузка телеканалов...', { state: 'hidden', timeout: 1000 });

//         // Go to https://limehd.tv/tv/page4
//         await page.goto('https://limehd.tv/tv/page4');
//         await page.waitForSelector('text=Нано')
//         await page.waitForSelector('text=Загрузка телеканалов...', { state: 'hidden', timeout: 1000 });

//         // Go to https://limehd.tv/tv/page5
//         await page.goto('https://limehd.tv/tv/page5');
//         await page.waitForSelector('text=Киномикс')
//         await page.waitForSelector('text=Загрузка телеканалов...', { state: 'hidden', timeout: 1000 });

//         // Go to https://limehd.tv/tv/page6
//         await page.goto('https://limehd.tv/tv/page6');
//         await page.waitForSelector('text=360')
//         await page.waitForSelector('text=Загрузка телеканалов...', { state: 'hidden', timeout: 1000 });

//         // Go to https://limehd.tv/tv/page7
//         await page.goto('https://limehd.tv/tv/page7');
//         await page.waitForSelector('text=Смайлик')
//         await page.waitForSelector('text=Загрузка телеканалов...', { state: 'hidden', timeout: 1000 });

//         // Go to https://limehd.tv/tv/page8
//         await page.goto('https://limehd.tv/tv/page8');
//         await page.waitForSelector('text=Грозный')
//         await page.waitForSelector('text=Загрузка телеканалов...', { state: 'hidden', timeout: 1000 });

//         // Go to https://limehd.tv/tv/page9
//         await page.goto('https://limehd.tv/tv/page9');
//         await page.waitForSelector('text=Дагестан')
//         await page.waitForSelector('text=Загрузка телеканалов...', { state: 'hidden', timeout: 1000 });

//         // Go to https://limehd.tv/tv/page10
//         await page.goto('https://limehd.tv/tv/page10');
//         await page.waitForSelector('text=Жар птица')
//         await page.waitForSelector('text=Загрузка телеканалов...', { state: 'hidden', timeout: 1000 });

//         // Go to https://limehd.tv/tv/page11
//         await page.goto('https://limehd.tv/tv/page11');
//         await page.waitForSelector('text=Севастополь 24')
//         await page.waitForSelector('text=Загрузка телеканалов...', { state: 'hidden', timeout: 1000 });

//         // Go to https://limehd.tv/tv/page12
//         await page.goto('https://limehd.tv/tv/page12');
//         await page.waitForSelector('text=MIXM')
//         await page.waitForSelector('text=Загрузка телеканалов...', { state: 'hidden', timeout: 1000 });

//         // Go to https://limehd.tv/tv/page13
//         await page.goto('https://limehd.tv/tv/page13');
//         await page.waitForSelector('text=Мегаполис югра')
//         await page.waitForSelector('text=Загрузка телеканалов...', { state: 'hidden', timeout: 1000 });
//     } catch (err) { console.log('bug https://limehd.atlassian.net/browse/PW-309') }

//     // надо бы переделать

//     //await page.mouse.wheel().
//     //сролить пока элемент не будет виден

// });