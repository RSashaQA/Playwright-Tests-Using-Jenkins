const { test, expect } = require('@playwright/test');

test.setTimeout(120000)

test('Тест обратной связи', async ({ page }) => {
    await page.goto('https://limehd.tv/')

    await page.locator('text=Обратная связь').click();

    //проверяем, что на странице есть заголовок "Отправить запрос" и остальные элементы страницы
    const feedbackTest = await page.innerText('#__layout > .page-info > .page-main > .feedback__container > .feedback__title');
    expect(feedbackTest).toBe('Отправить запрос');
    await page.isVisible('text=Отправить запрос E-mail Введите e-mail Платформа Сайт Имя Ваше обращение Отправи')

    //нажимаем на отправить запрос не заполнив обязательные поля
    await page.locator('button:has-text("Отправить запрос")').click();

    //ошибка "Введите e-mail"
    await page.waitForSelector('.page-info > .page-main > .feedback__container > .feedback__label > .input__error');
    const errorEmail1 = await page.innerText('.page-info > .page-main > .feedback__container > .feedback__label > .input__error');
    expect(errorEmail1).toBe('Введите e-mail');

    //заполним поле e-mail не валидным e-mail
    await page.locator('[placeholder="Введите e-mail"]').fill('TEST');

    //заполним поле "Имя"
    await page.locator('[placeholder="Введите имя"]').fill('TEST');

    //проверяем наличие ошибки при вводе не валидного e-mail
    const errorEmail2 = await page.innerText('.page-info > .page-main > .feedback__container > .feedback__label > .input__error');
    expect(errorEmail2).toBe('Введите корректный e-mail');

    //Нажимаем отправить запрос, сообщение не должно быть отправлено
    await page.locator('button:has-text("Отправить запрос")').click();
    await page.isHidden('Сообщение отправлено')

    //заполним поле e-mail валидным значением
    await page.locator('[placeholder="Введите e-mail"]').fill('test@test.test');

    //Нажимаем отправить запрос, сообщение не должно быть отправлено, не заполнено второе обязательное поле "Ваше обращение"
    await page.locator('button:has-text("Отправить запрос")').click();
    await page.isHidden('Сообщение отправлено')

    //заполним поле "Ваше обращение"
    await page.locator('textarea').fill('test');

    //проверим выпадающий список на наличие всех платформ для выбора
    await page.locator('text=Платформа Сайт >> div').click();
    await page.isVisible('text=iOS')
    await page.isVisible('text=Android')
    await page.isVisible('text=Smart TV Samsung')
    await page.isVisible('text=Smart TV LG')
    await page.isVisible('text=Windows')

    //заполним все обязательные поля, отправляем запрос, проверяем, что сообщение отправилось
    await page.locator('button:has-text("Отправить запрос")').click();
    const feedbackSucces1 = await page.innerText('.feedback__container > .modal-window > .modal-container > .modal__container > .modal__message');
    expect(feedbackSucces1).toBe('Сообщение отправлено');
    const feedbackSucces2 = await page.innerText('.feedback__container > .modal-window > .modal-container > .modal__container > .modal__button');
    expect(feedbackSucces2).toBe('Отлично!');
    await page.locator('text=Отлично!').click();

    //если захочется устроить спам тикетами
    // let i = 1;
    // do {
    //     i++;
    //     await page.locator('text=Обратная связь').click();

    //     await page.type('.page-info > .page-main > .feedback__container > .feedback__label:nth-child(2) > .feedback__input', 'test@test.test')

    //     await page.type('.page-info > .page-main > .feedback__container > .feedback__label > .feedback__textarea', 'TEST');

    //     await page.waitForSelector('.page-info > .page-main > .feedback__container > .feedback__label > .platform__dropdown')
    //     await page.click('.page-info > .page-main > .feedback__container > .feedback__label > .platform__dropdown')

    //     await page.waitForSelector('.feedback__container > .feedback__label > .platforms__list > .platforms__item-container:nth-child(' + i + ') > .platforms__item')
    //     await page.click('.feedback__container > .feedback__label > .platforms__list > .platforms__item-container:nth-child(' + i + ') > .platforms__item')

    //     await page.waitForSelector('#__layout > .page-info > .page-main > .feedback__container > .feedback__button')
    //     await page.click('#__layout > .page-info > .page-main > .feedback__container > .feedback__button')

    //     const feedbackSucces3 = await page.innerText('.feedback__container > .modal-window > .modal-container > .modal__container > .modal__message');
    //     expect(feedbackSucces3).toBe('Сообщение отправлено');

    //     const feedbackSucces4 = await page.innerText('.feedback__container > .modal-window > .modal-container > .modal__container > .modal__button');
    //     expect(feedbackSucces4).toBe('Отлично!');

    //     await page.locator('text=Отлично!').click();
    // } while (i < 6)
})