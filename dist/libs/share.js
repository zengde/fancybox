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

//// ==========================================================================
//
// Share
// Displays simple form for sharing current url
//
// ==========================================================================
(function (document) {
  "use strict";

  FancyDefaults.btnTpl.share = '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}">' + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg>' + "</button>";
  FancyDefaults.share = {
    url: function url(instance, item) {
      return (!instance.currentHash && !(item.type === "inline" || item.type === "html") ? item.origSrc || item.src : false) || window.location;
    },
    tpl: "\n        <div class=\"fancybox-share\">\n            <h1>{{SHARE}}</h1>\n            <p>\n                <a class=\"fancybox-share__button fancybox-share__button--fb\" href=\"https://www.facebook.com/sharer/sharer.php?u={{url}}\">\n                    <svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196\" /></svg>\n                    <span>Facebook</span>\n                </a>\n                <a class=\"fancybox-share__button fancybox-share__button--tw\" href=\"https://twitter.com/intent/tweet?url={{url}}&text={{descr}}\">\n                    <svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z\" /></svg>\n                    <span>Twitter</span>\n                </a>\n                <a class=\"fancybox-share__button fancybox-share__button--pt\" href=\"https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}\">\n                    <svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z\" fill=\"#fff\"/></svg>\n                    <span>Pinterest</span>\n                </a>\n            </p>\n            <p><input class=\"fancybox-share__input\" type=\"text\" value=\"{{url_raw}}\" onclick=\"select()\" /></p>\n        </div>"
  };

  function escapeHtml(string) {
    var entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#x2F;",
      "`": "&#x60;",
      "=": "&#x3D;"
    };
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
      return entityMap[s];
    });
  }

  FancyUtils.on(document, "click", "[data-fancybox-share]", function () {
    var instance = FancyBox.getInstance(),
        current = instance.current || null,
        url,
        tpl;

    if (!current) {
      return;
    }

    if (FancyUtils.isFunction(current.opts.share.url)) {
      url = current.opts.share.url.apply(current, [instance, current]);
    }

    tpl = current.opts.share.tpl.replace(/\{\{media\}\}/g, current.type === "image" ? encodeURIComponent(current.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(url)).replace(/\{\{url_raw\}\}/g, escapeHtml(url)).replace(/\{\{descr\}\}/g, instance.$caption ? encodeURIComponent(instance.$caption.text()) : "");
    FancyBox.open([{
      src: FancyUtils.translate(instance, tpl),
      opts: {
        type: "html",
        toolbar: false,
        touch: false,
        animationEffect: false,
        mobile: {
          autoFocus: false
        }
      }
    }], {
      afterLoad: function afterLoad(shareInstance, shareCurrent) {
        // Close self if parent instance is closing
        FancyUtils.on(instance.$refs.container, "beforeClose.fb", null, function () {
          shareInstance.close(null, 0);
        }, true); // Opening links in a popup window

        shareCurrent.$content.querySelectorAll(".fancybox-share__button").forEach(function (value) {
          FancyUtils.on(value, 'click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            window.open(this.href, "Share", "width=550, height=450");
            return false;
          });
        });
      }
    });
  });
})(document);