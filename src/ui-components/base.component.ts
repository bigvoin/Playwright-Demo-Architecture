import { Locator, Page } from "@playwright/test";

/**
 * Validation component interface.
 */
export interface ValidationComponent {
    checkValidation: (message: string) => void;
}

/**
 * Html element attributes.
 */
export interface ElementAttributes {
    id?: string;
    name?: string;
    class?: string;
    e2e?: string;
    label?: string | RegExp;
    text?: string;
    placeholder?: string | RegExp;
    form?: string
    selector?: string;
    nth?: number;
    locator?: Locator;
}

/**
 * Base abstract class for ui component
 */
export default abstract class BaseUiComponent {

    protected locBase: Locator;

    /**
     * BaseUiComponent constructor.
     * @param { Page } page playwright instance
     * @param { ElementAttributes } attributes html element attributes
     */
    protected constructor(protected readonly page: Page, protected readonly attributes?: ElementAttributes) {
        if(attributes?.id) this.locBase = this.page.locator(`#${attributes.id}`);
        if(attributes?.name) this.locBase = this.page.locator(`[name=${attributes.name}]`);
        if(attributes?.class) this.locBase = this.page.locator(`.${attributes.class}`);
        if(attributes?.e2e) this.locBase = this.page.getByTestId(attributes.e2e);
        if(attributes?.placeholder) this.locBase = this.page.getByPlaceholder(attributes.placeholder);
        if(attributes?.selector) this.locBase = this.page.locator(attributes.selector);
        if(attributes?.locator) this.locBase = attributes.locator;
        if(typeof attributes?.nth !== 'undefined') this.locBase = this.locBase.nth(attributes.nth);
    }

    /**
     * Gets component base locator.
     * @returns { Locator } ui component base locator
     */
    getLocator(): Locator | undefined {
        return this.locBase;
    }

    /**
     * Sleeps execution for given time in ms.
     * @param { number } timeInMs time in ms
     */
    async sleep(timeInMs: number) {
        await this.page.waitForTimeout(timeInMs);
    }

    /**
     * Checks if given element attribute contains value.
     * @param { string } attributeName attribute name
     * @param { string } attributeValue attribute value
     * @returns { boolean }
     */
    async checkAttribute(attributeName: string, attributeValue: string): Promise<boolean> {
        return (await this.locBase.getAttribute(attributeName))?.includes(attributeValue) || false;
    }

}