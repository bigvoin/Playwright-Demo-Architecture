import test, { expect, Page } from "@playwright/test";
import BaseUiComponent, { ElementAttributes } from "./base.component";

interface ButtonElementAttributes extends ElementAttributes {
    form?: string;
}

/**
 * Button component.
 */
export default class ButtonComponent extends BaseUiComponent {

    /**
     * ButtonComponent constructor.
     * @param { Page } page playwright instance 
     * @param { ElementAttributes } attributes element attributes 
     */
    constructor(page: Page, attributes: ButtonElementAttributes) {
        super(page, attributes);
        if(typeof this.locBase === "undefined") {
            this.locBase = this.page.getByRole('button');   
        }
        if(attributes.form) this.locBase = this.page.locator(`[form=${attributes.form}]`);
        if(attributes.text && typeof this.locBase !== 'undefined') {
            this.locBase = this.locBase.filter({ hasText: attributes.text });
        }
    }

    /**
     * Clicks button.
     */
    async click() {
        await this.locBase.click();
    }

    /**
     * First checks if button is visible and then clicks it.
     */
    async clickIfVisible() {
        await test.step('checks if button is visible and then clicks it', async () => {
            await this.locBase.isVisible() && await this.locBase.click();
        })
    }

    async getText(): Promise<string|null> {
        return this.locBase.textContent();
    }

    /**
     * Checks button visibility.
     * @param { boolean } isVisible button visibility.
     */
    async checkVisibility(isVisible: boolean){
        await test.step('checks button visibility', async () => {
            await expect(this.locBase).toBeVisible({ visible: isVisible });
        });
    }

}