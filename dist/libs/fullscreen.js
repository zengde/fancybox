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
// FullScreen
// Adds fullscreen functionality
// https://github.com/nguyenj/fullscreen-polyfill/
// ==========================================================================
(function (document, $) {
  "use strict";

  FancyDefaults.btnTpl.fullScreen = '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}">' + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>' + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg>' + "</button>";
  FancyDefaults.fullScreen = {
    autoStart: false
  };
  var FullScreen = {
    request: function request(elem) {
      elem = elem || document.documentElement;
      elem['requestFullscreen'](elem.ALLOW_KEYBOARD_INPUT);
    },
    exit: function exit() {
      document[fn.exitFullscreen]();
    },
    toggle: function toggle(elem) {
      elem = elem || document.documentElement;

      if (this.isFullscreen()) {
        this.exit();
      } else {
        this.request(elem);
      }
    },
    isFullscreen: function isFullscreen() {
      return Boolean(document['fullscreenElement']);
    },
    enabled: function enabled() {
      return Boolean(document['fullscreenEnabled']);
    }
  };
  FancyUtils.on(document, 'fullscreenchange', function () {
    var isFullscreen = FullScreen.isFullscreen(),
        instance = FancyBox.getInstance();

    if (instance) {
      // If image is zooming, then force to stop and reposition properly
      if (instance.current && instance.current.type === "image" && instance.isAnimating) {
        instance.isAnimating = false;
        instance.update(true, true, 0);

        if (!instance.isComplete) {
          instance.complete();
        }
      }

      instance.trigger("onFullscreenChange", isFullscreen);
      instance.$refs.container.classList.toggle("fancybox-is-fullscreen", isFullscreen);
      var button = instance.$refs.toolbar.querySelector("[data-fancybox-fullscreen]");
      button.classList.toggle("fancybox-button--fsenter", !isFullscreen);
      button.classList.toggle("fancybox-button--fsexit", isFullscreen);
    }
  });
  FancyUtils.on(document, "onInit.fb", function (e, instance) {
    var $container;

    if (instance && instance.opts.fullScreen) {
      $container = instance.$refs.container;
      FancyUtils.on($container, "click.fb-fullscreen", "[data-fancybox-fullscreen]", function (e) {
        e.stopPropagation();
        e.preventDefault();
        FullScreen.toggle();
      }); // Expose API

      instance.FullScreen = FullScreen;
    }
  });
  FancyUtils.on(document, "beforeLoad.fb", function (e, instance) {
    if (instance.opts.fullScreen && instance.opts.fullScreen.autoStart === true) {
      FullScreen.request();
    }
  });
  FancyUtils.on(document, "afterKeydown.fb", function (e, instance, current, keypress, keycode) {
    // "F"
    if (instance && instance.FullScreen && keycode === 70) {
      keypress.preventDefault();
      instance.FullScreen.toggle();
    }
  });
  FancyUtils.on(document, "beforeClose.fb", function (e, instance) {
    if (instance && instance.FullScreen && instance.$refs.container.classList.contains("fancybox-is-fullscreen")) {
      FullScreen.exit();
    }
  });
})(document);