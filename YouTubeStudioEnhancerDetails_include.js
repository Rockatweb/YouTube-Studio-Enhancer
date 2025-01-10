// ==UserScript==
// @name         YouTube Studio Enhancer Details
// @namespace    youtube
// @version      0.01
// @description  A tooling to make YouTube Studio much better
// @author       You
// @include      https://studio.youtube.com/video/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @require      https://raw.githubusercontent.com/Rockatweb/YouTube-Studio-Enhancer/refs/heads/main/YouTubeStudioEnhancerDetails.js
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @grant        GM_addStyle
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

      if (!document.documentElement) {
        console.error('Element not found:', document.documentElement);
        return false;
      }
      observer.observe(document.documentElement, { childList: true, subtree: true });
    }
  }

  GM_xmlhttpRequest({
    method: 'GET',
    url: 'https://raw.githubusercontent.com/Rockatweb/YouTube-Studio-Enhancer/refs/heads/main/YouTubeStudioEnhancerDetails.js',
    onload: (ev) => {
      addScriptToHead(ev.responseText);
    },
  });

})();
