import {test, expect} from '@playwright/test';
import { ShoppingPage } from '../../pages/ShoppingPage';
import { LoginPage } from '../../pages/LoginPage';
import { CategoryPage} from '../../pages/CategoryPage';
import { CartPage } from '../../pages/CartPage';
import { Product } from '../../test-data/product';

test('successful adding of product to cart', async ({page})=> {
    const loginPage = new LoginPage(page);
    const shoppingPage = new ShoppingPage(page);
    const categoryPage = new CategoryPage(page);
    const cartPage = new CartPage(page);

    const expectedItem = Product.item;
    const expectedPrice = `$${expectedItem.price}`;
    const expectedQuantity = `${expectedItem.quantity}`;
    const expectedTotal = `$${expectedItem.price * expectedItem.quantity}`;

    await loginPage.loginUser('demo@demo.com', 'demo');

    await expect(page).toHaveURL('/shop.php');

    await categoryPage.selectCategory(expectedItem.category);

    await expect(page).toHaveURL(shoppingPage.returnUrl(expectedItem.category))

    await shoppingPage.addProductToCart(expectedItem.productId);

    await cartPage.goto();

    await expect(cartPage.itemName(expectedItem.productId)).toHaveText(expectedItem.name);
    await expect(cartPage.itemPrice(expectedItem.productId)).toHaveText(expectedPrice);
    await expect(cartPage.itemQty(expectedItem.productId)).toHaveText(expectedQuantity);
    await expect(cartPage.itemTotal(expectedItem.productId)).toHaveText(expectedTotal)
})