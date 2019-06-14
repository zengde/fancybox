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
const FancyDefaults = {
  // Close existing modals
  // Set this to false if you do not need to stack multiple instances
  closeExisting: false,

  // Enable infinite gallery navigation
  loop: false,

  // Horizontal space between slides
  gutter: 50,

  // Enable keyboard navigation
  keyboard: true,

  // Should allow caption to overlap the content
  preventCaptionOverlap: true,

  // Should display navigation arrows at the screen edges
  arrows: true,

  // Should display counter at the top left corner
  infobar: true,

  // Should display close button (using `btnTpl.smallBtn` template) over the content
  // Can be true, false, "auto"
  // If "auto" - will be automatically enabled for "html", "inline" or "ajax" items
  smallBtn: "auto",

  // Should display toolbar (buttons at the top)
  // Can be true, false, "auto"
  // If "auto" - will be automatically hidden if "smallBtn" is enabled
  toolbar: "auto",

  // What buttons should appear in the top right corner.
  // Buttons will be created using templates from `btnTpl` option
  // and they will be placed into toolbar (class="fancybox-toolbar"` element)
  buttons: [
    "zoom",
    //"share",
    "slideShow",
    //"fullScreen",
    //"download",
    "thumbs",
    "close"
  ],

  // Detect "idle" time in seconds
  idleTime: 3,

  // Disable right-click and use simple image protection for images
  protect: false,

  // Shortcut to make content "modal" - disable keyboard navigtion, hide buttons, etc
  modal: false,

  image: {
    // Wait for images to load before displaying
    //   true  - wait for image to load and then display;
    //   false - display thumbnail and load the full-sized image over top,
    //           requires predefined image dimensions (`data-width` and `data-height` attributes)
    preload: false
  },

  ajax: {
    // Object containing settings for ajax request
    settings: {
      // This helps to indicate that request comes from the modal
      // Feel free to change naming
      data: {
        fancybox: true
      }
    }
  },

  iframe: {
    // Iframe template
    tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',

    // Preload iframe before displaying it
    // This allows to calculate iframe content width and height
    // (note: Due to "Same Origin Policy", you can't get cross domain data).
    preload: true,

    // Custom CSS styling for iframe wrapping element
    // You can use this to set custom iframe dimensions
    css: {},

    // Iframe tag attributes
    attr: {
      scrolling: "auto"
    }
  },

  // For HTML5 video only
  video: {
    tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}">' +
      '<source src="{{src}}" type="{{format}}" />' +
      'Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!' +
      "</video>",
    format: "", // custom video format
    autoStart: true
  },

  // Default content type if cannot be detected automatically
  defaultType: "image",

  // Open/close animation type
  // Possible values:
  //   false            - disable
  //   "zoom"           - zoom images from/to thumbnail
  //   "fade"
  //   "zoom-in-out"
  //
  animationEffect: "zoom",

  // Duration in ms for open/close animation
  animationDuration: 366,

  // Should image change opacity while zooming
  // If opacity is "auto", then opacity will be changed if image and thumbnail have different aspect ratios
  zoomOpacity: "auto",

  // Transition effect between slides
  //
  // Possible values:
  //   false            - disable
  //   "fade'
  //   "slide'
  //   "circular'
  //   "tube'
  //   "zoom-in-out'
  //   "rotate'
  //
  transitionEffect: "fade",

  // Duration in ms for transition animation
  transitionDuration: 366,

  // Custom CSS class for slide element
  slideClass: "",

  // Custom CSS class for layout
  baseClass: "",

  // Base template for layout
  baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
    '<div class="fancybox-bg"></div>' +
    '<div class="fancybox-inner">' +
    '<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +
    '<div class="fancybox-toolbar">{{buttons}}</div>' +
    '<div class="fancybox-navigation">{{arrows}}</div>' +
    '<div class="fancybox-stage"></div>' +
    '<div class="fancybox-caption"><div class="fancybox-caption__body"></div></div>' +
    "</div>" +
    "</div>",

  // Loading indicator template
  spinnerTpl: '<div class="fancybox-loading"></div>',

  // Error message template
  errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',

  btnTpl: {
    download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;">' +
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg>' +
      "</a>",

    zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">' +
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg>' +
      "</button>",

    close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg>' +
      "</button>",

    // Arrows
    arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
      '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div>' +
      "</button>",

    arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
      '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div>' +
      "</button>",

    // This small close button will be appended to your html/inline/ajax content by default,
    // if "smallBtn" option is not set to false
    smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' +
      '<svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg>' +
      "</button>"
  },

  // Container is injected into this element
  parentEl: "body",

  // Hide browser vertical scrollbars; use at your own risk
  hideScrollbar: true,

  // Focus handling
  // ==============

  // Try to focus on the first focusable element after opening
  autoFocus: true,

  // Put focus back to active element after closing
  backFocus: true,

  // Do not let user to focus on element outside modal content
  trapFocus: true,

  // Module specific options
  // =======================

  // Set `touch: false` to disable panning/swiping
  touch: {
    vertical: true, // Allow to drag content vertically
    momentum: true // Continue movement after releasing mouse/touch when panning
  },

  // Hash value when initializing manually,
  // set `false` to disable hash change
  hash: null,

  // Customize or add new media types
  // Example:
  /*
    media : {
      youtube : {
        params : {
          autoplay : 0
        }
      }
    }
  */
  media: {},

  // Callbacks
  //==========

  // See Documentation/API/Events for more information
  // Example:
  /*
    afterShow: function( instance, current ) {
      console.info( 'Clicked element:' );
      console.info( current.opts.$orig );
    }
  */

  onInit: function () { }, // When instance has been initialized

  beforeLoad: function () { }, // Before the content of a slide is being loaded
  afterLoad: function () { }, // When the content of a slide is done loading

  beforeShow: function () { }, // Before open animation starts
  afterShow: function () { }, // When content is done loading and animating

  beforeClose: function () { }, // Before the instance attempts to close. Return false to cancel the close.
  afterClose: function () { }, // After instance has been closed

  onActivate: function () { }, // When instance is brought to front
  onDeactivate: function () { }, // When other instance has been activated

  // Interaction
  // ===========

  // Use options below to customize taken action when user clicks or double clicks on the fancyBox area,
  // each option can be string or method that returns value.
  //
  // Possible values:
  //   "close"           - close instance
  //   "next"            - move to next gallery item
  //   "nextOrClose"     - move to next gallery item or close if gallery has only one item
  //   "toggleControls"  - show/hide controls
  //   "zoom"            - zoom image (if loaded)
  //   false             - do nothing

  // Clicked on the content
  clickContent: function (current, event) {
    return current.type === "image" ? "zoom" : false;
  },

  // Clicked on the slide
  clickSlide: "close",

  // Clicked on the background (backdrop) element;
  // if you have not changed the layout, then most likely you need to use `clickSlide` option
  clickOutside: "close",

  // Same as previous two, but for double click
  dblclickContent: false,
  dblclickSlide: false,
  dblclickOutside: false,

  // Custom options when mobile device is detected
  // =============================================

  mobile: {
    preventCaptionOverlap: false,
    idleTime: false,
    clickContent: function (current, event) {
      return current.type === "image" ? "toggleControls" : false;
    },
    clickSlide: function (current, event) {
      return current.type === "image" ? "toggleControls" : "close";
    },
    dblclickContent: function (current, event) {
      return current.type === "image" ? "zoom" : false;
    },
    dblclickSlide: function (current, event) {
      return current.type === "image" ? "zoom" : false;
    }
  },

  // Internationalization
  // ====================

  lang: "en",
  i18n: {
    en: {
      CLOSE: "Close",
      NEXT: "Next",
      PREV: "Previous",
      ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
      PLAY_START: "Start slideshow",
      PLAY_STOP: "Pause slideshow",
      FULL_SCREEN: "Full screen",
      THUMBS: "Thumbnails",
      DOWNLOAD: "Download",
      SHARE: "Share",
      ZOOM: "Zoom"
    },
    de: {
      CLOSE: "Schlie&szlig;en",
      NEXT: "Weiter",
      PREV: "Zur&uuml;ck",
      ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
      PLAY_START: "Diaschau starten",
      PLAY_STOP: "Diaschau beenden",
      FULL_SCREEN: "Vollbild",
      THUMBS: "Vorschaubilder",
      DOWNLOAD: "Herunterladen",
      SHARE: "Teilen",
      ZOOM: "Vergr&ouml;&szlig;ern"
    },
    'zh-cn': {
      CLOSE: "关闭",
      NEXT: "下一个",
      PREV: "上一个",
      ERROR: "无法加载请求内容. <br/> 请稍后重试.",
      PLAY_START: "开始播放",
      PLAY_STOP: "暂停播放",
      FULL_SCREEN: "全屏",
      THUMBS: "缩略图",
      DOWNLOAD: "下载",
      SHARE: "分享",
      ZOOM: "缩放"
    }
  }
};
const FancyUtils = {
	on: function (el, events, selector, fn, one = false) {
		if (selector && typeof selector != 'string') {
			fn = selector;
			selector = undefined;
		}
		events.split(' ').forEach(event => {
			if (selector || fn.length > 1) {
				fn = (function (selector, handler) {
					return function (e) {
						let res = true;
						// delegator event listener
						if (selector) {
							let path = e.path;
							res = path.some(function (value, key) {
								if (!value.nodeType || value.nodeType == 9)
									return false;
								return value.matches(selector)
							})
						}
						if (res) {
							// multi args event listener
							let args = handler.length > 1 ? e.detail : ['fake'];
							handler(e, ...args);
						}
					}
				})(selector, fn)
			}
			el.addEventListener(event.split('.')[0], fn, { passive: false, once: one });
		});
	},
	trigger: function (el, event, detail = null) {
		let customEvent = new CustomEvent(event.split('.')[0], {
			detail: detail,
			bubbles: true
		});
		el.dispatchEvent(customEvent);
	},
	isFunction: function (obj) {
		return typeof obj === "function" && typeof obj.nodeType !== "number";
	},
	translate: function (obj, str) {
		var arr = obj.opts.i18n[obj.opts.lang] || obj.opts.i18n.en;

		return str.replace(/\{\{(\w+)\}\}/g, function (match, n) {
			return arr[n] === undefined ? match : arr[n];
		});
	}
};
const FancyData = {
	uid: 0
}

