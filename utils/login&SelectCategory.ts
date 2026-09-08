import { test, expect, Page} from '@playwright/test';
import { ShoppingPage } from '../pages/ShoppingPage';
import { LoginPage } from '../pages/LoginPage';
import { CategoryPage} from '../pages/CategoryPage';
import { Product } from '../test-data/product';
import { Login } from '../test-data/credentials';


export async function loginAndSelectCategory(page: Page) {
    
    const shoppingPage = new ShoppingPage(page);
    const loginPage = new LoginPage(page);
    const categoryPage = new CategoryPage(page);

    const user = Login.user;
    const item = Product.item3;

    await loginPage.loginUser(user.email, user.password);
    await categoryPage.selectCategory(item.category);

    return {shoppingPage, loginPage, categoryPage};
}