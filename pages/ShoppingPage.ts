import {Page} from '@playwright/test';

export class ShoppingPage {
    constructor(private page: Page) {}

    returnUrl(category: string) {
        return `/shop-${category}.php`;
    }

    async addProductToCart(productId: number) {
        const addToCartButton = this.page.getByTestId(`add-to-cart-${productId}`);
        await addToCartButton.click();
    }

}