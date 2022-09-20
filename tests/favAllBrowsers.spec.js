// const { test, expect, webkit, chromium, firefox } = require('@playwright/test');
// const { promises } = require('fs-extra');

// function getRandomInt(max) {
//     return Math.floor(Math.random() * max);
// }

// const userNameFavWebkit = ('testdeleteme' + getRandomInt(666999666) + '@test.test') //не забыть подчищать созданные аккаунты
// const userNameFavFirefox = ('testdeleteme' + getRandomInt(666999666) + '@test.test')
// const userNameFavChromium = ('testdeleteme' + getRandomInt(666999666) + '@test.test') 
// const passwordFav = ('qqqqqq')

// test.setTimeout(120000)

// test('Тест добавление/удаление каналов из страницы канала c авторизацией. Часть 1 регистрация, добавление в избранное', async () => {
// //webkit, firefox
//     for (const browserType of [chromium]) {
//         const browser = await browserType.launch();
//         const page = await browser.newPage();

//         await page.goto('https://limehd.tv/signup');

//         //для регистрации в разных браузерах используется свой e-mail
//         if (browserType.name() == 'webkit') {
//             await page.locator('input[type="email"]').fill(userNameFavWebkit)
//         }
//         if (browserType.name() == 'chromium') {
//             await page.locator('input[type="email"]').fill(userNameFavChromium)
//         }
//         if (browserType.name() == 'firefox') {
//             await page.locator('input[type="email"]').fill(userNameFavFirefox)
//         }
//         // дальше код исполняется для всех браузеров
//         await page.locator('input[type="password"]').first().fill(passwordFav);
//         await page.locator('text=Повторите пароль >> input[type="password"]').fill(passwordFav);
//         await page.locator('text=Зарегистрироваться').click();
//         await page.locator('text=Отлично').click();
//         console.log('bug https://limehd.atlassian.net/browse/PW-347');
//         await page.waitForSelector('text=t');
//         await page.locator('text=ТВ-каналы').click();

    
//         //добавляем НТВ в избранные, через страницу канала
//         await page.locator('text=НТВ').click();
//         await page.waitForSelector('.page-main > .stream__item > .stream__title-container > .stream__favorite-container > .stream__favorite')
//         await page.click('.page-main > .stream__item > .stream__title-container > .stream__favorite-container > .stream__favorite')
//         await page.waitForTimeout(2000)
//         await page.locator('text=Все телеканалы').click();
//         await page.waitForTimeout(2000)
    
//         //добавляем ДОМАШНИЙ в избранные, через страницу канала
//         await page.locator('text=ДОМАШНИЙ').click();
//         await page.waitForSelector('.page-main > .stream__item > .stream__title-container > .stream__favorite-container > .stream__favorite')
//         await page.click('.page-main > .stream__item > .stream__title-container > .stream__favorite-container > .stream__favorite')
//         await page.waitForTimeout(2000)
//         await page.close()
//     }
// });
// //webkit, firefox
// test('Тест добавление/удаление каналов из страницы канала c авторизацией. Часть 2 (авторизация, проверка избранных удаление каналов из избранных)', async () => {
//     for (const browserType of [ chromium ]) {
//         const browser = await browserType.launch();
//         const page = await browser.newPage();

//         await page.goto('https://limehd.tv/login');

//         //авторизация в разных браузерах используется свой e-mail
//         if (browserType.name() == 'webkit') {
//             await page.locator('input[type="email"]').fill(userNameFavWebkit)
//         }
//         if (browserType.name() == 'chromium') {
//             await page.locator('input[type="email"]').fill(userNameFavChromium)
//         }
//         if (browserType.name() == 'firefox') {
//             await page.locator('input[type="email"]').fill(userNameFavFirefox)
//         }
//         // дальше код исполняется для всех браузеров
//         await page.locator('input[type="password"]').fill(passwordFav);
//         await page.locator('text=Войти').click();
//         await page.waitForSelector('text=t');

//         //проверяем, что каналы в избранном
//         await page.locator('text=Избранные').click();
//         await page.isVisible('text=НТВ', 'text=ДОМАШНИЙ')

//         //удаляем НТВ и ДОМАШНИЙ из избранных, через страницу канала
//         await page.waitForSelector('.channel__item-container:nth-child(2) > .channel-container > .channel__item > .channel__wrapper > .channel__title-container > .channel__title-wrapper > .channel__favorite-container > .channel__favorite')
//         await page.click('.channel__item-container:nth-child(2) > .channel-container > .channel__item > .channel__wrapper > .channel__title-container > .channel__title-wrapper > .channel__favorite-container > .channel__favorite')

//         await page.waitForSelector('.channel__wrapper > .channel__title-container > .channel__title-wrapper > .channel__favorite-container > .channel__favorite')
//         await page.click('.channel__wrapper > .channel__title-container > .channel__title-wrapper > .channel__favorite-container > .channel__favorite')
//         await page.close()
//     }});

// //webkit, chromium, firefox
//     test('Тест добавление/удаление каналов из страницы канала c авторизацией. Часть 3 (авторизация, проверка отсутствия каналов в избранных)', async () => {
//         for (const browserType of [ chromium ]) {
//             const browser = await browserType.launch();
//             const page = await browser.newPage();

//         await page.goto('https://limehd.tv/login');

//         //авторизация в разных браузерах используется свой e-mail
//         if (browserType.name() == 'webkit') {
//             await page.locator('input[type="email"]').fill(userNameFavWebkit)
//         }
//         if (browserType.name() == 'chromium') {
//             await page.locator('input[type="email"]').fill(userNameFavChromium)
//         }
//         if (browserType.name() == 'firefox') {
//             await page.locator('input[type="email"]').fill(userNameFavFirefox)
//         }
//         // дальше код исполняется для всех браузеров
//         await page.locator('input[type="password"]').fill(passwordFav);
//         await page.locator('text=Войти').click();
//         await page.waitForSelector('text=t');

//         //проверяем, что добавленные ранее каналы в избранном отсутствуют'
//         await page.locator('text=Избранные').click();
//         await page.waitForTimeout(3000)
//         await page.isHidden('text=НТВ', 'text=ДОМАШНИЙ');
//         await page.close()  
//     }});