class FancyBox {
	isVisible = true;
	currPos = 0;
	$refs = {};
	slides = {};
	counter = 0;
	counterMap = {};

	constructor(content, opts, index = 0) {
		this.group = content;
		this.opts = Object.assign({}, FancyDefaults, opts);
		this.id = this.opts.id || FancyData.uid++;
		this.currPos = index;
		this.init();
	}
	init () {
		let root = document.querySelector(this.opts.parentEl);
		root.insertAdjacentHTML('beforeend', this.opts.baseTpl);
		let container = root.lastChild;
		container.dataset.id = this.id;
		FancyData[this.id] = this;

		this.$refs.container = container;
		container.classList.add('fancybox-is-open');
		["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach((item) => {
			this.$refs[item] = container.querySelector(".fancybox-" + item);
		});

		this.trigger("onInit");
		this.addEvents();
		this.jumpTo(this.currPos);
	}
	addEvents () {
		let self = this;
		FancyUtils.on(self.$refs.container, "click.fb-close", "[data-fancybox-close]", function (e) {
			e.stopPropagation();
			e.preventDefault();

			self.close();
		})
		FancyUtils.on(self.$refs.container, "touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function (e) {
			e.stopPropagation();
			e.preventDefault();

			self.previous();
		})
		FancyUtils.on(self.$refs.container, "touchstart.fb-next click.fb-next", "[data-fancybox-next]", function (e) {
			e.stopPropagation();
			e.preventDefault();

			self.next();
		})
		FancyUtils.on(self.$refs.container, "click.fb", "[data-fancybox-zoom]", function (e) {
			// Click handler for zoom button
			self[self.isScaledDown() ? "scaleToActual" : "scaleToFit"]();
		});
	}
	removeEvents () {

	}
	trigger (name, ...args) {
		args.unshift(this);
		let rez = true;

		if (FancyUtils.isFunction(this.opts[name])) {
			rez = this.opts[name].apply(this, args);
		}

		if (rez === false) {
			return rez;
		}

		let el = (name === "afterClose") ? document : this.$refs.container;
		FancyUtils.trigger(el, name + ".fb", args);
	}
	close (force = true) {
		this.$refs.container.style.display = "none";
		if (force) {
			this.destroy();
		}
	}
	destroy () {
		this.$refs.container.remove();
		// should use instance=null or delete instance
		Object.keys(this.$refs).forEach(key => {
			this.$refs[key] = null;
		});
		// maybe clear reference
		// https://stackoverflow.com/questions/6033821/do-i-need-to-remove-event-listeners-before-removing-elements
		FancyData[this.id] = null;
	}
	render () {
		let current = this.current;
		let opts = current.opts;

		this.$refs.infobar.querySelector('[data-fancybox-index]').textContent = this.currIndex + 1;
		this.$refs.infobar.querySelector('[data-fancybox-count]').textContent = this.group.length;
		this.$refs.caption.querySelector('.fancybox-caption__body').textContent = opts.caption;

		let buttons = opts.buttons;
		let btnStr = '';
		buttons.forEach((btn) => {
			btnStr += opts.btnTpl[btn] ? opts.btnTpl[btn] : '';
		})
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
	showControls () {
		let opts = this.current.opts;
		let control = {
			"fancybox-show-toolbar": !!(opts.toolbar && opts.buttons),
			"fancybox-show-infobar": !!(opts.infobar && this.group.length > 1),
			"fancybox-show-caption": !!opts.caption,
			"fancybox-show-nav": !!(opts.arrows && this.group.length > 1),
			"fancybox-is-modal": !!opts.modal
		}
		Object.entries(control).forEach((value, key) => {
			this.$refs.container.classList.toggle(...value);
		})
	}
	loadSlide (index) {
		if (index < 0 || index >= this.group.length)
			return;
		if (this.trigger("beforeLoad") === false) {
			return false;
		}
		let container = this.$refs.container;
		let current = this.getItem(index);
		if (!current.opts.type) {
			this.trigger('objectNeedsType', current);
		}
		let type = current.opts.type;
		let slide = {};
		slide.$slide = this.$refs.stage.querySelector(`.fancybox-slide[data-index="${index}"]`);
		if (!slide.$slide) {
			slide.$slide = document.createElement('div');
			slide.$slide.className = `fancybox-slide fancybox-slide--${type}`;
			slide.$slide.dataset.index = index;

			switch (type) {
				case 'image':
					slide.$content = document.createElement('div');
					slide.$content.className = 'fancybox-content';
					slide.$slide.appendChild(slide.$content);
					let img = document.createElement('img');
					img.className = 'fancybox-image';
					img.src = current.src;
					img.onload = () => {
						let x = (container.clientWidth - img.naturalWidth) / 2;
						let y = (container.clientHeight - img.naturalHeight) / 2;
						slide.$slide.classList.add('fancybox-slide--complete');
						let style = {
							transform: `translate(${x}px, ${y}px)`,
							width: img.naturalWidth + 'px',
							height: img.naturalHeight + 'px'
						};
						Object.assign(slide.$content.style, style);
						this.trigger('afterLoad', slide);
					}
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
					Object.entries(this.opts.iframe.attr).forEach(args => slide.$iframe.setAttribute(...args));
					this.trigger('afterLoad', slide);
					slide.$iframe.src = current.src;
					break;
				default:

					break;
			}
			// todo replace with insertAdjacentElement
			this.$refs.stage.appendChild(slide.$slide);
		}

		slide.$slide.classList.toggle('fancybox-slide--current', index == this.currIndex);
	}
	next () {
		this.currIndex++;
	}
	previous () {
		this.currIndex--;
	}
	jumpTo (index) {
		this.currIndex = index;
	}
	getItem (index) {
		if (!this.slides[index]) {
			let item = this.group[index];
			item.opts = Object.assign({}, this.opts, item.opts);
			this.slides[index] = item;
			this.counterMap[index] = this.counter++;
		}
		return this.slides[index];
	}
	get current () {
		return this.getItem(this.currIndex);
	}
	get classObject () {
		let arr = ["fancybox-container"];
		if (this.isVisible)
			arr.push("fancybox-is-open");

		return arr.join(" ");
	}
	get currIndex () {
		return this.currPos;
	}
	set currIndex (val) {
		this.trigger("onUpdate", val);
		if (val < 0 || val >= this.group.length)
			return;
		this.currPos = val;
		this.render();
	}
	static open (content, opts, index) {
		new FancyBox(content, opts, index);
	}
	static getInstance (command, ...args) {
		let obj = document.querySelector('.fancybox-container:not(.fancybox-is-closing):last-child');
		if (!obj)
			return false;
		let id = obj.dataset.id;
		let instance = FancyData[id];

		if (instance instanceof FancyBox) {
			if (typeof command === "string") {
				instance[command].apply(instance, args);
			} else if (FancyUtils.isFunction(command)) {
				command.apply(instance, args);
			}

			return instance;
		}

		return false;
	}
}
// ==========================================================================
//
// Media
// Adds additional media type support
//
// ==========================================================================
(function (document) {
    "use strict";

    // Object containing properties for each media type
    var FancyMediaDefaults = {
        youtube: {
            matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
            params: {
                autoplay: 1,
                autohide: 1,
                fs: 1,
                rel: 0,
                hd: 1,
                wmode: "transparent",
                enablejsapi: 1,
                html5: 1
            },
            paramPlace: 8,
            type: "iframe",
            url: "https://www.youtube-nocookie.com/embed/$4",
            thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg"
        },

        vimeo: {
            matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
            params: {
                autoplay: 1,
                hd: 1,
                show_title: 1,
                show_byline: 1,
                show_portrait: 0,
                fullscreen: 1
            },
            paramPlace: 3,
            type: "iframe",
            url: "//player.vimeo.com/video/$2"
        },

        instagram: {
            matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
            type: "image",
            url: "//$1/p/$2/media/?size=l"
        },

        // Examples:
        // http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
        // https://www.google.com/maps/@37.7852006,-122.4146355,14.65z
        // https://www.google.com/maps/@52.2111123,2.9237542,6.61z?hl=en
        // https://www.google.com/maps/place/Googleplex/@37.4220041,-122.0833494,17z/data=!4m5!3m4!1s0x0:0x6c296c66619367e0!8m2!3d37.4219998!4d-122.0840572
        gmap_place: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
            type: "iframe",
            url: function (rez) {
                return (
                    "//maps.google." +
                    rez[2] +
                    "/?ll=" +
                    (rez[9] ? rez[9] + "&z=" + Math.floor(rez[10]) + (rez[12] ? rez[12].replace(/^\//, "&") : "") : rez[12] + "").replace(/\?/, "&") +
                    "&output=" +
                    (rez[12] && rez[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
                );
            }
        },

        // Examples:
        // https://www.google.com/maps/search/Empire+State+Building/
        // https://www.google.com/maps/search/?api=1&query=centurylink+field
        // https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393
        gmap_search: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
            type: "iframe",
            url: function (rez) {
                return "//maps.google." + rez[2] + "/maps?q=" + rez[5].replace("query=", "q=").replace("api=1", "") + "&output=embed";
            }
        }
    };

    // Formats matching url to final form
    var format = function (url, rez, params) {
        if (!url) {
            return;
        }

        params = params || "";

        if (typeof params === "object") {
            params = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        }

        rez.forEach(function (value, index) {
            url = url.replace("$" + index, value || "");
        });

        if (params.length) {
            url += (url.indexOf("?") > 0 ? "&" : "?") + params;
        }

        return url;
    };

    FancyUtils.on(document, "objectNeedsType.fb", function (e, instance, item) {
        var url = item.src || "",
            type = false,
            media,
            thumb,
            rez,
            params,
            urlParams,
            paramObj,
            provider;

        media = Object.assign({}, FancyMediaDefaults, item.opts.media);

        // Look for any matching media type
        Object.entries(media).some(([providerName, providerOpts]) => {
            rez = url.match(providerOpts.matcher);

            if (!rez) {
                return false;
            }

            type = providerOpts.type;
            provider = providerName;
            paramObj = {};

            if (providerOpts.paramPlace && rez[providerOpts.paramPlace]) {
                urlParams = rez[providerOpts.paramPlace];

                if (urlParams[0] == "?") {
                    urlParams = urlParams.substring(1);
                }

                urlParams = urlParams.split("&");

                for (var m = 0; m < urlParams.length; ++m) {
                    var p = urlParams[m].split("=", 2);

                    if (p.length == 2) {
                        paramObj[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
                    }
                }
            }

            params = Object.assign({}, providerOpts.params, item.opts[providerName], paramObj);

            url = FancyUtils.isFunction(providerOpts.url) ? providerOpts.url.call(this, rez, params, item) : format(providerOpts.url, rez, params);

            thumb = FancyUtils.isFunction(providerOpts.thumb) ? providerOpts.thumb.call(this, rez, params, item) : format(providerOpts.thumb, rez);

            if (providerName === "youtube") {
                url = url.replace(/&t=((\d+)m)?(\d+)s/, function (match, p1, m, s) {
                    return "&start=" + ((m ? parseInt(m, 10) * 60 : 0) + parseInt(s, 10));
                });
            } else if (providerName === "vimeo") {
                url = url.replace("&%23", "#");
            }

            return true;
        });

        // If it is found, then change content type and update the url

        if (type) {
            if (!item.opts.thumb && !(item.opts.$thumb && item.opts.$thumb.length)) {
                item.opts.thumb = thumb;
            }

            if (type === "iframe") {
                item.opts = Object.assign({}, item.opts, {
                    type: 'iframe',
                    iframe: {
                        preload: false,
                        attr: {
                            scrolling: "no"
                        }
                    }
                });
            }

            Object.assign(item, {
                src: url,
                origSrc: item.src,
                contentSource: provider,
                contentType: type === "image" ? "image" : provider == "gmap_place" || provider == "gmap_search" ? "map" : "video"
            });
        } else if (url) {
            item.opts.type = item.opts.defaultType;
        }
    });

    // Load YouTube/Video API on request to detect when video finished playing
    var VideoAPILoader = {
        youtube: {
            src: "https://www.youtube.com/iframe_api",
            class: "YT",
            loading: false,
            loaded: false
        },

        vimeo: {
            src: "https://player.vimeo.com/api/player.js",
            class: "Vimeo",
            loading: false,
            loaded: false
        },

        load: function (vendor) {
            var _this = this,
                script;

            if (this[vendor].loaded) {
                setTimeout(function () {
                    _this.done(vendor);
                });
                return;
            }

            if (this[vendor].loading) {
                return;
            }

            this[vendor].loading = true;

            script = document.createElement("script");
            script.type = "text/javascript";
            script.src = this[vendor].src;

            if (vendor === "youtube") {
                window.onYouTubeIframeAPIReady = function () {
                    _this[vendor].loaded = true;
                    _this.done(vendor);
                };
            } else {
                script.onload = function () {
                    _this[vendor].loaded = true;
                    _this.done(vendor);
                };
            }

            document.body.appendChild(script);
        },
        done: function (vendor) {
            var instance, $el, player;

            if (vendor === "youtube") {
                delete window.onYouTubeIframeAPIReady;
            }

            instance = FancyBox.getInstance();

            if (instance) {
                $el = instance.current.$content.querySelector("iframe");

                if (vendor === "youtube" && YT !== undefined && YT) {
                    player = new YT.Player($el.id, {
                        events: {
                            onStateChange: function (e) {
                                if (e.data == 0) {
                                    instance.next();
                                }
                            }
                        }
                    });
                } else if (vendor === "vimeo" && Vimeo !== undefined && Vimeo) {
                    player = new Vimeo.Player($el);

                    player.on("ended", function () {
                        instance.next();
                    });
                }
            }
        }
    };

    FancyUtils.on(document, "afterLoad.fb", function (e, instance, current) {
        if (instance.group.length > 1 && (current.contentSource === "youtube" || current.contentSource === "vimeo")) {
            VideoAPILoader.load(current.contentSource);
        }
    });
})(document);
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
class TinyGesture {
    constructor(element, options) {
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

    destroy () {
        this.element.removeEventListener('touchstart', this._onTouchStart);
        this.element.removeEventListener('touchmove', this._onTouchMove);
        this.element.removeEventListener('touchend', this._onTouchEnd);
        this.element.removeEventListener('mousedown', this._onTouchStart);
        document.removeEventListener('mousemove', this._onTouchMove);
        document.removeEventListener('mouseup', this._onTouchEnd);
        clearTimeout(this.longPressTimer);
        clearTimeout(this.doubleTapTimer);
    }

    on (type, fn) {
        if (this.handlers[type]) {
            this.handlers[type].push(fn);
            return {
                type,
                fn,
                cancel: () => this.off(type, fn)
            };
        }
    }

    off (type, fn) {
        if (this.handlers[type]) {
            const idx = this.handlers[type].indexOf(fn);
            if (idx !== -1) {
                this.handlers[type].splice(idx, 1);
            }
        }
    }

    fire (type, event) {
        for (let i = 0; i < this.handlers[type].length; i++) {
            this.handlers[type][i](event);
        }
    }

    onTouchStart (event) {
        this.thresholdX = this.opts.threshold('x', this);
        this.thresholdY = this.opts.threshold('y', this);
        this.disregardVelocityThresholdX = this.opts.disregardVelocityThreshold('x', this);
        this.disregardVelocityThresholdY = this.opts.disregardVelocityThreshold('y', this);
        this.touchStartX = (event.type === 'mousedown' ? event.screenX : event.changedTouches[0].screenX);
        this.touchStartY = (event.type === 'mousedown' ? event.screenY : event.changedTouches[0].screenY);
        this.touchMoveX = null;
        this.touchMoveY = null;
        this.touchEndX = null;
        this.touchEndY = null;
        // Long press.
        this.longPressTimer = setTimeout(() => this.fire('longpress', event), this.opts.longPressTime);
        this.fire('panstart', event);
    }

    onTouchMove (event) {
        if (event.type === 'mousemove' && (!this.touchStartX || this.touchEndX !== null)) {
            return;
        }
        const touchMoveX = (event.type === 'mousemove' ? event.screenX : event.changedTouches[0].screenX) - this.touchStartX;
        this.velocityX = touchMoveX - this.touchMoveX;
        this.touchMoveX = touchMoveX;
        const touchMoveY = (event.type === 'mousemove' ? event.screenY : event.changedTouches[0].screenY) - this.touchStartY;
        this.velocityY = touchMoveY - this.touchMoveY;
        this.touchMoveY = touchMoveY;
        const absTouchMoveX = Math.abs(this.touchMoveX);
        const absTouchMoveY = Math.abs(this.touchMoveY);
        this.swipingHorizontal = absTouchMoveX > this.thresholdX;
        this.swipingVertical = absTouchMoveY > this.thresholdY;
        this.swipingDirection = absTouchMoveX > absTouchMoveY
            ? (this.swipingHorizontal ? 'horizontal' : 'pre-horizontal')
            : (this.swipingVertical ? 'vertical' : 'pre-vertical');
        if (Math.max(absTouchMoveX, absTouchMoveY) > this.opts.pressThreshold) {
            clearTimeout(this.longPressTimer);
        }
        this.fire('panmove', event);
    }

    onTouchEnd (event) {
        if (event.type === 'mouseup' && (!this.touchStartX || this.touchEndX !== null)) {
            return;
        }
        this.touchEndX = (event.type === 'mouseup' ? event.screenX : event.changedTouches[0].screenX);
        this.touchEndY = (event.type === 'mouseup' ? event.screenY : event.changedTouches[0].screenY);
        this.fire('panend', event);
        clearTimeout(this.longPressTimer);

        const x = this.touchEndX - this.touchStartX;
        const absX = Math.abs(x);
        const y = this.touchEndY - this.touchStartY;
        const absY = Math.abs(y);

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
                this.doubleTapTimer = setTimeout(() => this.doubleTapWaiting = false, this.opts.doubleTapTime);
                this.fire('tap', event);
            }
        }
    }
}

TinyGesture.defaults = {
    threshold: (type, self) => Math.max(25, Math.floor(0.15 * (type === 'x' ? window.innerWidth || document.body.clientWidth : window.innerHeight || document.body.clientHeight))),
    velocityThreshold: 10,
    disregardVelocityThreshold: (type, self) => Math.floor(0.5 * (type === 'x' ? self.element.clientWidth : self.element.clientHeight)),
    pressThreshold: 8,
    diagonalSwipes: false,
    diagonalLimit: Math.tan(45 * 1.5 / 180 * Math.PI),
    longPressTime: 500,
    doubleTapTime: 300,
    mouseSupport: true
};
// Passive feature detection.
let passiveIfSupported = false;

try {
    window.addEventListener('test', null, Object.defineProperty({}, 'passive', { get: function () { passiveIfSupported = { passive: true }; } }));
} catch (err) { }

(function (document) {
    FancyUtils.on(document, "onInit.fb", function (e, instance, slide) {
        let el = instance.$refs.stage;
        let domRect = el.getBoundingClientRect();
        let START_X = domRect.left;
        let START_Y = domRect.top;

        const gesture = new TinyGesture(el);

        gesture.on('panmove', event => {
            let x = gesture.touchMoveX + START_X;
            el.style.transform = `translate(${x}px, ${START_Y}px)`;
        });
        gesture.on('panend', event => {
            if (gesture.swipingDirection === 'horizontal' && gesture.touchMoveX < 0) {
                instance.next();
            } else {
                instance.previous();
            }
        });

        FancyUtils.on(instance.$refs.container, "onUpdate.fb", function (e, curInstance, index) {
            if (index == -1) index = 0;
            if (index == instance.group.length) index = instance.group.length - 1;
            let counter = instance.counterMap[index];
            START_X = window.innerWidth * counter * -1;
            el.style.transform = `translate(${START_X}px, ${START_Y}px)`;
        });
    })
})(document);
// ==========================================================================
//
// SlideShow
// Enables slideshow functionality
//
// Example of usage:
// $.fancybox.getInstance().SlideShow.start()
//
// ==========================================================================
(function (document) {
    "use strict";

    FancyDefaults.btnTpl.slideShow = '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg>' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg>' +
        "</button>";

    FancyDefaults.slideShow = {
        autoStart: false,
        speed: 3000,
        progress: true
    };

    var SlideShow = function (instance) {
        this.instance = instance;
        this.opts = instance.opts.slideShow;
        this.init();
    };

    Object.assign(SlideShow.prototype, {
        timer: null,
        isActive: false,
        $button: null,
        isFristRun: true,

        init: function () {
            FancyUtils.on(this.instance.$refs.toolbar, "click", "[data-fancybox-play]", () => {
                this.toggle();
            });
        },
        update: function () {
            let self = this;
            let opts = self.opts;

            self.$button = self.instance.$refs.toolbar.querySelector("[data-fancybox-play]");

            if (self.instance.group.length < 2 || !opts) {
                self.$button.style.display = "none";
            } else if (!self.$progress && opts.progress) {
                self.instance.$refs.inner.insertAdjacentHTML('beforeend', '<div class="fancybox-progress"></div>');
                self.$progress = self.instance.$refs.inner.lastChild;
            }
        },

        set: function (force) {
            var self = this,
                instance = self.instance,
                current = instance.current;

            // Check if reached last element
            if (current && (force === true || current.opts.loop || instance.currIndex < instance.group.length - 1)) {
                if (self.isActive && current.opts.type !== "video") {
                    if (self.$progress) {
                        self.$progress.style.display = "block";
                        self.$progress.animate([
                            { transform: 'scaleX(0)' },
                            { transform: 'scaleX(1)' }
                        ], {
                                duration: current.opts.slideShow.speed
                            });
                    }

                    self.timer = setTimeout(function () {
                        if (!instance.opts.loop && instance.currIndex == instance.group.length - 1) {
                            instance.jumpTo(0);
                        } else {
                            instance.next();
                        }
                    }, current.opts.slideShow.speed);
                }
            } else {
                self.stop();
                instance.idleSecondsCounter = 0;
                instance.showControls();
            }
        },

        clear: function () {
            var self = this;

            clearTimeout(self.timer);

            self.timer = null;

            if (self.$progress) {
                self.$progress.removeAttribute("style");
                self.$progress.style.display = "none";
            }
        },

        start: function () {
            var self = this,
                current = self.instance.current;

            if (current) {
                self.$button
                    .setAttribute("title", (current.opts.i18n[current.opts.lang] || current.opts.i18n.en).PLAY_STOP);
                self.$button.classList.remove("fancybox-button--play");
                self.$button.classList.add("fancybox-button--pause");

                self.isActive = true;

                self.set(true);

                self.instance.trigger("onSlideShowChange", true);
            }
        },

        stop: function () {
            var self = this,
                current = self.instance.current;

            self.clear();

            self.$button
                .setAttribute("title", (current.opts.i18n[current.opts.lang] || current.opts.i18n.en).PLAY_START);
            self.$button.classList.remove("fancybox-button--pause")
            self.$button.classList.add("fancybox-button--play");

            self.isActive = false;

            self.instance.trigger("onSlideShowChange", false);

            if (self.$progress) {
                self.$progress.removeAttribute("style");
                self.$progress.style.display = "none";
            }
        },

        toggle: function () {
            var self = this;

            if (self.isActive) {
                self.stop();
            } else {
                self.start();
            }
        }
    });

    FancyUtils.on(document, "onInit.fb", function (e, instance) {
        if (instance && !instance.SlideShow) {
            instance.SlideShow = new SlideShow(instance);
        }
    })

    FancyUtils.on(document, "beforeLoad.fb", function (e, instance, current, firstRun) {
        var SlideShow = instance && instance.SlideShow;

        SlideShow.update();
        if (firstRun) {
            if (SlideShow && current.opts.slideShow.autoStart) {
                SlideShow.start();
            }
        } else if (SlideShow && SlideShow.isActive) {
            SlideShow.clear();
        }
    })

    FancyUtils.on(document, "afterLoad.fb", function (e, instance, current) {
        var SlideShow = instance && instance.SlideShow;

        if (SlideShow && SlideShow.isActive) {
            SlideShow.set();
        }
    })

    FancyUtils.on(document, "afterKeydown.fb", function (e, instance, current, keypress, keycode) {
        var SlideShow = instance && instance.SlideShow;

        // "P" or Spacebar
        if (SlideShow && current.opts.slideShow && (keycode === 80 || keycode === 32) && !$(document.activeElement).is("button,a,input")) {
            keypress.preventDefault();

            SlideShow.toggle();
        }
    })

    FancyUtils.on(document, "beforeClose.fb onDeactivate.fb", function (e, instance) {
        var SlideShow = instance && instance.SlideShow;

        if (SlideShow) {
            SlideShow.stop();
        }
    })

    // Page Visibility API to pause slideshow when window is not active
    FancyUtils.on(document, "visibilitychange", function () {
        var instance = FancyBox.getInstance(),
            SlideShow = instance && instance.SlideShow;

        if (SlideShow && SlideShow.isActive) {
            if (document.hidden) {
                SlideShow.clear();
            } else {
                SlideShow.set();
            }
        }
    });
})(document);
// ==========================================================================
//
// FullScreen
// Adds fullscreen functionality
// https://github.com/nguyenj/fullscreen-polyfill/
// ==========================================================================
(function (document, $) {
  "use strict";

  FancyDefaults.btnTpl.fullScreen = '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}">' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg>' +
    "</button>";

  FancyDefaults.fullScreen = {
    autoStart: false
  };

  var FullScreen = {
    request: function (elem) {
      elem = elem || document.documentElement;

      elem['requestFullscreen'](elem.ALLOW_KEYBOARD_INPUT);
    },
    exit: function () {
      document[fn.exitFullscreen]();
    },
    toggle: function (elem) {
      elem = elem || document.documentElement;

      if (this.isFullscreen()) {
        this.exit();
      } else {
        this.request(elem);
      }
    },
    isFullscreen: function () {
      return Boolean(document['fullscreenElement']);
    },
    enabled: function () {
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

      let button = instance.$refs.toolbar
        .querySelector("[data-fancybox-fullscreen]");
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
      });

      // Expose API
      instance.FullScreen = FullScreen;
    }
  })
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
// ==========================================================================
//
// Thumbs
// Displays thumbnails in a grid
//
// ==========================================================================
(function (document) {
  "use strict";

  var CLASS = "fancybox-thumbs",
    CLASS_ACTIVE = CLASS + "-active";

  // Make sure there are default values
  FancyDefaults.btnTpl.thumbs = '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}">' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg>' +
    "</button>";
  FancyDefaults.thumbs = {
    autoStart: false, // Display thumbnails on opening
    hideOnClose: true, // Hide thumbnail grid when closing animation starts
    parentEl: ".fancybox-container", // Container is injected into this element
    axis: "y" // Vertical (y) or horizontal (x) scrolling
  };

  class FancyThumbs {
    visible = false;
    isActive = false;
    isFirstRun = true;

    constructor(instance) {
      this.instance = instance;
      this.opts = instance.opts.thumbs;
      instance.Thumbs = this;

      FancyUtils.on(instance.$refs.toolbar, "click", "[data-fancybox-thumbs]", () => {
        this.toggle();
      });
    }
    update () {
      let instance = this.instance;
      let active = this.isActive;

      if (this.isFirstRun) {
        this.isFirstRun = false;
        let group = this.instance.group;
        let enabled = 0;
        let html = '';

        group.forEach((item, index) => {
          let str = '';
          if (item.opts.thumb) {
            enabled++;
            str = `style="background-image:url(${item.opts.thumb})"`;
          } else {
            str = 'class="fancybox-thumbs-missing"';
          }
          html += `<a href="javascript:;" tabindex="0" data-index="${index}" ${str}></a>`;
        })
        if (enabled) {
          this.isActive = active = true;

          this.$grid = document.createElement('div');
          this.$grid.className = `${CLASS} ${CLASS}-${this.opts.axis}`;
          instance.$refs.container.appendChild(this.$grid);
          FancyUtils.on(this.$grid, "click", "a", function (e) {
            let index = parseInt(e.srcElement.dataset.index);
            instance.jumpTo(index);
          });

          this.$list = document.createElement('div');
          this.$list.className = CLASS + '__list';
          this.$list.innerHTML = html;
          this.$grid.appendChild(this.$list);
        }
      }
      let button = instance.$refs.toolbar.querySelector("[data-fancybox-thumbs]");
      if (!active) {
        button.style.display = "none";
        return;
      }
      instance.$refs.container.classList.toggle("fancybox-show-thumbs", this.visible);
      //instance.trigger("onThumbs" + (active ? "Show" : "Hide"));
      this.focus(0);
    }
    focus (duration) {
      this.$list.querySelectorAll('a').forEach(value => {
        value.classList.toggle(CLASS_ACTIVE, value.dataset.index == this.instance.currIndex);
      });
    }
    hide () {
      this.isVisible = false;
    }
    show () {
      this.isVisible = true;
    }
    toggle () {
      this.isVisible = !this.visible;
    }
    /**
     * @param {boolean} val
     */
    set isVisible (val) {
      // if (this.visible == val) return; uncomment this,thumb active state will not work
      this.visible = val;
      this.update();
    }
  };


  FancyUtils.on(document, "onInit.fb", function (e, instance) {
    if (instance && !instance.Thumbs) {
      new FancyThumbs(instance);
    }
  });
  FancyUtils.on(document, "beforeLoad.fb", function (e, instance) {
    let Thumbs = instance && instance.Thumbs;

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
    var Thumbs = instance && instance.Thumbs;

    // "G"
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
// ==========================================================================
//
// Wheel
// Basic mouse weheel support for gallery navigation
//
// ==========================================================================
(function (document) {
  "use strict";
  
  // Use mousewheel to navigate gallery
  // If 'auto' - enabled for images only
  FancyDefaults.wheel = 'auto';

  var prevTime = new Date().getTime();

  FancyUtils.on(document, "onInit.fb",
    function (e, instance, current) {
      FancyUtils.on(instance.$refs.stage, "mousewheel DOMMouseScroll wheel MozMousePixelScroll", function (e) {
        var current = instance.current,
          currTime = new Date().getTime();

        if (instance.group.length < 2 || current.opts.wheel === false || (current.opts.wheel === "auto" && current.opts.type !== "image")) {
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
    }
  );
})(document);
//// ==========================================================================
//
// Share
// Displays simple form for sharing current url
//
// ==========================================================================
(function (document) {
  "use strict";

  FancyDefaults.btnTpl.share = '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}">' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg>' +
    "</button>";

  FancyDefaults.share = {
    url: function (instance, item) {
      return (
        (!instance.currentHash && !(item.type === "inline" || item.type === "html") ? item.origSrc || item.src : false) || window.location
      );
    },
    tpl: `
        <div class="fancybox-share">
            <h1>{{SHARE}}</h1>
            <p>
                <a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}">
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg>
                    <span>Facebook</span>
                </a>
                <a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}">
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg>
                    <span>Twitter</span>
                </a>
                <a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}">
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg>
                    <span>Pinterest</span>
                </a>
            </p>
            <p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p>
        </div>`
  };

  function escapeHtml (string) {
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

    tpl = current.opts.share.tpl
      .replace(/\{\{media\}\}/g, current.type === "image" ? encodeURIComponent(current.src) : "")
      .replace(/\{\{url\}\}/g, encodeURIComponent(url))
      .replace(/\{\{url_raw\}\}/g, escapeHtml(url))
      .replace(/\{\{descr\}\}/g, instance.$caption ? encodeURIComponent(instance.$caption.text()) : "");

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
        afterLoad: function (shareInstance, shareCurrent) {
          // Close self if parent instance is closing
          FancyUtils.on(instance.$refs.container, "beforeClose.fb", null, function () {
            shareInstance.close(null, 0);
          }, true);

          // Opening links in a popup window
          shareCurrent.$content.querySelectorAll(".fancybox-share__button").forEach(value => {
            FancyUtils.on(value, 'click', function (e) {
              e.stopPropagation();
              e.preventDefault();

              window.open(this.href, "Share", "width=550, height=450");
              return false;
            });
          })

        }
      });
  });
})(document);
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

  function escapeSelector (sel) {
    var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
    var fcssescape = function (ch, asCodePoint) {
      if (asCodePoint) {
        // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
        if (ch === "\0") {
          return "\uFFFD";
        }

        // Control characters and (dependent upon position) numbers get escaped as code points
        return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
      }

      // Other potentially-special ASCII characters get backslash-escaped
      return "\\" + ch;
    };

    return (sel + "").replace(rcssescape, fcssescape);
  };

  // Get info about gallery name and current index from url
  function parseUrl () {
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
  }

  // Trigger click evnt on links to open new fancyBox instance
  function triggerFromUrl (url) {
    if (url.gallery !== "") {
      // If we can find element matching 'data-fancybox' atribute,
      // then triggering click event should start fancyBox
      let index = url.index;
      let obj = document.querySelector("[data-fancybox='" + escapeSelector(url.gallery) + "'] :nth-child(" + index + ")");
      if (obj) {
        obj.focus();
        FancyUtils.trigger(obj, "click.fb-start", index);
      }
    }
  }

  // Get gallery name from current instance
  function getGalleryID (instance) {
    var opts, ret;

    if (!instance) {
      return false;
    }

    opts = instance.opts;
    ret = opts.hash;

    return ret === "" ? false : ret;
  }

  // Update hash when opening/closing fancyBox
  FancyUtils.on(document, "onInit.fb", function (e, instance) {
    var url, gallery;

    if (instance.opts.hash === false) {
      return;
    }

    url = parseUrl();
    gallery = getGalleryID(instance);

    // Make sure gallery start index matches index from hash
    if (gallery && url.gallery && gallery == url.gallery) {
      instance.currPos = url.index - 1;
    }
  });

  FancyUtils.on(document, "beforeShow.fb", function (e, instance, current, firstRun) {
    var gallery;

    if (instance.opts.hash === false) {
      return;
    }

    // Check if need to update window hash
    gallery = getGalleryID(instance);

    if (!gallery) {
      return;
    }

    // Variable containing last hash value set by fancyBox
    // It will be used to determine if fancyBox needs to close after hash change is detected
    instance.currentHash = gallery + (instance.group.length > 1 ? "-" + (current.index + 1) : "");

    // If current hash is the same (this instance most likely is opened by hashchange), then do nothing
    if (window.location.hash === "#" + instance.currentHash) {
      return;
    }

    if (firstRun && !instance.origHash) {
      instance.origHash = window.location.hash;
    }

    if (instance.hashTimer) {
      clearTimeout(instance.hashTimer);
    }

    // Update hash
    instance.hashTimer = setTimeout(function () {
      if ("replaceState" in window.history) {
        window.history[firstRun ? "pushState" : "replaceState"]({},
          document.title,
          window.location.pathname + window.location.search + "#" + instance.currentHash
        );

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

    clearTimeout(instance.hashTimer);

    // Goto previous history entry
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
  })


  // Check if need to start/close after url has changed
  FancyUtils.on(window, "hashchange.fb", function () {
    var url = parseUrl(),
      fb = null;

    // Find last fancyBox instance that has "hash"
    Object.values(FancyData).reverse().some(value => {
      if (value.currentHash) {
        fb = value;
        return true;
      }
    })

    if (fb) {
      // Now, compare hash values
      if (fb.currentHash !== url.gallery + "-" + url.index && !(url.index === 1 && fb.currentHash == url.gallery)) {
        fb.currentHash = null;

        fb.close();
      }
    } else if (url.gallery !== "") {
      triggerFromUrl(url);
    }
  });

  // Check current hash and trigger click event on matching element to start fancyBox, if needed
  setTimeout(function () {
    if (!FancyBox.getInstance()) {
      triggerFromUrl(parseUrl());
    }
  }, 50);

})(window, document);