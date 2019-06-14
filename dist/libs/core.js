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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var FancyUtils = {
  on: function on(el, events, selector, fn) {
    var one = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    if (selector && typeof selector != 'string') {
      fn = selector;
      selector = undefined;
    }

    events.split(' ').forEach(function (event) {
      if (selector || fn.length > 1) {
        fn = function (selector, handler) {
          return function (e) {
            var res = true; // delegator event listener

            if (selector) {
              var path = e.path;
              res = path.some(function (value, key) {
                if (!value.nodeType || value.nodeType == 9) return false;
                return value.matches(selector);
              });
            }

            if (res) {
              // multi args event listener
              var args = handler.length > 1 ? e.detail : ['fake'];
              handler.apply(void 0, [e].concat(_toConsumableArray(args)));
            }
          };
        }(selector, fn);
      }

      el.addEventListener(event.split('.')[0], fn, {
        passive: false,
        once: one
      });
    });
  },
  trigger: function trigger(el, event) {
    var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var customEvent = new CustomEvent(event.split('.')[0], {
      detail: detail,
      bubbles: true
    });
    el.dispatchEvent(customEvent);
  },
  isFunction: function isFunction(obj) {
    return typeof obj === "function" && typeof obj.nodeType !== "number";
  },
  translate: function translate(obj, str) {
    var arr = obj.opts.i18n[obj.opts.lang] || obj.opts.i18n.en;
    return str.replace(/\{\{(\w+)\}\}/g, function (match, n) {
      return arr[n] === undefined ? match : arr[n];
    });
  }
};
var FancyData = {
  uid: 0
};

