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
// Wheel
// Basic mouse weheel support for gallery navigation
//
// ==========================================================================
(function (document) {
  "use strict"; // Use mousewheel to navigate gallery
  // If 'auto' - enabled for images only

  FancyDefaults.wheel = 'auto';
  var prevTime = new Date().getTime();
  FancyUtils.on(document, "onInit.fb", function (e, instance, current) {
    FancyUtils.on(instance.$refs.stage, "mousewheel DOMMouseScroll wheel MozMousePixelScroll", function (e) {
      var current = instance.current,
          currTime = new Date().getTime();

      if (instance.group.length < 2 || current.opts.wheel === false || current.opts.wheel === "auto" && current.opts.type !== "image") {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      e = e.originalEvent || e;

      if (currTime - prevTime < 250) {
        return;
      }

      prevTime = currTime;
      instance[(-e.deltaY || -e.deltaX || e.wheelDelta || -e.detail) < 0 ? "next" : "previous"]();
    });
  });
})(document);