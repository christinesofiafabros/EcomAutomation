import {test, expect, Page} from '@playwright/test';
import { ShoppingPage } from '../../pages/ShoppingPage';
import { LoginPage } from '../../pages/LoginPage';
import { CategoryPage} from '../../pages/CategoryPage';
import { CartPage } from '../../pages/CartPage';
import { Product } from '../../test-data/product';

async function addProductsToCart(page: Page) {
    const loginPage = new LoginPage(page);
    const shoppingPage = new ShoppingPage(page);
    const categoryPage = new CategoryPage(page);
    const cartPage = new CartPage(page);
    const expectedItem1 = Product.item;
    const expectedItem2 = Product.item2;

    await loginPage.loginUser('demo@demo.com', 'demo');
    // await expect(page).toHaveURL('/shop.php');
    await categoryPage.selectCategory(expectedItem1.category);
    // await expect(page).toHaveURL(shoppingPage.returnUrl(expectedItem.category))
    await shoppingPage.addProductToCart(expectedItem1.productId);
    await shoppingPage.addProductToCart(expectedItem2.productId);

    await cartPage.goto();

    return {cartPage, expectedItem1, expectedItem2};
}

test('successful adding of product to cart', async ({page})=> {
    const {cartPage, expectedItem1} = await addProductsToCart(page);

    const expectedPrice = `$${expectedItem1.price}`;
    const expectedQty = expectedItem1.quantity;
    const expectedTotal = `$${expectedItem1.price * expectedItem1.quantity}`;

    await expect(cartPage.itemName(expectedItem1.productId)).toHaveText(expectedItem1.name);
    await expect(cartPage.itemPrice(expectedItem1.productId)).toHaveText(expectedPrice.toString());
    await expect(cartPage.itemQty(expectedItem1.productId)).toHaveValue(expectedQty.toString());
    await expect(cartPage.itemTotal(expectedItem1.productId)).toHaveText(expectedTotal.toString());
})

test('accurate subtotal & cart total after updating quantity of product in cart', async ({page}) => {

    const {cartPage, expectedItem1, expectedItem2} = await addProductsToCart(page);
    const expectedFirstItemTotal = expectedItem1.price * (expectedItem1.quantity + 1);
    const expectedSecondItemTotal = expectedItem2.price * (expectedItem2.quantity + 1);
    const expectedCartTotal = expectedFirstItemTotal + expectedSecondItemTotal;
    
    await cartPage.increaseItemQuantity(expectedItem1.productId);
    await cartPage.increaseItemQuantity(expectedItem2.productId);
    await expect(cartPage.itemTotal(expectedItem1.productId)).toHaveText(`$${expectedFirstItemTotal}`);
    await expect(cartPage.itemTotal(expectedItem2.productId)).toHaveText(`$${expectedSecondItemTotal}`);
    await expect(cartPage.cartTotal()).toHaveText(`Total: $${expectedCartTotal}`);

})

test('successful removal of product from cart and accurate cart total', async ({page}) => {
    const {cartPage, expectedItem1, expectedItem2} = await addProductsToCart(page);
    const expectedCartTotal = expectedItem2.price * expectedItem2.quantity;

    await cartPage.removeItemFromCart(expectedItem1.productId);
    await expect(cartPage.itemName(expectedItem1.productId)).not.toBeVisible();
    await expect(cartPage.cartTotal()).toHaveText(`Total: $${expectedCartTotal}`);
    await cartPage.removeItemFromCart(expectedItem2.productId);
    await expect(cartPage.itemName(expectedItem2.productId)).not.toBeVisible();
    await expect(cartPage.emptyCartMessage()).toBeVisible();

})