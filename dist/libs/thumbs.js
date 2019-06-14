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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ==========================================================================
//
// Thumbs
// Displays thumbnails in a grid
//
// ==========================================================================
(function (document) {
  "use strict";

  var CLASS = "fancybox-thumbs",
      CLASS_ACTIVE = CLASS + "-active"; // Make sure there are default values

  FancyDefaults.btnTpl.thumbs = '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}">' + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg>' + "</button>";
  FancyDefaults.thumbs = {
    autoStart: false,
    // Display thumbnails on opening
    hideOnClose: true,
    // Hide thumbnail grid when closing animation starts
    parentEl: ".fancybox-container",
    // Container is injected into this element
    axis: "y" // Vertical (y) or horizontal (x) scrolling

  };

  var FancyThumbs =
  /*#__PURE__*/
  function () {
    function FancyThumbs(instance) {
      var _this = this;

      _classCallCheck(this, FancyThumbs);

      _defineProperty(this, "visible", false);

      _defineProperty(this, "isActive", false);

      _defineProperty(this, "isFirstRun", true);

      this.instance = instance;
      this.opts = instance.opts.thumbs;
      instance.Thumbs = this;
      FancyUtils.on(instance.$refs.toolbar, "click", "[data-fancybox-thumbs]", function () {
        _this.toggle();
      });
    }

    _createClass(FancyThumbs, [{
      key: "update",
      value: function update() {
        var instance = this.instance;
        var active = this.isActive;

        if (this.isFirstRun) {
          this.isFirstRun = false;
          var group = this.instance.group;
          var enabled = 0;
          var html = '';
          group.forEach(function (item, index) {
            var str = '';

            if (item.opts.thumb) {
              enabled++;
              str = "style=\"background-image:url(".concat(item.opts.thumb, ")\"");
            } else {
              str = 'class="fancybox-thumbs-missing"';
            }

            html += "<a href=\"javascript:;\" tabindex=\"0\" data-index=\"".concat(index, "\" ").concat(str, "></a>");
          });

          if (enabled) {
            this.isActive = active = true;
            this.$grid = document.createElement('div');
            this.$grid.className = "".concat(CLASS, " ").concat(CLASS, "-").concat(this.opts.axis);
            instance.$refs.container.appendChild(this.$grid);
            FancyUtils.on(this.$grid, "click", "a", function (e) {
              var index = parseInt(e.srcElement.dataset.index);
              instance.jumpTo(index);
            });
            this.$list = document.createElement('div');
            this.$list.className = CLASS + '__list';
            this.$list.innerHTML = html;
            this.$grid.appendChild(this.$list);
          }
        }

        var button = instance.$refs.toolbar.querySelector("[data-fancybox-thumbs]");

        if (!active) {
          button.style.display = "none";
          return;
        }

        instance.$refs.container.classList.toggle("fancybox-show-thumbs", this.visible); //instance.trigger("onThumbs" + (active ? "Show" : "Hide"));

        this.focus(0);
      }
    }, {
      key: "focus",
      value: function focus(duration) {
        var _this2 = this;

        this.$list.querySelectorAll('a').forEach(function (value) {
          value.classList.toggle(CLASS_ACTIVE, value.dataset.index == _this2.instance.currIndex);
        });
      }
    }, {
      key: "hide",
      value: function hide() {
        this.isVisible = false;
      }
    }, {
      key: "show",
      value: function show() {
        this.isVisible = true;
      }
    }, {
      key: "toggle",
      value: function toggle() {
        this.isVisible = !this.visible;
      }
      /**
       * @param {boolean} val
       */

    }, {
      key: "isVisible",
      set: function set(val) {
        // if (this.visible == val) return; uncomment this,thumb active state will not work
        this.visible = val;
        this.update();
      }
    }]);

    return FancyThumbs;
  }();

  ;
  FancyUtils.on(document, "onInit.fb", function (e, instance) {
    if (instance && !instance.Thumbs) {
      new FancyThumbs(instance);
    }
  });
  FancyUtils.on(document, "beforeLoad.fb", function (e, instance) {
    var Thumbs = instance && instance.Thumbs;

    if (Thumbs.opts.autoStart === true) {
      Thumbs.show();
    }
  });
  FancyUtils.on(document, "beforeShow.fb", function (e, instance, item, firstRun) {
    var Thumbs = instance && instance.Thumbs;

    if (Thumbs && Thumbs.visible) {
      Thumbs.focus(firstRun ? 0 : 250);
    }
  });
  FancyUtils.on(document, "afterKeydown.fb", function (e, instance, current, keypress, keycode) {
    var Thumbs = instance && instance.Thumbs; // "G"

    if (Thumbs && Thumbs.isActive && keycode === 71) {
      keypress.preventDefault();
      Thumbs.toggle();
    }
  });
  FancyUtils.on(document, "beforeClose.fb", function (e, instance) {
    var Thumbs = instance && instance.Thumbs;

    if (Thumbs && Thumbs.visible && Thumbs.opts.hideOnClose !== false) {
      Thumbs.$grid.hide();
    }
  });
})(document);