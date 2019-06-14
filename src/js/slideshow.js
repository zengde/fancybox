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