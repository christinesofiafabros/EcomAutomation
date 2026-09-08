import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ShoppingPage } from '../../pages/ShoppingPage';
import { CategoryPage} from '../../pages/CategoryPage';
import { Product } from '../../test-data/product';
import { loginAndSelectCategory } from '../../utils/login&SelectCategory';
import { Filter } from '../../test-data/sortFilter.ts';


test('filter products by types', async ({page}) => {
    const {shoppingPage} = await loginAndSelectCategory(page);
    const filter = Filter.item;
    const filter1 = Filter.item1;

    await shoppingPage.filterProductsByType(filter.filterType, filter1.filterType);
    await expect(page.getByRole('checkbox', { name: filter.filterType })).toBeChecked();
    await expect(page.getByRole('checkbox', { name: filter1.filterType })).toBeChecked();
    const productTypes = await shoppingPage.getProductsByType();
    const isFiltered = productTypes.every((productType) => productType.toLowerCase().includes(filter.filterType.toLowerCase()) || productType.toLowerCase().includes(filter1.filterType.toLowerCase()));
    expect(isFiltered).toBe(true);

})

// test('filter products by brand', async ({page}) => {

// })