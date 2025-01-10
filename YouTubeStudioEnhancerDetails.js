window.addEventListener('load', function() {
  function onclickButton() {
    document.querySelector('main').scrollTo(0, document.querySelector('ytcp-video-details-section').scrollHeight);

    const toggleButton = document.querySelector('ytcp-button#toggle-button');

    if (toggleButton) {
      toggleButton.click();

      waitForAddedNode('ytcp-video-metadata-editor-advanced').then(elm => {
        console.log('metadata editor', elm);
        if (elm) {
          const language = document.querySelector('ytcp-form-language-input');

          if (language) {
            language.click();

            waitForAddedNode('ytcp-text-menu').then(elm => {
              const german = document.querySelector('tp-yt-paper-item#text-item-39');

              if (german) {
                german.click();
              }
            });
          }

          const alteredData = document.querySelector('ytkp-altered-content-select .altered-content-options .altered-content-option-row:nth-child(2) tp-yt-paper-radio-button');
          if (alteredData) {
            alteredData.click();
          } else {
            alert('altered Data radio not found');
          }


          const autoLocation = document.querySelector('ytcp-video-metadata-editor-advanced .ytcp-video-metadata-editor-advanced:nth-child(8) ytcp-checkbox-lit');
          if (autoLocation) {
            autoLocation.click();
          } else {
            alert('location checkbox not found');
          }

          const autoConcept = document.querySelector('ytcp-video-metadata-editor-advanced .ytcp-video-metadata-editor-advanced:nth-child(11) ytcp-form-checkbox');
          if (autoConcept) {
            autoConcept.click();
          } else {
            alert('auto concept checkbox not found');
          }

          const catContainer = document.querySelector('ytcp-video-metadata-editor-advanced .ytcp-video-metadata-editor-advanced#category-container');
          if (catContainer) {
            catContainer.scrollIntoView();
          }
        }
      });
    }

  }

  function callbackButton () {
    waitForAddedNode('ytcp-button#toggle-button').then(elm => {
      onclickButton();
    });
  }

  function waitForAddedNode(selector) {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      } else {
        console.log('element not found:', selector)
      }

      const observer = new MutationObserver(mutations => {
        if (document.querySelector(selector)) {
          observer.disconnect();
          resolve(document.querySelector(selector));
        }
      });

      // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

  waitForAddedNode('#entity-page').then(elm => {
    callbackButton();
  });
});
