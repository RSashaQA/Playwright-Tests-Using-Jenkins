const { test, expect } = require('@playwright/test');

test.setTimeout(120000)

test('Тест открытия страницы канала', async ({ page }) => {
    await page.goto('https://limehd.tv/channel/1kanal');
    await page.waitForSelector('.page-main > .stream__item > .stream__current-program > .current-program__title-container > .current-program__time')
    await page.waitForSelector('.page-main > .stream__item > .stream__title-container > .stream__favorite-container > .stream__favorite')
    await page.waitForSelector('.page-main > .stream__item > .stream__title-container > .stream__button-container > .stream__button')
    await page.waitForSelector('.default__layout > .page-main > .stream__item > .current-program__description-container > .button-report')
    const streamName = await page.innerText('.default__layout > .page-main > .stream__item > .stream__title-container > .stream__title');
    expect(streamName).toBe('ПЕРВЫЙ КАНАЛ СМОТРЕТЬ ОНЛАЙН');
});