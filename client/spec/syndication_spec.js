'use strict';

const Webhook = require('./helpers/webhook');
var login = require('../app/scripts/bower_components/superdesk/client/spec/helpers/utils').login;
    //ingestPanel = require('./helpers/pages').EditPostPage;

var webhook = new Webhook(browser.params);

var navigateToIngestPanel = function() {
    return element.all(by.repeater('blog in blogs._items track by blog._id'))
        .get(3)
        .click()
        .then(function() {
            return element(by.css('button[ng-click="openPanel(\'ingest\')"]')).isDisplayed();
        })
        .then(function() {
            return element(by.css('button[ng-click="openPanel(\'ingest\')"]')).click();
        })
            .then(function() {
                return element(by.css('.syndicated-blogs-list')).isDisplayed();
        });
};

describe('Syndication', function() {
    beforeEach(function(done) {login().then(done);});

    describe('Ingest Panel', function() {
        it('should list available syndications', function() {
            navigateToIngestPanel()
                .then(function() {
                    return element.all(by.repeater('blog in locallySyndicatedItems'))
                        .isDisplayed();
                })
                .then(function() {
                    return element.all(by.repeater('blog in locallySyndicatedItems'))
                        .count();
                })
                .then(function(count) {
                    expect(count).toEqual(1);
                });
        });

        fit('should display an incoming syndication', function() {
            navigateToIngestPanel()
                .then(function() {
                    return element.all(by.repeater('blog in locallySyndicatedItems'))
                        .isDisplayed();
                })
                .then(function() {
                    return element.all(by.repeater('blog in locallySyndicatedItems'))
                        .get(0)
                        .click();
                })
                .then(function() {
                    return element(by.css('div.panel__incoming-syndication'))
                        .isDisplayed();
                })
                .then(function() {
                    return browser.getCurrentUrl();
                })
                .then(function(currentUrl) {
                    return webhook.fire(currentUrl);
                })
                .then(function(data) {
                    console.log('data', data);
                    //browser.manage().then(function(cookie) {
                    //    console.log('cookie', cookie);
                    //});
                });
        });

        //it('should delete a syndication', function() {
        //    navigateToIngestPanel()
        //        .then(function() {
        //            return element.all(by.repeater('blog in locallySyndicatedItems'))
        //                .isDisplayed();
        //        })
        //        .then(function() {
        //            return element.all(by.repeater('blog in locallySyndicatedItems'))
        //                .get(0)
        //                .element(by.css('button[ng-click="toggleDropdown($event, blog)"]'))
        //                .click();
        //        })
        //        .then(function() {
        //            return element.all(by.repeater('blog in locallySyndicatedItems'))
        //                .get(0)
        //                .element(by.css('button[ng-click="destroy($event, blog)"]'))
        //                .isDisplayed();
        //        })
        //        .then(function() {
        //            return element.all(by.repeater('blog in locallySyndicatedItems'))
        //                .get(0)
        //                .element(by.css('button[ng-click="destroy($event, blog)"]'))
        //                .click();
        //        })
        //        //.then(function() {
        //        //    return browser.sleep(500);
        //        //})
        //        .then(function() {
        //            browser.sleep(500);
        //            return element.all(by.repeater('blog in locallySyndicatedItems'))
        //                .count();
        //        })
        //        .then(function(count) {
        //            expect(count).toEqual(0);
        //        });
        //});
    });
});
