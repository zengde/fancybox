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

/**
 * TinyGesture.js
 * https://github.com/sciactive/tinygesture
 * 
 * This service uses passive listeners, so you can't call event.preventDefault()
 * on any of the events.
 *
 * Adapted from https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d
 * and https://github.com/uxitten/xwiper
 */
var TinyGesture =
/*#__PURE__*/
function () {
  function TinyGesture(element, options) {
    _classCallCheck(this, TinyGesture);

    options = Object.assign({}, TinyGesture.defaults, options);
    this.element = element;
    this.opts = options;
    this.touchStartX = null;
    this.touchStartY = null;
    this.touchEndX = null;
    this.touchEndY = null;
    this.velocityX = null;
    this.velocityY = null;
    this.longPressTimer = null;
    this.doubleTapWaiting = false;
    this.handlers = {
      'panstart': [],
      'panmove': [],
      'panend': [],
      'swipeleft': [],
      'swiperight': [],
      'swipeup': [],
      'swipedown': [],
      'tap': [],
      'doubletap': [],
      'longpress': []
    };
    this._onTouchStart = this.onTouchStart.bind(this);
    this._onTouchMove = this.onTouchMove.bind(this);
    this._onTouchEnd = this.onTouchEnd.bind(this);
    this.element.addEventListener('touchstart', this._onTouchStart, passiveIfSupported);
    this.element.addEventListener('touchmove', this._onTouchMove, passiveIfSupported);
    this.element.addEventListener('touchend', this._onTouchEnd, passiveIfSupported);

    if (this.opts.mouseSupport && !('ontouchstart' in window)) {
      this.element.addEventListener('mousedown', this._onTouchStart, passiveIfSupported);
      document.addEventListener('mousemove', this._onTouchMove, passiveIfSupported);
      document.addEventListener('mouseup', this._onTouchEnd, passiveIfSupported);
    }
  }

  _createClass(TinyGesture, [{
    key: "destroy",
    value: function destroy() {
      this.element.removeEventListener('touchstart', this._onTouchStart);
      this.element.removeEventListener('touchmove', this._onTouchMove);
      this.element.removeEventListener('touchend', this._onTouchEnd);
      this.element.removeEventListener('mousedown', this._onTouchStart);
      document.removeEventListener('mousemove', this._onTouchMove);
      document.removeEventListener('mouseup', this._onTouchEnd);
      clearTimeout(this.longPressTimer);
      clearTimeout(this.doubleTapTimer);
    }
  }, {
    key: "on",
    value: function on(type, fn) {
      var _this = this;

      if (this.handlers[type]) {
        this.handlers[type].push(fn);
        return {
          type: type,
          fn: fn,
          cancel: function cancel() {
            return _this.off(type, fn);
          }
        };
      }
    }
  }, {
    key: "off",
    value: function off(type, fn) {
      if (this.handlers[type]) {
        var idx = this.handlers[type].indexOf(fn);

        if (idx !== -1) {
          this.handlers[type].splice(idx, 1);
        }
      }
    }
  }, {
    key: "fire",
    value: function fire(type, event) {
      for (var i = 0; i < this.handlers[type].length; i++) {
        this.handlers[type][i](event);
      }
    }
  }, {
    key: "onTouchStart",
    value: function onTouchStart(event) {
      var _this2 = this;

      this.thresholdX = this.opts.threshold('x', this);
      this.thresholdY = this.opts.threshold('y', this);
      this.disregardVelocityThresholdX = this.opts.disregardVelocityThreshold('x', this);
      this.disregardVelocityThresholdY = this.opts.disregardVelocityThreshold('y', this);
      this.touchStartX = event.type === 'mousedown' ? event.screenX : event.changedTouches[0].screenX;
      this.touchStartY = event.type === 'mousedown' ? event.screenY : event.changedTouches[0].screenY;
      this.touchMoveX = null;
      this.touchMoveY = null;
      this.touchEndX = null;
      this.touchEndY = null; // Long press.

      this.longPressTimer = setTimeout(function () {
        return _this2.fire('longpress', event);
      }, this.opts.longPressTime);
      this.fire('panstart', event);
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(event) {
      if (event.type === 'mousemove' && (!this.touchStartX || this.touchEndX !== null)) {
        return;
      }

      var touchMoveX = (event.type === 'mousemove' ? event.screenX : event.changedTouches[0].screenX) - this.touchStartX;
      this.velocityX = touchMoveX - this.touchMoveX;
      this.touchMoveX = touchMoveX;
      var touchMoveY = (event.type === 'mousemove' ? event.screenY : event.changedTouches[0].screenY) - this.touchStartY;
      this.velocityY = touchMoveY - this.touchMoveY;
      this.touchMoveY = touchMoveY;
      var absTouchMoveX = Math.abs(this.touchMoveX);
      var absTouchMoveY = Math.abs(this.touchMoveY);
      this.swipingHorizontal = absTouchMoveX > this.thresholdX;
      this.swipingVertical = absTouchMoveY > this.thresholdY;
      this.swipingDirection = absTouchMoveX > absTouchMoveY ? this.swipingHorizontal ? 'horizontal' : 'pre-horizontal' : this.swipingVertical ? 'vertical' : 'pre-vertical';

      if (Math.max(absTouchMoveX, absTouchMoveY) > this.opts.pressThreshold) {
        clearTimeout(this.longPressTimer);
      }

      this.fire('panmove', event);
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(event) {
      var _this3 = this;

      if (event.type === 'mouseup' && (!this.touchStartX || this.touchEndX !== null)) {
        return;
      }

      this.touchEndX = event.type === 'mouseup' ? event.screenX : event.changedTouches[0].screenX;
      this.touchEndY = event.type === 'mouseup' ? event.screenY : event.changedTouches[0].screenY;
      this.fire('panend', event);
      clearTimeout(this.longPressTimer);
      var x = this.touchEndX - this.touchStartX;
      var absX = Math.abs(x);
      var y = this.touchEndY - this.touchStartY;
      var absY = Math.abs(y);

      if (absX > this.thresholdX || absY > this.thresholdY) {
        this.swipedHorizontal = this.opts.diagonalSwipes ? Math.abs(x / y) <= this.opts.diagonalLimit : absX >= absY && absX > this.thresholdX;
        this.swipedVertical = this.opts.diagonalSwipes ? Math.abs(y / x) <= this.opts.diagonalLimit : absY > absX && absY > this.thresholdY;

        if (this.swipedHorizontal) {
          if (x < 0) {
            // Left swipe.
            if (this.velocityX < -this.opts.velocityThreshold || x < -this.disregardVelocityThresholdX) {
              this.fire('swipeleft', event);
            }
          } else {
            // Right swipe.
            if (this.velocityX > this.opts.velocityThreshold || x > this.disregardVelocityThresholdX) {
              this.fire('swiperight', event);
            }
          }
        }

        if (this.swipedVertical) {
          if (y < 0) {
            // Upward swipe.
            if (this.velocityY < -this.opts.velocityThreshold || y < -this.disregardVelocityThresholdY) {
              this.fire('swipeup', event);
            }
          } else {
            // Downward swipe.
            if (this.velocityY > this.opts.velocityThreshold || y > this.disregardVelocityThresholdY) {
              this.fire('swipedown', event);
            }
          }
        }
      } else if (absX < this.opts.pressThreshold && absY < this.opts.pressThreshold) {
        // Tap.
        if (this.doubleTapWaiting) {
          this.doubleTapWaiting = false;
          clearTimeout(this.doubleTapTimer);
          this.fire('doubletap', event);
        } else {
          this.doubleTapWaiting = true;
          this.doubleTapTimer = setTimeout(function () {
            return _this3.doubleTapWaiting = false;
          }, this.opts.doubleTapTime);
          this.fire('tap', event);
        }
      }
    }
  }]);

  return TinyGesture;
}();

TinyGesture.defaults = {
  threshold: function threshold(type, self) {
    return Math.max(25, Math.floor(0.15 * (type === 'x' ? window.innerWidth || document.body.clientWidth : window.innerHeight || document.body.clientHeight)));
  },
  velocityThreshold: 10,
  disregardVelocityThreshold: function disregardVelocityThreshold(type, self) {
    return Math.floor(0.5 * (type === 'x' ? self.element.clientWidth : self.element.clientHeight));
  },
  pressThreshold: 8,
  diagonalSwipes: false,
  diagonalLimit: Math.tan(45 * 1.5 / 180 * Math.PI),
  longPressTime: 500,
  doubleTapTime: 300,
  mouseSupport: true
}; // Passive feature detection.

var passiveIfSupported = false;

try {
  window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
    get: function get() {
      passiveIfSupported = {
        passive: true
      };
    }
  }));
} catch (err) {}

(function (document) {
  FancyUtils.on(document, "onInit.fb", function (e, instance, slide) {
    var el = instance.$refs.stage;
    var domRect = el.getBoundingClientRect();
    var START_X = domRect.left;
    var START_Y = domRect.top;
    var gesture = new TinyGesture(el);
    gesture.on('panmove', function (event) {
      var x = gesture.touchMoveX + START_X;
      el.style.transform = "translate(".concat(x, "px, ").concat(START_Y, "px)");
    });
    gesture.on('panend', function (event) {
      if (gesture.swipingDirection === 'horizontal' && gesture.touchMoveX < 0) {
        instance.next();
      } else {
        instance.previous();
      }
    });
    FancyUtils.on(instance.$refs.container, "onUpdate.fb", function (e, curInstance, index) {
      if (index == -1) index = 0;
      if (index == instance.group.length) index = instance.group.length - 1;
      var counter = instance.counterMap[index];
      START_X = window.innerWidth * counter * -1;
      el.style.transform = "translate(".concat(START_X, "px, ").concat(START_Y, "px)");
    });
  });
})(document);