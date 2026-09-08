import { Page }  from '@playwright/test';

export class CartPage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('/cart.php');
    }

    itemName(productId: number) {
        return this.page.getByTestId(`cart-item-name-${productId}`);
    }

    itemPrice(productId: number) {
        return this.page.getByTestId(`cart-item-price-${productId}`);
    }

    itemQty(productId: number) {
        return this.page.getByTestId(`cart-qty-${productId}`);
    }

    itemTotal(productId: number) {
        return this.page.getByTestId(`cart-item-total-${productId}`);
    }

    cartTotal() {
        return this.page.getByTestId(`cart-total`)
    }

    emptyCartMessage() {
        return this.page.getByTestId(`cart-empty-message`);
    }

    async increaseItemQuantity(productId1: number) {
        await this.page.getByTestId(`cart-qty-${productId1}`).press('ArrowUp');
    }

    async removeItemFromCart(productId: number) {
        await this.page.getByTestId(`cart-remove-${productId}`).click();
    }
}