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

    async sortProductsByPriceAsc() {
        await this.page.getByTestId('sort-select').selectOption('price-asc')
    }

    async sortProductsByNameAsc() {
        await this.page.getByTestId('sort-select').selectOption('name-asc')
    }

    async sortProductsByPriceDesc() {
        await this.page.getByTestId('sort-select').selectOption('price-desc')
    }

    async sortProductsByNameDesc() {
        await this.page.getByTestId('sort-select').selectOption('name-desc')
    }

    async getProductsByPrice() {
        const productPrices = this.page.getByTestId(/product-price-/);
        const priceTexts = productPrices.allTextContents();
        return priceTexts;
    }

    async sortProductsByNameAsc() {
        await this.page.getByTestId('sort-select').selectOption('name-asc')
    }

    async getProductsByName() {
        const productNames = this.page.getByTestId(/product-name-/);
        const nameTexts = productNames.allTextContents();
        return nameTexts;
    }   
}