import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';


test('successful login', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginCredentials('demo@demo.com', 'demo');

    await loginPage.login();

    await expect(page).toHaveURL('/shop.php');
});

test('show password functionality', async ({page}) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginCredentials('demo@demo.com', 'demo');

    await expect(loginPage.password).toHaveAttribute('type', 'password');
    
    await loginPage.showPassword();

    await expect(loginPage.password).toHaveAttribute('type', 'text');

    await loginPage.showPassword();

    await expect(loginPage.password).toHaveAttribute('type', 'password');

});