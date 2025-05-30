import test, { expect, Locator, Page } from "@playwright/test";
import ButtonComponent from "../ui-components/button.component";

/**
 * Text input options.
 */
export interface TextInputFieldOptions {
    locator: Locator;
    clear?: boolean;
    text: string;
    delay?: number;
}

/**
 * Base page class
 */
export default class BasePage {

    private readonly uiBecomeClientButton: ButtonComponent;
    private readonly basePage: Page;

    /**
     * BasePage constructor.
     * @param { Page } page
     */
    constructor( page: Page) {
        this.basePage = page;
        this.uiBecomeClientButton = new ButtonComponent(page, {
            locator: page.locator('.btn-small').filter({hasText: 'Become a client'})
        });
    }

    /**
     * Click on become partner button.
     */
    async clickBecomePartner() {
        await this.uiBecomeClientButton.click();
    }

    /**
     * Clears input by double click on it and press 'Backspace'.
     * @param { Locator } input input locator
     */
       private async clearInput(input: Locator) {
        await input.click({ clickCount: 3, delay: 50 });
        await this.sleep(500);
        await this.basePage.keyboard.press('Backspace');
    }

    /**
     * Sleeps execution for given time in ms.
     * @param { number } time time to sleep in ms
     */
    async sleep(time: number): Promise<void> {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }

    /**
     * Fills text input field.
     * @param { TextInputFieldOptions } options text input field options
     */
    async fillInput(options: TextInputFieldOptions) {
        options.clear && (await this.clearInput(options.locator));
        await this.sleep(1000);
        await options.locator.fill(options.text);
    }

    /**
     * Types text in input field.
     * @param { TextInputFieldOptions } options text input field options
     */
    async typeInput(options: TextInputFieldOptions) {
        options.clear && (await this.clearInput(options.locator));
        await this.sleep(500);
        await options.locator.type(options.text, {
            delay: options.delay || 50,
        });
    }

    /**
     * Opens given url.
     * @param { string } url url to open
     */
    async openUrl(url: string) {
        await test.step(`opens given url:${url}`, async () => {
            await this.basePage.goto(url);
        });
    }

     /**
     * Check url
     * @param { string } url url to open
     */
     async checkUrl(url: string) {
        await test.step(`checks given url:${url}`, async () => {
            const baseUrl = 'https://blankfactor.com/';
            await expect(this.basePage).toHaveURL(`${baseUrl}${url}`);
        });
    }

    /**
     * Refresh current page.
     */
    async refresh() {
        await test.step('refreshes page', async () => {
            await this.basePage.reload({ waitUntil: 'domcontentloaded' });
        });
    }

    /**
     * Clicks page "Back" button.
     */
    async back() {
        await test.step('click page "Back" button', async () => {
            await this.basePage.goBack();
        });
    }
}