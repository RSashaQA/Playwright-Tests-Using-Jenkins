const { test, expect } = require('@playwright/test');
const { promises } = require('fs-extra');

test.setTimeout(120000)

test('Тест переключение между категориями каналов', async ({ page }) => {
    await page.goto('https://limehd.tv/tv')

    await page.locator('text=Избранные').click();
    await page.waitForSelector('text=Добавьте каналы в избранное');
    await page.waitForTimeout(1000);

    await page.locator('text=Популярные').click();
    await page.waitForSelector('text=Россия 1');
    await page.waitForTimeout(1000);

    await page.locator('text=Все').first().click();
    await page.waitForSelector('text=Россия 1');
    await page.waitForTimeout(1000);

    await page.locator('text=Региональные').click();
    await page.waitForSelector('text=360 Новости');  
    await page.waitForTimeout(1000);

    await page.locator('text=Развлечения').click();
    await page.waitForSelector('text=Пятница!');
    await page.waitForTimeout(1000);

    await page.locator('text=Спорт').click();
    await page.waitForSelector('text=Матч! Боец');
    await page.waitForTimeout(1000);

    await page.locator('text=Детям').click();
    await page.waitForSelector('text=Карусель');
    await page.waitForTimeout(1000);

    await page.locator('text=Музыка').click();
    await page.waitForSelector('text=Муз-тв');
    await page.waitForTimeout(1000);

    await page.locator('text=Новости >> nth=0').click();
    await page.waitForSelector('text=Rt');
    await page.waitForTimeout(1000);

    await page.locator('text=Познавательные').click();
    await page.waitForSelector('text=Егэ');
    await page.waitForTimeout(1000);

    await page.locator('text=Фильмы').click();
    await page.waitForSelector('text=Киноужас');
});












