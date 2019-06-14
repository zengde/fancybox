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

var FancyDefaults = {
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
  buttons: ["zoom", //"share",
  "slideShow", //"fullScreen",
  //"download",
  "thumbs", "close"],
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
    tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}">' + '<source src="{{src}}" type="{{format}}" />' + 'Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!' + "</video>",
    format: "",
    // custom video format
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
  baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1">' + '<div class="fancybox-bg"></div>' + '<div class="fancybox-inner">' + '<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' + '<div class="fancybox-toolbar">{{buttons}}</div>' + '<div class="fancybox-navigation">{{arrows}}</div>' + '<div class="fancybox-stage"></div>' + '<div class="fancybox-caption"><div class="fancybox-caption__body"></div></div>' + "</div>" + "</div>",
  // Loading indicator template
  spinnerTpl: '<div class="fancybox-loading"></div>',
  // Error message template
  errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
  btnTpl: {
    download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;">' + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg>' + "</a>",
    zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">' + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg>' + "</button>",
    close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg>' + "</button>",
    // Arrows
    arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' + '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div>' + "</button>",
    arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' + '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div>' + "</button>",
    // This small close button will be appended to your html/inline/ajax content by default,
    // if "smallBtn" option is not set to false
    smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' + '<svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg>' + "</button>"
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
    vertical: true,
    // Allow to drag content vertically
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
  onInit: function onInit() {},
  // When instance has been initialized
  beforeLoad: function beforeLoad() {},
  // Before the content of a slide is being loaded
  afterLoad: function afterLoad() {},
  // When the content of a slide is done loading
  beforeShow: function beforeShow() {},
  // Before open animation starts
  afterShow: function afterShow() {},
  // When content is done loading and animating
  beforeClose: function beforeClose() {},
  // Before the instance attempts to close. Return false to cancel the close.
  afterClose: function afterClose() {},
  // After instance has been closed
  onActivate: function onActivate() {},
  // When instance is brought to front
  onDeactivate: function onDeactivate() {},
  // When other instance has been activated
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
  clickContent: function clickContent(current, event) {
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
    clickContent: function clickContent(current, event) {
      return current.type === "image" ? "toggleControls" : false;
    },
    clickSlide: function clickSlide(current, event) {
      return current.type === "image" ? "toggleControls" : "close";
    },
    dblclickContent: function dblclickContent(current, event) {
      return current.type === "image" ? "zoom" : false;
    },
    dblclickSlide: function dblclickSlide(current, event) {
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