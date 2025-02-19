/*
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features

  const isLocalhost = Boolean(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );

  if (
    'serviceWorker' in navigator
    && (window.location.protocol === 'https:' || isLocalhost)
  ) {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = function() {
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            // The updatefound event implies that registration.installing is set
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            const installingWorker = registration.installing;

            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                    'service worker became redundant.');

              default:
                // Ignore
              }
            };
          }
        };
      }).catch(function(e) {
        console.error('Error during service worker registration:', e);
      });
  }

  // Your custom JavaScript goes here

  const button = document.getElementById('cloneButton');
  button.addEventListener('click', cloneBacon);

  /**
   * Task 1
   * Clone bacons image.
   * @return {void} Fuction returned nothing.
   */
  function cloneBacon() {
    const picture = document.getElementById('baconImage');
    const section = document.getElementById('imageSection');

    const cloneImage = picture.cloneNode(true);
    section.appendChild(cloneImage);
  }
  /**
   * Task 2
   * Add new tab.
   * @return {void} Fuction returned nothing.
   */
  function chooseTab() {
    document.querySelectorAll('#tab-button').forEach((button) => {
      button.addEventListener('click', () => {
        const tab = button.parentElement;
        const tabWrapper = tab.parentElement.parentElement;
        const tabName = button.dataset.forTab;
        const activeTab = tabWrapper.querySelector(`.tab__content[data-tab="${tabName}"]`);

        tabWrapper.querySelectorAll('.tab__content').forEach((tab) => {
          tab.classList.remove('mdl-layout__tab-panel--active');
        });

        activeTab.classList.add('mdl-layout__tab-panel--active');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    chooseTab();
  });
})();
/**
 * Task 3
 * Validation.
 * @return {void} Fuction returned nothing.
 */
const lastName = document.getElementById('last-name');
const form = document.getElementById('form');
const postalCode = document.getElementById('postal-code');
const creditCardNumber = document.getElementById('credit-card');
const error = document.getElementById('error');
const success = document.getElementById('success');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const messages = [];

  if (lastName.value.length <= 1) {
    messages.push('Last name must contain at least 2 characters.');
  }
  if (postalCode.value.length !== 6) {
    messages.push('Postal Code must contain 6 characters.');
  }
  if (!creditCardNumber.value.includes('-')) {
    messages.push('Credit card number should have format: XXXX-XXXX-XXXX-XXXX');
  }
  if (messages.length > 0) {
    error.innerText = messages.join(', ');
  }
  if (messages.length === 0) {
    success.innerHTML = 'Your form has been filled successfully and sent!';
  }
});
