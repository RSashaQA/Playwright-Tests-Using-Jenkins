const { test, expect } = require('@playwright/test');

test('Тест поиска каналов с неверным/верным запросом', async ({ page }) => {
    await page.goto('https://limehd.tv/');
    
    //ввод в поисковую строку
    await page.locator('[placeholder="Поиск по ТВ каналам и телепередачам"]').fill('\\\\qwe!@#$%^\\\\\\');
    await page.waitForTimeout(3000)

    //проверяем текст поисковой выдачи
    await page.isVisible('text=По запросу \\\\qwe!@#$%^\\\\\\ ничего не найдено');
    const searchChannel = await page.innerText('.page-header__search-container > .page-header__search-label > .search__modal-container > .search__modal-wrapper--not-channels > .search-modal__title');
    expect(searchChannel).toBe('ПО ЗАПРОСУ \\\\QWE!@#$%^\\\\\\ НИЧЕГО НЕ НАЙДЕНО');
    
    //ввод в поисковую строку, преднамеренная опечатка
    await page.locator('[placeholder="Поиск по ТВ каналам и телепередачам"]').fill('оссия к');
    await page.waitForTimeout(3000)

    //проверяем текст поисковой выдачи, переходим на канал
    await page.isVisible('p:has-text("Россия К")');
    await page.locator('p:has-text("Россия К")').click();
    await page.waitForURL('https://limehd.tv/channel/russiak');

    //сверяем название канала
    const searchChannel1 = await page.innerText('text=Россия К');
    expect(searchChannel1).toBe('РОССИЯ К');
    await page.isVisible('text=Россия К')
})