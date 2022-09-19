const { test, expect } = require('@playwright/test')

test.setTimeout(120000)

test('Тест добавление/удаление каналов из страницы канала без авторизации', async ({ page }) => {

    await page.goto('https://limehd.tv');

    //добавляем НТВ в избранные, через страницу канала
    await page.locator('text=НТВ').click();
    await page.waitForTimeout(1000)
    await page.locator('.page-main > .stream__item > .stream__title-container > .stream__favorite-container > .stream__favorite').click()
    await page.waitForTimeout(1000)
    await page.locator('text=Все телеканалы').click();
    await page.waitForTimeout(1000)

    //добавляем ДОМАШНИЙ в избранные, через страницу канала
    await page.locator('text=ДОМАШНИЙ').click();
    await page.waitForTimeout(1000)
    await page.locator('.page-main > .stream__item > .stream__title-container > .stream__favorite-container > .stream__favorite').click()
    await page.waitForTimeout(1000)
    await page.locator('text=Все телеканалы').click();
    await page.waitForTimeout(1000)

    //проверяем, что каналы в избранном
    await page.locator('text=Избранные').click();
    await page.isVisible('text=НТВ', 'text=ДОМАШНИЙ')

    //удаляем НТВ из избранных, через страницу канала
    await page.locator('text=НТВ').click();
    await page.waitForTimeout(2000)
    await page.locator('#__layout > div > div.default__layout > div > div.stream__item > div.stream__title-container > div.stream__favorite-container > img').click()
    await page.waitForTimeout(2000)
    await page.locator('.login__button-arrow').click();
    await page.locator('text=Избранные').click();

    //удаляем ДОМАШНИЙ из избранных, через страницу канала
    await page.locator('text=Домашний').click();
    await page.waitForTimeout(2000)
    await page.locator('#__layout > div > div.default__layout > div > div.stream__item > div.stream__title-container > div.stream__favorite-container > img').click();
    await page.waitForTimeout(2000)
    await page.locator('header a:has-text("ТВ-каналы")').click();

    await page.waitForTimeout(1000)
    await page.locator('text=Избранные').click();
    await page.waitForTimeout(2000)

    //проверяем, что избранном есть надпись 'Добавьте каналы в избранное'
    const FavClear = await page.innerText('.page-main__container > .page-main > .channel__list-component > .channel__list-content > .channel__list-text', {timeout: 5000})
    expect(FavClear).toBe('Добавьте каналы в избранное')
});



test('Тест добавление/удаление каналов из страницы избранных каналов без авторизации', async ({ page }) => {

  await page.goto('https://limehd.tv');

  //добавляем НТВ в избранные, через страницу канала
  await page.locator('text=НТВ').click();
  await page.waitForSelector('.page-main > .stream__item > .stream__title-container > .stream__favorite-container > .stream__favorite')
  await page.click('.page-main > .stream__item > .stream__title-container > .stream__favorite-container > .stream__favorite')
  await page.waitForTimeout(1000)
  await page.locator('text=Все телеканалы').click();
  await page.waitForTimeout(1000)

  //добавляем ДОМАШНИЙ в избранные, через страницу канала
  await page.locator('text=ДОМАШНИЙ').click();
  await page.waitForSelector('.page-main > .stream__item > .stream__title-container > .stream__favorite-container > .stream__favorite')
  await page.click('.page-main > .stream__item > .stream__title-container > .stream__favorite-container > .stream__favorite')
  await page.waitForTimeout(1000)
  await page.locator('text=Все телеканалы').click();
  await page.waitForTimeout(1000)

  //проверяем, что каналы в избранном
  await page.locator('text=Избранные').click();
  await page.isVisible('text=НТВ', 'text=ДОМАШНИЙ')

  //удаляем НТВ и ДОМАШНИЙ из избранных, через страницу канала
  await page.waitForSelector('.channel__item-container:nth-child(2) > .channel-container > .channel__item > .channel__wrapper > .channel__title-container > .channel__title-wrapper > .channel__favorite-container > .channel__favorite')
  await page.click('.channel__item-container:nth-child(2) > .channel-container > .channel__item > .channel__wrapper > .channel__title-container > .channel__title-wrapper > .channel__favorite-container > .channel__favorite')
  
  await page.waitForSelector('.channel__wrapper > .channel__title-container > .channel__title-wrapper > .channel__favorite-container > .channel__favorite')
  await page.click('.channel__wrapper > .channel__title-container > .channel__title-wrapper > .channel__favorite-container > .channel__favorite')
  await page.waitForTimeout(2000)

  try {
  //проверяем, что избранном есть надпись 'Добавьте каналы в избранное'
  const FavClear = await page.innerText('.page-main__container > .page-main > .channel__list-component > .channel__list-content > .channel__list-text', {timeout: 5000})
  expect(FavClear).toBe('Добавьте каналы в избранное')
  } catch (err) {console.log('bug https://limehd.atlassian.net/browse/PW-300')}
});