import { expect, Locator, Page } from '@playwright/test';
import { ElementAttributes } from './base.component';
import ValidationComponent from './validation.component';

/**
 * Text input component.
 */
export default class TextInputComponent extends ValidationComponent {
    /**
     * TextInputComponent constructor.
     * @param { Page } page playwright instance
     * @param { ElementAttributes } attributes element attributes
     */
    constructor(page: Page, attributes: ElementAttributes) {
        super(page, attributes);
        if(attributes.label) {
            this.locBase = this.page.locator('label')
                .filter({ has: this.page.locator('span')
                    .filter({ hasText: attributes.label })});
        }
    }

    /**
     * Types text into input field.
     * @param { string } text text to type
     */
    async type(text: string) {
        text.length < 30 
            ? await this.locBase.type(text, { delay: 50 })
            : await this.locBase.fill(text);
    }

    /**
     * Fills text into input.
     * @param { string } text text to fill into input 
     */
    async fill(text: string) {
        await this.locBase.fill(text);
    }

    /**
     * Clears input and type text.
     * @param { string } text text to type
     */
    async clearAndType(text: string) {
        await this.clear();
        await this.type(text);
    }

    /**
     * Clears input field.
     */
    async clear() {
        await this.locBase.click();
        await this.sleep(500);
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Backspace');
    }

    /**
     * Gets value filled in input element.
     * @returns { string } filled value
     */
    async value(): Promise<string> {
        return (await this.locBase.getAttribute('value')) || '';
    }

    /**
     * Checks that input has given value.
     * @param { string } expected expected value
     * @param { string } errorMessage expect error message
     */
    async toHave(value: string, errorMessage: string) {
        //await expect(await this.value()).toEqual(value);
        await expect(this.locBase, { message: errorMessage }).toHaveValue(value);
    }
}