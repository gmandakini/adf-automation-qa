// spec.js

describe('ADF Demo App', function() {

    it('test', function() {
        var folderName = 'gmandakini';
        var adfProviderOption = 'ECM';
        var applyButton = element(by.id('host-button'));
        var newFolderDialog = element(by.css('adf-folder-dialog '));
        var newFolderDialogTitle = element(by.css('adf-folder-dialog .mat-dialog-title'));
        var newFolderName = element(by.id('adf-folder-name-input'));
        var createNewFolderIcon = element(by.cssContainingText('button.mat-icon-button mat-icon', 'create_new_folder'));
        var createNewFolderButton = element(by.id('adf-folder-create-button'));
        var cancelNewFolderButton = element(by.id('adf-folder-cancel-button'));
        var EC = protractor.ExpectedConditions;
        var userMessage = element(by.css('.cdk-global-overlay-wrapper .cdk-overlay-pane snack-bar-container simple-snack-bar span'));
        var userFolder = element(by.cssContainingText('.adf-datatable-cell-value', folderName));
        var deleteAction = element(by.cssContainingText('button.mat-menu-item .mat-icon', 'delete'));
        var contentActionsMenu = element(by.css('.mat-menu-content'));
        var contentServices = element(by.cssContainingText('.adf-sidenav-linklist .adf-sidenav-link .sidenav-menu-label', 'Content Services'));
        var adfProvider = element(by.id('adf-provider-selector'));
        var adfProviderOptions = element(by.cssContainingText('span.mat-option-text', adfProviderOption));
        var selectedAdfProvider = element(by.css('#adf-provider-selector .mat-select-value .mat-select-value-text .ng-star-inserted'));
        const SETTINGS_URL = 'http://qaexercise.envalfresco.com/settings';
        var username = element(by.id('username'));
        var password = element(by.id('password'));
        var loginButton = element(by.id('login-button'));
        var adfUserProfile = element(by.id('adf-userinfo-ecm-name-display'));
        var folderSelected = element(by.css('.adf-datatable-table-cell[filename=' + folderName + '] mat-icon.adf-datatable-selected'));
        var selectedFolderActions = element(by.css(".adf-datatable-row.is-selected .alfresco-datatable__actions-cell button"));
        var profileImage = element(by.id("user-initials-image"));

        //Navigate to Settings Url
        browser.get(SETTINGS_URL);
        expect(browser.getTitle()).toEqual('Welcome - Alfresco ADF Application');

        adfProvider.click();
        expect(adfProviderOptions.isDisplayed());
        adfProviderOptions.click();
        expect(selectedAdfProvider.getText()).toEqual(adfProviderOption);
        applyButton.click();

        //User navigates to the Login screen
        expect(browser.getTitle()).toEqual('Welcome - Alfresco ADF Application');
        username.sendKeys("guest@example.com");
        password.sendKeys("Password");
        loginButton.click();
        browser.waitForAngular();
        browser.wait(profileImage.isDisplayed());

        //User successfully logs in as a guest
        expect(adfUserProfile.getText()).toEqual("guest");

        contentServices.click();
        expect(element(by.id('site-dropdown')).isDisplayed());

        //Create a new folder successfully with name 'gmandakini'
        createNewFolderIcon.click();
        expect(newFolderDialog.isDisplayed());
        expect(newFolderDialogTitle.getText()).toEqual('New folder');

        newFolderName.sendKeys(folderName);
        createNewFolderButton.click();
        browser.wait(EC.not(EC.presenceOf(newFolderDialog)));
        browser.waitForAngular();

        //Create a new folder again with name 'gmandakini' and assert on validation error
        createNewFolderIcon.click();
        expect(newFolderDialog.isDisplayed());
        expect(newFolderDialogTitle.getText()).toEqual('New folder');

        newFolderName.sendKeys(folderName);
        createNewFolderButton.click();
        expect(userMessage.getText()).toEqual('There\'s already a folder with this name. Try a different name.');
        cancelNewFolderButton.click();
        browser.wait(EC.not(EC.presenceOf(newFolderDialog)));
        browser.waitForAngular();

        //Delete the newly created folder and assert on the delete message
        expect(userFolder.isDisplayed());
        userFolder.click();
        expect(folderSelected.getAttribute('svgicon')).toBe('selected');
        selectedFolderActions.click();
        expect(contentActionsMenu.isDisplayed());
        expect(deleteAction.isDisplayed());
        browser.actions().mouseMove(deleteAction).perform();
        deleteAction.click();
        browser.waitForAngular();
        expect(userMessage.getText()).toMatch('gmandakini deleted');

    });

});
