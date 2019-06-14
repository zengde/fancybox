// ==================================================
// fancyBox v3.5.7
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://github.com/zengde/fancybox.js/
// Copyright 2019 fancyApps
//
// ==================================================
"use strict";

// ==========================================================================
//
// Hash
// Enables linking to each modal
//
// ==========================================================================
(function (window, document) {
  "use strict";

  if (FancyDefaults.hash === false) {
    return;
  }

  function escapeSelector(sel) {
    var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;

    var fcssescape = function fcssescape(ch, asCodePoint) {
      if (asCodePoint) {
        // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
        if (ch === "\0") {
          return "\uFFFD";
        } // Control characters and (dependent upon position) numbers get escaped as code points


        return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
      } // Other potentially-special ASCII characters get backslash-escaped


      return "\\" + ch;
    };

    return (sel + "").replace(rcssescape, fcssescape);
  }

  ; // Get info about gallery name and current index from url

  function parseUrl() {
    var hash = window.location.hash.substr(1),
        rez = hash.split("-"),
        index = rez.length > 1 && /^\+?\d+$/.test(rez[rez.length - 1]) ? parseInt(rez.pop(-1), 10) || 1 : 1,
        gallery = rez.join("-");
    return {
      hash: hash,

      /* Index is starting from 1 */
      index: index < 1 ? 1 : index,
      gallery: gallery
    };
  } // Trigger click evnt on links to open new fancyBox instance


  function triggerFromUrl(url) {
    if (url.gallery !== "") {
      // If we can find element matching 'data-fancybox' atribute,
      // then triggering click event should start fancyBox
      var index = url.index;
      var obj = document.querySelector("[data-fancybox='" + escapeSelector(url.gallery) + "'] :nth-child(" + index + ")");

      if (obj) {
        obj.focus();
        FancyUtils.trigger(obj, "click.fb-start", index);
      }
    }
  } // Get gallery name from current instance


  function getGalleryID(instance) {
    var opts, ret;

    if (!instance) {
      return false;
    }

    opts = instance.opts;
    ret = opts.hash;
    return ret === "" ? false : ret;
  } // Update hash when opening/closing fancyBox


  FancyUtils.on(document, "onInit.fb", function (e, instance) {
    var url, gallery;

    if (instance.opts.hash === false) {
      return;
    }

    url = parseUrl();
    gallery = getGalleryID(instance); // Make sure gallery start index matches index from hash

    if (gallery && url.gallery && gallery == url.gallery) {
      instance.currPos = url.index - 1;
    }
  });
  FancyUtils.on(document, "beforeShow.fb", function (e, instance, current, firstRun) {
    var gallery;

    if (instance.opts.hash === false) {
      return;
    } // Check if need to update window hash


    gallery = getGalleryID(instance);

    if (!gallery) {
      return;
    } // Variable containing last hash value set by fancyBox
    // It will be used to determine if fancyBox needs to close after hash change is detected


    instance.currentHash = gallery + (instance.group.length > 1 ? "-" + (current.index + 1) : ""); // If current hash is the same (this instance most likely is opened by hashchange), then do nothing

    if (window.location.hash === "#" + instance.currentHash) {
      return;
    }

    if (firstRun && !instance.origHash) {
      instance.origHash = window.location.hash;
    }

    if (instance.hashTimer) {
      clearTimeout(instance.hashTimer);
    } // Update hash


    instance.hashTimer = setTimeout(function () {
      if ("replaceState" in window.history) {
        window.history[firstRun ? "pushState" : "replaceState"]({}, document.title, window.location.pathname + window.location.search + "#" + instance.currentHash);

        if (firstRun) {
          instance.hasCreatedHistory = true;
        }
      } else {
        window.location.hash = instance.currentHash;
      }

      instance.hashTimer = null;
    }, 300);
  });
  FancyUtils.on(document, "beforeClose.fb", function (e, instance, current) {
    if (instance.opts.hash === false) {
      return;
    }

    clearTimeout(instance.hashTimer); // Goto previous history entry

    if (instance.currentHash && instance.hasCreatedHistory) {
      window.history.back();
    } else if (instance.currentHash) {
      if ("replaceState" in window.history) {
        window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (instance.origHash || ""));
      } else {
        window.location.hash = instance.origHash;
      }
    }

    instance.currentHash = null;
  }); // Check if need to start/close after url has changed

  FancyUtils.on(window, "hashchange.fb", function () {
    var url = parseUrl(),
        fb = null; // Find last fancyBox instance that has "hash"

    Object.values(FancyData).reverse().some(function (value) {
      if (value.currentHash) {
        fb = value;
        return true;
      }
    });

    if (fb) {
      // Now, compare hash values
      if (fb.currentHash !== url.gallery + "-" + url.index && !(url.index === 1 && fb.currentHash == url.gallery)) {
        fb.currentHash = null;
        fb.close();
      }
    } else if (url.gallery !== "") {
      triggerFromUrl(url);
    }
  }); // Check current hash and trigger click event on matching element to start fancyBox, if needed

  setTimeout(function () {
    if (!FancyBox.getInstance()) {
      triggerFromUrl(parseUrl());
    }
  }, 50);
})(window, document);