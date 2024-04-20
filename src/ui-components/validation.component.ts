import { expect, Locator, Page } from "@playwright/test";
import BaseUiComponent, { ElementAttributes } from "./base.component";

export interface Validation {
    checkValidation: (message: string) => void;
}

/**
 * Represents component with validation.
 */
export default abstract class ValidationComponent extends BaseUiComponent implements Validation {

    // component locators
    private readonly locValidation: Locator;

    /**
     * ValidationComponent constructor.
     * @param { Page } page playwright instance. 
     * @param { ElementAttributes } attributes html element attributes 
     */
    protected constructor(page: Page, attributes?: ElementAttributes ) {
        super(page, attributes);
        this.locValidation = this.locBase.locator('.error-message');
    }

    /**
     * Checks id validation message is correct.
     * @param { string } message validation message. 
     */
    async checkValidation(message: string) {
        await expect(this.locValidation).toHaveText(message);
    }
    
}