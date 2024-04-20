import { ContactPageDetails } from "../pageobjects/contact.page";

/**
 * Test case details.
 */
interface TestDetails {
    tcid?: number;
    description: string;
    enabled?: boolean;
}

/**
 * Base test data interface
 */
export interface TestData {
    testDetails: Partial<TestDetails>;
}

/**
 * Contact form data.
 */
export interface ContactFormDetailsData extends TestData {
    contactDetails: Partial<ContactPageDetails>;
    validation?: boolean;
}

/**
 * Data provider for contact form details
 */
export const dpContactFormData: ContactFormDetailsData[] = [
    {
        testDetails: {
            tcid: 1,
            description: 'automation test for submiting correct contact form details',
            enabled: true
        },
        contactDetails: {
            firstNameField: 'Test First Name',
            lastNameField: 'Last Name Test',
            emailField: 'testEmailmail@mail.com',
            phoneField: '099919912',
            aboutField: 'Test oasdkoasdkopasdskoadopasdkopa asopdkaspodkasop'
        }
    },
    {
        testDetails: {
            tcid: 1,
            description: 'automation test for submiting incorrect contact form email address',
            enabled: true
        },
        contactDetails: {
            firstNameField: 'Test First Name',
            lastNameField: 'Last Name Test',
            emailField: '0123012301230',
            phoneField: '099919912',
            aboutField: 'Test oasdkoasdkopasdskoadopasdkopa asopdkaspodkasop'
        },
        validation: true
    },
    {
        testDetails: {
            tcid: 1,
            description: 'automation test for submiting incorrect contact form phone number',
            enabled: true
        },
        contactDetails: {
            firstNameField: 'Test First Name',
            lastNameField: 'Last Name Test',
            emailField: 'testEmailmail@mail.com',
            phoneField: 'asddadadadsasda',
            aboutField: 'Test oasdkoasdkopasdskoadopasdkopa asopdkaspodkasop'
        },
        validation: true
    }
]