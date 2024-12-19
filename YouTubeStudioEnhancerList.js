const path = window.location.origin;

window.addEventListener('load', function() {

  function onWindowopenButtonClick(selected) {
    selected.forEach((elm, key) => {
      const parent = elm.closest('#row-container');

      if (parent) {
        const link = parent.querySelector('.tablecell-video ytcp-video-list-cell-video #video-thumbnail #thumbnail-anchor');
        if (link) {
          console.log(`${path}${link.getAttribute('href')}`);

          if (key === 0) {
            window.open(`${path}${link.getAttribute('href')}`, `_blank_first_${key.toString()}`);
          } else {
            setTimeout(function () {
              console.log("resolved", key);
              window.open(`${path}${link.getAttribute('href')}`, `_blank_${key.toString()}`);
            }, 1500 * key);
          }
        }
      }
    });
  }

  function observeCheckbox () {
    const element = document.querySelector('ytcp-video-bulk-actions ytcp-bulk-actions #header .selection-label.ytcp-bulk-actions');

    new MutationObserver((mutationList, observer) => {

      let changes = false;

      for (const mutation of mutationList) {
        if (mutation.type === "characterData") {
          if (element) {
            changes = true;
          }
        }
      }

      if (changes) {
        const windowOpener = document.getElementById('windowOpener');
        const selected = document.querySelectorAll('ytcp-video-section-content ytcp-checkbox-lit[checked]');

        if (!windowOpener) {
          const toolbar = document.querySelector('.toolbar-wrapper .toolbar.ytcp-bulk-actions');

          const button = document.createElement('button');
          button.innerText = `Open all ${selected.length} in new Tabs`;
          button.id = 'windowOpener';
          button.onclick = function () {
            console.log('argh');
            onWindowopenButtonClick(selected);
            return false;
          }

          if (toolbar) {
            toolbar.appendChild(button);
          }
        } else {
          windowOpener.innerText = `Open all ${selected.length} in new Tabs`;
          windowOpener.onclick = function () {
            console.log('argh 2');
            onWindowopenButtonClick(selected);
            return false;
          }
        }
      }
    }).observe(
      element,
      {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true
      }
    );
  }

  function waitForAddedNode(params, callback) {
    const el = document.querySelector(params.elm);

    new MutationObserver((mutations, observer) => {
      if (el) {
        observer.disconnect();
        callback();
      }
    }).observe(el, {
      subtree: true,
      childList: true,
    });
  }

  waitForAddedNode({
    elm: 'ytcp-video-bulk-actions ytcp-bulk-actions #header',
    recursive: true,
  }, el => {
    observeCheckbox();
  });
});
