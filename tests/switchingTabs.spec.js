const { test, expect } = require('@playwright/test');

test('Тест смена вкладнок, ТВ-каналы, Кино, Подписки, ТВ-приставки', async ({ page }) => {

    await page.goto('https://limehd.tv/')

    //нажимаем на вкладку ТВ-каналы, прорверяем, что каналы пристуствуют на странице
    await page.locator('header a:has-text("ТВ-каналы")').click();
    await page.isVisible('text=Первый канал, text=Россия 1, text=Матч!')

    //нажимаем на вкладку Кино, прорверяем, что VOD временно не доступен
    await page.locator('header a:has-text("Кино")').click();
    await page.waitForURL('https://limehd.tv/movies');
    await page.waitForSelector('text=Популярное');
    await page.waitForSelector('text=Фильмы');
    await page.waitForSelector('text=Сериалы');

    //нажимаем на вкладку Подписки, 
    await page.locator('header ul >> text=Подписки').click();
    await page.waitForURL('https://limehd.tv/subscribes');

    //проверяем, что на странице есть текст "о подписках"
    const packsPage1 = await page.innerText('div > .default__layout > .packs__container > .form__apps > p:nth-child(1)');
    expect(packsPage1).toBe('Выберите и оплатите подписку.');
    const packsPage2 = await page.innerText('div > .default__layout > .packs__container > .form__apps > p:nth-child(2)');
    expect(packsPage2).toBe('Авторизуйтесь в приложении или на смарт-тв для просмотра на всех устройствах');

    //прорверяем, что пакеты каналов видны
    let i = 0
    do {
        i++;
        await page.isVisible('.packs__list > li:nth-child(' + i + ') > .packs__item-container > .packs__item > .pack__container')
    } while (i < 15)

    // //нажимаем на вкладку "ТВ-приставки", проверяем, что открывается дополнительная страница
    // const [page1] = await Promise.all([
    //     page.waitForEvent('popup'),
    //     page.locator('header a:has-text("ТВ-приставки")').click()
    // ]);
})


