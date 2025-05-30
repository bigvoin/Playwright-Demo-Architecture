import { dpContactFormData } from "../src/dataproviders/demodata.dataprovider";
import { test } from "../src/fixtures/base.fixture";

for(const data of dpContactFormData) {
    test(data.testDetails.description, async ({ pages }) => {
        await pages.basePage.clickBecomePartner();
        await pages.contactPage.edit(data.contactDetails);
        data.validation && await pages.contactPage.validateFields(data.contactDetails);
        !data.validation && await pages.basePage.checkUrl('thank-you/');
    });
}