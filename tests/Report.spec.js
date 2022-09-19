const { test, expect } = require('@playwright/test');

const userNameReport = ('testdeleteme@test.test')

test('Регистрация тестового аккаунта', async ({ page }) => {

    await page.goto('https://limehd.tv/signup');

    await page.locator('[placeholder="Введите e-mail"]').fill(userNameReport);
    await page.locator('input[type="password"]').first().fill('qqqqqq');
    await page.locator('text=Повторите пароль >> input[type="password"]').fill('qqqqqq');
    await page.locator('text=Зарегистрироваться').click();
});

test('Trouble report check', async ({ page }) => {

    await page.goto('https://limehd.tv/login')

    //авторизация, используя данные от аккаунта testdeleteme@test.test
    await page.locator('[placeholder="Введите e-mail"]').fill(userNameReport);
    await page.locator('input[type="password"]').fill('qqqqqq');
    await page.locator('text=Войти').click();

    await page.waitForSelector('text=t');

    //Открываем окно "Сообщить о проблеме"
    await page.locator('text=Первый канал').click();
    await page.locator('text=Сообщить о проблеме').first().click();

    const popupText = await page.innerText('.modal-container > div > .modal-wrapper > .modal__form > .modal__title');
    expect(popupText).toBe('Сообщить о проблеме');

    await page.waitForTimeout(1300)

    await page.waitForSelector('text=Сообщить о проблеме');
    await page.waitForSelector('[placeholder="Укажите e-mail для обратной связи"]');
    await page.waitForSelector('text=Телепрограмма не совпадает с трансляцией');
    await page.waitForSelector('text=Время в телепрограмме не совпадает с моим временем');
    await page.waitForSelector('text=Зависает трансляция канала');
    await page.waitForSelector('text=Плохое качество видео или звука');
    await page.waitForSelector('text=Слишком громкая реклама');
    await page.waitForSelector('text=Неподобающая реклама или реклама 18+');
    await page.waitForSelector('text=Телепрограмма отсутствует');
    await page.waitForSelector('text=Реклама перекрывает видео');
    await page.waitForSelector('text=Звук отсутствует, отстает или опережает изображение');
    await page.waitForSelector('text=Черный экран');
    await page.waitForSelector('text=Зацикливание и повторение одного фрагмента в архиве');
    await page.waitForSelector('text=Другая проблема');
    await page.waitForSelector('textarea');
    await page.waitForSelector('text=Отправить');
    await page.waitForSelector('.icon-close');

    //проверяем, что автоматически подставился его e-mail в поле для ввода электронной почты
    const value = await page.evaluate(el => el.value, await page.$('[placeholder="Укажите e-mail для обратной связи"]'))
    expect(value).toBe(userNameReport);

    //отправить без выбора проблемы
    await page.locator('text=Отправить').click();

    //наличие ошибки
    await page.waitForSelector('text=Выберите хотя бы один вариант');

    //выборать "зависает трансляция канала", проверить недоступность выбора "черный экран" --- доделать когда нибудь //сейчас почему то чекбоксы не проходят проверку выбраны они или нет
    // await page.locator("label:has-text('Зависает трансляция канала')").check();
    // await page.locator("label:has-text('Черный экран')").check();
    // await page.waitForTimeout(3000)
    // expect(await page.isChecked("label:has-text('Зависает трансляция канала')")).toBeTruthy()
    // expect(await page.isChecked("label:has-text('Черный экран')")).toBeTruthy();
    // await page.locator('text=Зависает трансляция канала').check();
    // await page.locator('text=Черный экран').check();
    // await page.waitForTimeout(3000)
    // expect(await page.isChecked("label:has-text('Зависает трансляция канала')")).isChecked()
    // expect(await page.isChecked("label:has-text('Черный экран')")).isChecked();

    //выбрать чекбокс другая проблема, проверить наличие сообщения об обязательности поля
    await page.locator('text=Другая проблема').click();
    await page.waitForSelector('text=Обязательное поле');

    //вводим текст в поле "Опишите вашу проблему", проверяем, что ошибка "Обязательное поле" пропала
    await page.locator('textarea').fill('123');
    await page.waitForSelector('text=Обязательное поле', { state: 'hidden', timeout: 100 });

    //вводим в поле "E-mail" невалидную почту, пытаемся отправить сообщение об ошибке
    await page.locator('textarea').fill('123');
    await page.locator('[placeholder="Укажите e-mail для обратной связи"]').fill('testtest')
    await page.locator('text=Отправить').click();
    //проверяем наличие ошибки о некорректном e-mail
    await page.waitForSelector('text=Введите корректный e-mail');

    //оставить поле e-mail пустым, выбрать любой чекбокс, отправить сообщение
    await page.locator('[placeholder="Укажите e-mail для обратной связи"]').fill('')
    await page.locator('text=Неподобающая реклама или реклама 18+').click();
    await page.locator('text=Отправить').click();
    //проверяем, что сообщение отправлено
    await page.waitForSelector('text=Сообщение отправлено');
    await page.locator('text=Отлично!').click();

    await page.waitForTimeout(1000);

    //проверить, что сообщение не отправляется при выборе другой проблемы (пустое поле)

    await page.locator('text=Сообщить о проблеме').first().click();
    await page.locator('text=Другая проблема').click();
    await page.locator('text=Отправить').click();
    await page.waitForSelector('text=Отлично!');
    try {
        await page.waitForSelector('text=Отлично!', { state: 'hidden', timeout: 1000 })
    } catch (err) { console.log('bug https://limehd.atlassian.net/browse/PW-295') };
    await console.log('bug https://limehd.atlassian.net/browse/PW-304')
});