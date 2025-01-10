window.addEventListener('load', function() {
  function onclickButton() {
    document.querySelector('main').scrollTo(0, document.querySelector('ytcp-video-details-section').scrollHeight);


    console.log('toggle meee');
    const toggleButton = document.querySelector('ytcp-button#toggle-button button');

    toggleButton.click();


    setTimeout(() => {
      const alteredData = document.querySelector('ytkp-altered-content-select .altered-content-options .altered-content-option-row:nth-child(2) tp-yt-paper-radio-button');
      console.log(alteredData);
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
    }, 1000);
  }

  function callbackButton () {
    const button = document.createElement('button');
    button.innerText = 'Toggle';
    document.querySelector('ytcp-entity-page-header h1').appendChild(button);

    button.addEventListener('click', ()=>{
      onclickButton();
      return false;
    });
  }

  function waitForAddedNode(params, callback) {
    const el = document.querySelector(params.elm);

    if (!el) {
      console.error('Element not found:', el);
      return false;
    } else {
      console.log(el);
    }

    new MutationObserver((mutations, observer) => {
      if (el) {
        observer.disconnect();
        callback();
      }
    }).observe(el, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  waitForAddedNode({
    elm: '.ytcp-app[name="video.edit"]',
    recursive: true,
  }, el => {
    callbackButton();
  });
});
