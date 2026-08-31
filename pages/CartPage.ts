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

    

}