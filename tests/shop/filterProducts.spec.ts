import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ShoppingPage } from '../../pages/ShoppingPage';
import { CategoryPage} from '../../pages/CategoryPage';
import { Product } from '../../test-data/product';
import { loginAndSelectCategory } from './sortProducts.spec';
import { Filter } from '../../test-data/sort & filter';


test('filter products by type', async ({page}) => {
    const {shoppingPage} = await loginAndSelectCategory(page);
    const filter = Filter.item;

    await shoppingPage.filterByType(filter.filterType);

    
})