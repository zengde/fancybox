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