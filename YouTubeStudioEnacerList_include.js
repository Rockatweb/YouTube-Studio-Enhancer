// ==UserScript==
// @name         YouTube Studio Enhancer List
// @namespace    youtube
// @version      0.01
// @description  A tooling to make YouTube Studio much better
// @author       You
// @match        https://studio.youtube.com/channel/UCCP6P-4slm9zxgtT6NoJ2ag/videos/upload*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @require      https://raw.githubusercontent.com/Rockatweb/YouTube-Studio-Enhancer/refs/heads/main/YouTubeStudioEnhancerList.js?token=GHSAT0AAAAAAC4FBWQ5AMM2PYNFGXPC4UZSZ3EGQZQ
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  function addScriptToHead(scriptContent) {
    const headElement = document.querySelector('head');
    if (headElement) {
      const scriptElement = document.createElement('script');
      scriptElement.innerHTML = scriptContent;
      headElement.appendChild(scriptElement);
    } else {
      const observer = new MutationObserver((mutations) => {
        if (document.head) {
          observer.disconnect();
          const scriptElement = document.createElement('script');
          scriptElement.innerHTML = scriptContent;
          document.head.appendChild(scriptElement);
        }
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
    }
  }

  GM_xmlhttpRequest({
    method: 'GET',
    url: 'https://raw.githubusercontent.com/Rockatweb/YouTube-Studio-Enhancer/refs/heads/main/YouTubeStudioEnhancerList.js?token=GHSAT0AAAAAAC4FBWQ5AMM2PYNFGXPC4UZSZ3EGQZQ',
    onload: (ev) => {
      addScriptToHead(ev.responseText);
    },
  });

})();
