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