# ng2-disqus

[![Build Status](https://travis-ci.org/threesquared/ng2-disqus.svg?branch=master)](https://travis-ci.org/threesquared/ng2-disqus) [![Coverage Status](https://coveralls.io/repos/github/threesquared/ng2-disqus/badge.svg?branch=master)](https://coveralls.io/github/threesquared/ng2-disqus?branch=master) [![npm version](https://badge.fury.io/js/ng2-disqus.svg)](https://badge.fury.io/js/ng2-disqus)


Angular 2 component for Disqus

## Installation

### npm

```
$ npm i ng2-disqus --save
```

## Usage

If you are using SystemJS you will need to add the path to the ng2-disqus module.

```html
<script>
  System.config({
    // ...
    map: {
      "ng2-disqus": "node_modules/ng2-disqus"
    }
  });
  // ...
</script>
```

Import the component:

```ts
import { Disqus } from 'ng2-disqus/disqus';
```

Include the component directive in the directives array:
```ts
@Component({
  selector: 'my-component',
  // ...
  directives: [Disqus]
})
```

Add `disqus` to your template with the shortname and page identifier:

```html
<disqus [shortname]="'threesquared'" [identifier]="post.id"></disqus>
```