var FancyBox =
/*#__PURE__*/
function () {
  function FancyBox(content, opts) {
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, FancyBox);

    _defineProperty(this, "isVisible", true);

    _defineProperty(this, "currPos", 0);

    _defineProperty(this, "$refs", {});

    _defineProperty(this, "slides", {});

    _defineProperty(this, "counter", 0);

    _defineProperty(this, "counterMap", {});

    this.group = content;
    this.opts = Object.assign({}, FancyDefaults, opts);
    this.id = this.opts.id || FancyData.uid++;
    this.currPos = index;
    this.init();
  }

  _createClass(FancyBox, [{
    key: "init",
    value: function init() {
      var _this = this;

      var root = document.querySelector(this.opts.parentEl);
      root.insertAdjacentHTML('beforeend', this.opts.baseTpl);
      var container = root.lastChild;
      container.dataset.id = this.id;
      FancyData[this.id] = this;
      this.$refs.container = container;
      container.classList.add('fancybox-is-open');
      ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function (item) {
        _this.$refs[item] = container.querySelector(".fancybox-" + item);
      });
      this.trigger("onInit");
      this.addEvents();
      this.jumpTo(this.currPos);
    }
  }, {
    key: "addEvents",
    value: function addEvents() {
      var self = this;
      FancyUtils.on(self.$refs.container, "click.fb-close", "[data-fancybox-close]", function (e) {
        e.stopPropagation();
        e.preventDefault();
        self.close();
      });
      FancyUtils.on(self.$refs.container, "touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function (e) {
        e.stopPropagation();
        e.preventDefault();
        self.previous();
      });
      FancyUtils.on(self.$refs.container, "touchstart.fb-next click.fb-next", "[data-fancybox-next]", function (e) {
        e.stopPropagation();
        e.preventDefault();
        self.next();
      });
      FancyUtils.on(self.$refs.container, "click.fb", "[data-fancybox-zoom]", function (e) {
        // Click handler for zoom button
        self[self.isScaledDown() ? "scaleToActual" : "scaleToFit"]();
      });
    }
  }, {
    key: "removeEvents",
    value: function removeEvents() {}
  }, {
    key: "trigger",
    value: function trigger(name) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      args.unshift(this);
      var rez = true;

      if (FancyUtils.isFunction(this.opts[name])) {
        rez = this.opts[name].apply(this, args);
      }

      if (rez === false) {
        return rez;
      }

      var el = name === "afterClose" ? document : this.$refs.container;
      FancyUtils.trigger(el, name + ".fb", args);
    }
  }, {
    key: "close",
    value: function close() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.$refs.container.style.display = "none";

      if (force) {
        this.destroy();
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      this.$refs.container.remove(); // should use instance=null or delete instance

      Object.keys(this.$refs).forEach(function (key) {
        _this2.$refs[key] = null;
      }); // maybe clear reference
      // https://stackoverflow.com/questions/6033821/do-i-need-to-remove-event-listeners-before-removing-elements

      FancyData[this.id] = null;
    }
  }, {
    key: "render",
    value: function render() {
      var current = this.current;
      var opts = current.opts;
      this.$refs.infobar.querySelector('[data-fancybox-index]').textContent = this.currIndex + 1;
      this.$refs.infobar.querySelector('[data-fancybox-count]').textContent = this.group.length;
      this.$refs.caption.querySelector('.fancybox-caption__body').textContent = opts.caption;
      var buttons = opts.buttons;
      var btnStr = '';
      buttons.forEach(function (btn) {
        btnStr += opts.btnTpl[btn] ? opts.btnTpl[btn] : '';
      });
      this.$refs.toolbar.innerHTML = btnStr;

      if (opts.arrows) {
        this.$refs.navigation.innerHTML = opts.btnTpl.arrowLeft + opts.btnTpl.arrowRight;
      }

      this.showControls();
      this.loadSlide(this.currIndex);

      if (this.opts.touch) {
        this.loadSlide(this.currPos - 1);
        this.loadSlide(this.currPos + 1);
      }
    }
  }, {
    key: "showControls",
    value: function showControls() {
      var _this3 = this;

      var opts = this.current.opts;
      var control = {
        "fancybox-show-toolbar": !!(opts.toolbar && opts.buttons),
        "fancybox-show-infobar": !!(opts.infobar && this.group.length > 1),
        "fancybox-show-caption": !!opts.caption,
        "fancybox-show-nav": !!(opts.arrows && this.group.length > 1),
        "fancybox-is-modal": !!opts.modal
      };
      Object.entries(control).forEach(function (value, key) {
        var _this3$$refs$containe;

        (_this3$$refs$containe = _this3.$refs.container.classList).toggle.apply(_this3$$refs$containe, _toConsumableArray(value));
      });
    }
  }, {
    key: "loadSlide",
    value: function loadSlide(index) {
      var _this4 = this;

      if (index < 0 || index >= this.group.length) return;

      if (this.trigger("beforeLoad") === false) {
        return false;
      }

      var container = this.$refs.container;
      var current = this.getItem(index);

      if (!current.opts.type) {
        this.trigger('objectNeedsType', current);
      }

      var type = current.opts.type;
      var slide = {};
      slide.$slide = this.$refs.stage.querySelector(".fancybox-slide[data-index=\"".concat(index, "\"]"));

      if (!slide.$slide) {
        slide.$slide = document.createElement('div');
        slide.$slide.className = "fancybox-slide fancybox-slide--".concat(type);
        slide.$slide.dataset.index = index;

        switch (type) {
          case 'image':
            slide.$content = document.createElement('div');
            slide.$content.className = 'fancybox-content';
            slide.$slide.appendChild(slide.$content);
            var img = document.createElement('img');
            img.className = 'fancybox-image';
            img.src = current.src;

            img.onload = function () {
              var x = (container.clientWidth - img.naturalWidth) / 2;
              var y = (container.clientHeight - img.naturalHeight) / 2;
              slide.$slide.classList.add('fancybox-slide--complete');
              var style = {
                transform: "translate(".concat(x, "px, ").concat(y, "px)"),
                width: img.naturalWidth + 'px',
                height: img.naturalHeight + 'px'
              };
              Object.assign(slide.$content.style, style);

              _this4.trigger('afterLoad', slide);
            };

            slide.$content.appendChild(img);
            break;

          case 'html':
            slide.$slide.innerHTML = current.src;
            slide.$slide.classList.add('fancybox-slide--complete');
            slide.$content = slide.$slide.firstElementChild;
            slide.$content.classList.add('fancybox-content');
            this.trigger('afterLoad', slide);
            break;

          case 'iframe':
            slide.$content = document.createElement('div');
            slide.$content.className = 'fancybox-content';
            Object.assign(slide.$content.style, current.opts.iframe.css);
            slide.$slide.appendChild(slide.$content);
            slide.$content.insertAdjacentHTML('beforeend', this.opts.iframe.tpl.replace(/\{rnd\}/g, new Date().getTime()));
            slide.$iframe = slide.$content.firstElementChild;
            Object.entries(this.opts.iframe.attr).forEach(function (args) {
              var _slide$$iframe;

              return (_slide$$iframe = slide.$iframe).setAttribute.apply(_slide$$iframe, _toConsumableArray(args));
            });
            this.trigger('afterLoad', slide);
            slide.$iframe.src = current.src;
            break;

          default:
            break;
        } // todo replace with insertAdjacentElement


        this.$refs.stage.appendChild(slide.$slide);
      }

      slide.$slide.classList.toggle('fancybox-slide--current', index == this.currIndex);
    }
  }, {
    key: "next",
    value: function next() {
      this.currIndex++;
    }
  }, {
    key: "previous",
    value: function previous() {
      this.currIndex--;
    }
  }, {
    key: "jumpTo",
    value: function jumpTo(index) {
      this.currIndex = index;
    }
  }, {
    key: "getItem",
    value: function getItem(index) {
      if (!this.slides[index]) {
        var item = this.group[index];
        item.opts = Object.assign({}, this.opts, item.opts);
        this.slides[index] = item;
        this.counterMap[index] = this.counter++;
      }

      return this.slides[index];
    }
  }, {
    key: "current",
    get: function get() {
      return this.getItem(this.currIndex);
    }
  }, {
    key: "classObject",
    get: function get() {
      var arr = ["fancybox-container"];
      if (this.isVisible) arr.push("fancybox-is-open");
      return arr.join(" ");
    }
  }, {
    key: "currIndex",
    get: function get() {
      return this.currPos;
    },
    set: function set(val) {
      this.trigger("onUpdate", val);
      if (val < 0 || val >= this.group.length) return;
      this.currPos = val;
      this.render();
    }
  }], [{
    key: "open",
    value: function open(content, opts, index) {
      new FancyBox(content, opts, index);
    }
  }, {
    key: "getInstance",
    value: function getInstance(command) {
      var obj = document.querySelector('.fancybox-container:not(.fancybox-is-closing):last-child');
      if (!obj) return false;
      var id = obj.dataset.id;
      var instance = FancyData[id];

      if (instance instanceof FancyBox) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        if (typeof command === "string") {
          instance[command].apply(instance, args);
        } else if (FancyUtils.isFunction(command)) {
          command.apply(instance, args);
        }

        return instance;
      }

      return false;
    }
  }]);

  return FancyBox;
}();