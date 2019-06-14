# fancyBox.js

lightbox script for displaying images, videos and more.
Touch enabled, responsive and fully customizable.

See the [project es page](http://zengde.github.io/fancybox.js) for documentation and a demonstration.

Default is above es6 stage-3,rest broswers visit [project common page](http://zengde.github.io/fancybox.js/index-umd.html)

## Run Demo

```cmd
node server.js
```

## Quick start

1\.  Add latest fancyBox files

1.1 with all built in modules

1.1.1 above es6 stage-3
```html
<link  href="/path/to/dist/fancybox.min.css" rel="stylesheet">
<script src="/path/to/dist/fancybox.es.js"></script>
```

1.1.2 es5
```html
<link  href="/path/to/dist/fancybox.min.css" rel="stylesheet">
<script src="/path/to/dist/fancybox-umd.js"></script>
```

1.2 certain modules

1.2.1 above es6 stage-3
```html
<link  href="/path/to/dist/fancybox.min.css" rel="stylesheet">
<script src="/path/to/src/default.js"></script> // must be first
<script src="/path/to/src/core.js"></script>
<script src="/path/to/src/fullscreen.js"></script> // optional
<script src="/path/to/src/guestures.js"></script> // optional
<script src="/path/to/src/media.js"></script> // optional
<script src="/path/to/src/share.js"></script> // optional
<script src="/path/to/src/slideshow.js"></script> // optional
<script src="/path/to/src/thumbs.js"></script> // optional
<script src="/path/to/src/wheel.js"></script> // optional
<script src="/path/to/src/hash.js"></script> // optional
```
1.2.2 es5
```html
<link  href="/path/to/dist/fancybox.min.css" rel="stylesheet">
<script src="/path/to/dist/libs/default.js"></script>
<script src="/path/to/dist/libs/core.js"></script>
// etc
```

2\.  Create links

```html
<a data-fancybox="gallery" href="big_1.jpg">
    <img src="small_1.jpg">
</a>

<a data-fancybox="gallery" href="big_2.jpg">
    <img src="small_2.jpg">
</a>
```


3\. Enjoy!


## License

fancyBox is licensed under the [GPLv3](http://choosealicense.com/licenses/gpl-3.0) license for all open source applications.
A commercial license is required for all commercial applications (including sites, themes and apps you plan to sell).

[Read more about fancyBox license](http://fancyapps.com/fancybox/3/#license).

## Bugs and feature requests

If you find a bug, please report it [here on Github](https://github.com/zengde/fancybox.js/issues).

Guidelines for bug reports:

1. Use the GitHub issue search — check if the issue has already been reported.
2. Check if the issue has been fixed — try to reproduce it using the latest master or development branch in the repository.
3. Isolate the problem — create a reduced test case and a live example. You can use CodePen to fork any demo found on documentation to use it as a template.

A good bug report shouldn't leave others needing to chase you up for more information.
Please try to be as detailed as possible in your report.


Feature requests are welcome. Please look for existing ones and use GitHub's "reactions" feature to vote.

Please do not use the issue tracker for personal support requests - use Stack Overflow ([fancybox-3](http://stackoverflow.com/questions/tagged/fancybox-3) tag) instead.
