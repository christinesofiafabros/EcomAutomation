import { Page } from '@playwright/test';

export class CategoryPage {
    constructor( private page: Page) {}

    async goto() {
        await this.page.goto('/shop.php');
    }

    async selectCategory(productCategory: string) {
        const selectCategoryButton = this.page.getByTestId(`shop-now-${productCategory}`);
        await selectCategoryButton.click()
    }
    
}