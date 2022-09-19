const { test, expect } = require('@playwright/test');

let userNameLogin = 'testdeleteme@test.test'

test.setTimeout(120000)

test('Регистрация тестового аккаунта', async ({ page }) => {

    await page.goto('https://limehd.tv/signup');

    await page.locator('[placeholder="Введите e-mail"]').fill(userNameLogin);
    await page.locator('input[type="password"]').first().fill('qqqqqq');
    await page.locator('text=Повторите пароль >> input[type="password"]').fill('qqqqqq');
    await page.locator('text=Зарегистрироваться').click();
})


test('авторизаяция, плохой сценарий', async ({ page }) => {

    await page.goto('https://limehd.tv/login');

    //в поле e-mail вводим не валидное значение и нажимаем войти
    await page.locator('[placeholder="Введите e-mail"]').fill('testdeletemelimehd.tv');
    await page.locator('text=Войти').click();
    try {
        //проверяем наличие ошибок у полей e-mail и пароль
        const badEmailLogin = await page.innerText('.login__form > .form__container > form > .form__label:nth-child(1) > .input__error');
        expect(badEmailLogin).toBe('Введите корректный e-mail');
        const badPasswordLogin = await page.innerText('.login__form > .form__container > form > .form__label:nth-child(2) > .input__error');
        expect(badPasswordLogin).toBe('Введите пароль');
    } catch (err) { console.log('bug https://limehd.atlassian.net/browse/PW-292') }
})

test('авторизаяция, неверный email или пароль', async ({ page }) => {
    await page.goto('https://limehd.tv/login');

    //вводим неправильные данные от аккаунта testdeleteme@test.test и пытаемся войти
    await page.locator('[placeholder="Введите e-mail"]').fill(userNameLogin);
    await page.locator('input[type="password"]').fill('qqqqq');
    await page.locator('text=Войти').click();

    //проверяем наличие и текст ошибки "Неверный email или пароль"
    await page.waitForSelector('text=Неверный email или пароль');
})

test('авторизация, хороший сценарий', async ({ page }) => {

    await page.goto('https://limehd.tv/login');

    //авторизация, используя корректные данные от аккаунта testdeleteme@test.test
    await page.locator('[placeholder="Введите e-mail"]').fill(userNameLogin);
    await page.locator('input[type="password"]').fill('qqqqqq');
    await page.locator('text=Войти').click();

    //переходим в профиль пользователя
    await page.locator('header >> text=t').click({ clickCount: 2 });
    await page.locator('text=Общая информация').click();

    //проверяем, что авторизация произошла в нужного нам пользователя
    const userNameLoginCheck = await page.innerText('div > .default__layout > .page-main > .profile__title-container > .profile__title');
    expect(userNameLoginCheck).toBe(userNameLogin);
})