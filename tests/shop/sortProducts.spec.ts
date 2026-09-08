import { test, expect, Page} from '@playwright/test';
import { ShoppingPage } from '../../pages/ShoppingPage';
import { LoginPage } from '../../pages/LoginPage';
import { CategoryPage} from '../../pages/CategoryPage';
import { Product } from '../../test-data/product';

let shoppingPage: ShoppingPage;
let loginPage: LoginPage;
let categoryPage: CategoryPage;

export async function loginAndSelectCategory(page: Page) {
    
    const shoppingPage = new ShoppingPage(page);
    const loginPage = new LoginPage(page);
    const categoryPage = new CategoryPage(page);

    await loginPage.loginUser('demo@demo.com', 'demo');
    await categoryPage.selectCategory(Product.item3.category);

    return {shoppingPage, loginPage, categoryPage};
}

test('products are sorted by price in ascending order', async ({ page }) => {
    const { shoppingPage } = await loginAndSelectCategory(page);

    await shoppingPage.sortProductsByPriceAsc();

    const productPrices = await shoppingPage.getProductsByPrice();

    const prices = productPrices.map((text) =>
        Number(text.replace('$', '').trim())
     );

    const isAscending = prices.every(
        (price, index) => index === 0 || prices[index - 1] <= price
    );

    expect(isAscending).toBe(true);
})


test('products are sorted by name in ascending order', async ({ page }) => {
    const { shoppingPage } = await loginAndSelectCategory(page);

    await shoppingPage.sortProductsByNameAsc();

    const productNames = await shoppingPage.getProductsByName();

    const isAscending = productNames.every(
        (name, index) => index === 0 || productNames[index - 1].localeCompare(name) <= 0
    );

    expect(isAscending).toBe(true);

});