import { test, Locator, Page } from "@playwright/test";
import TextInputComponent from "../ui-components/textfield.component";
import ButtonComponent from "../ui-components/button.component";

/**
 * Text input options.
 */
export interface ContactPageDetails {
    firstNameField: string;
    lastNameField: string;
    companyField: string;
    emailField: string;
    phoneField: string;
    aboutField: string;
}

/**
 * Contact Page.
 */
export default class ContactPage {

    // ui components
    private readonly uiFirstNameField: TextInputComponent;
    private readonly uiLastNameField: TextInputComponent;
    private readonly uiCompanyField: TextInputComponent;
    private readonly uiEmailField: TextInputComponent;
    private readonly uiPhoneField: TextInputComponent;
    private readonly uiGetStartedButton: ButtonComponent;

    // locators
    private readonly locAboutFieldArea: Locator;
    private readonly locPolicyRadioButton: Locator;

    /**
     * ContactPage constructor.
     * @param { Page } page
     */
    constructor( page: Page) {
        this.uiFirstNameField = new TextInputComponent(page, { name: 'First_name__c' });
        this.uiLastNameField = new TextInputComponent(page, { name: 'Last_Name__c' });
        this.uiCompanyField = new TextInputComponent(page, { name: 'Company' });
        this.uiEmailField = new TextInputComponent(page, { name: 'Email' });
        this.uiPhoneField = new TextInputComponent(page, { name: 'Phone' });
        this.locAboutFieldArea = page.getByPlaceholder('Tell us about your project*');
        this.uiGetStartedButton = new ButtonComponent(page, {
            locator: page.locator('[type=submit]').filter({ hasText: ' Get started '}) }
        );
        this.locPolicyRadioButton = page.locator('#policy');
    }

    /**
     * Fill Contact Form details
     * @param { Partial<ContactPageDetails> } details contact details
     */
    async edit(details: Partial<ContactPageDetails>) {
        await test.step('fill contact details', async () => {
            details.firstNameField && await this.uiFirstNameField.type(details.firstNameField);
            details.lastNameField && await this.uiLastNameField.type(details.lastNameField);
            details.companyField && await this.uiCompanyField.type(details.companyField);
            details.emailField && await this.uiEmailField.type(details.emailField);
            details.phoneField && await this.uiPhoneField.type(details.phoneField);
            details.aboutField && await this.locAboutFieldArea.fill(details.aboutField);
            await this.locPolicyRadioButton.check();
        });
    }

    /**
     * Validate Contact Form details
     * @param { Partial<ContactPageDetails> } details contact details
     */
    async validateFields(details: Partial<ContactPageDetails>) {
        await test.step('fill contact details', async () => {
            details.emailField &&
                await this.uiEmailField.checkValidation(' Please enter a valid email address.');
            details.phoneField &&
                await this.uiPhoneField.checkValidation(' Please enter a valid phone number. ');
        });
    }

    /**
     * Click on get Started button
     */
    async getStarted() {
        await test.step('click get started button', async () => {
            await this.uiGetStartedButton.click();
        });
    }

}