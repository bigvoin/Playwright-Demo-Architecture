import { test as base } from '@playwright/test';
import BasePage from '../pageobjects/base.page';
import ContactPage from '../pageobjects/contact.page';

type Pages = {
    basePage: BasePage;
    contactPage: ContactPage;
}

export type BaseFixture = {
    pages: Pages;

};

export const test = base.extend<BaseFixture>({
    pages: async ({ page }, use) => {
        const pages: Pages = {
            basePage: new BasePage(page),
            contactPage: new ContactPage(page)
        }

        await pages.basePage.openUrl('https://blankfactor.com/');
        await use(pages);

    }
});