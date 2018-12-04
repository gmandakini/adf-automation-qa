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
     var userMessage = element(by.css('.cdk-global-overlay-wrapper .cdk-overlay-pane snack-bar-container'));
     var searchButton = element(by.id('adf-search-button'));
     var searchInput = element(by.id('adf-control-input'));
     var userFolder = element(by.cssContainingText('.adf-datatable-cell-value', folderName));
     var contentActions = element(by.id('action_menu_right_0'))
     var deleteFolder = element(by.cssContainingText('button.mat-menu-item .mat-icon', 'delete'));
     var contentTable = element(by.css(".adf-data-table"));
     var contentFolderRows = contentTable.all(by.css(" .adf-datatable-row"));
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
     var folderSelected = element(by.css('.adf-datatable-table-cell[filename=' + folderName + '] mat-icon'));

     browser.get(SETTINGS_URL);
     expect(browser.getTitle()).toEqual('Welcome - Alfresco ADF Application');

     adfProvider.click();
     expect(adfProviderOptions.isDisplayed());
     adfProviderOptions.click();
     expect(selectedAdfProvider.getText()).toEqual(adfProviderOption);
     applyButton.click();

     expect(browser.getTitle()).toEqual('Welcome - Alfresco ADF Application');
     username.sendKeys("guest@example.com");
     password.sendKeys("Password");
     loginButton.click();

     expect(adfUserProfile.getText()).toEqual("guest");

     contentServices.click();
     expect(element(by.id('site-dropdown')).isDisplayed());

     createNewFolderIcon.click();
     expect(newFolderDialog.isDisplayed());
     expect(newFolderDialogTitle.getText()).toEqual('New folder');

     newFolderName.sendKeys(folderName);
     createNewFolderButton.click();
     browser.wait(EC.not(EC.presenceOf(newFolderDialog)));

     createNewFolderIcon.click();
     expect(newFolderDialog.isDisplayed());
     expect(newFolderDialogTitle.getText()).toEqual('New folder');

     newFolderName.sendKeys(folderName);
     createNewFolderButton.click();
     expect(userMessage.getText()).toEqual('There\'s already a folder with this name. Try a different name.');
     cancelNewFolderButton.click();
     browser.wait(EC.not(EC.presenceOf(newFolderDialog)));
     browser.sleep(10000);
     browser.refresh();

     searchButton.click();
     expect(searchInput.isDisplayed());
     searchInput.sendKeys(folderName);
     browser.actions().sendKeys(protractor.Key.ENTER ).perform();

     browser.wait(function () {
         return contentFolderRows.count().then(function (countValue) {
             return countValue > 0;
         });
     }, 5000);
     expect(contentFolderRows.count()).toBe(1);
     browser.wait(EC.presenceOf(userFolder));
     expect(userFolder.isDisplayed());
     userFolder.click();
     expect(folderSelected.getAttribute('svgicon')).toBe('selected');
     browser.actions().mouseMove(contentActions).perform();
     contentActions.click();
     expect(contentActionsMenu.isDisplayed());
     expect(deleteFolder.isDisplayed());
     browser.actions().mouseMove(deleteFolder).perform();
     deleteFolder.click();
     expect(userMessage.getText()).toEqual('gmandakini deleted');

  });

});
