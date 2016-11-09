# ng2-disqus

[![npm version](https://badge.fury.io/js/ng2-disqus.svg)](https://badge.fury.io/js/ng2-disqus) [![npm](https://img.shields.io/npm/dt/ng2-disqus.svg?maxAge=2592000)]() [![David](https://img.shields.io/david/threesquared/ng2-disqus.svg?maxAge=2592000)]() [![npm](https://img.shields.io/npm/l/ng2-disqus.svg?maxAge=2592000)]()

Angular 2 component for Disqus

## Installation

### npm

```
$ npm i ng2-disqus --save
```

## Usage

```ts
import { Ng2DisqusModule } from 'ng2-disqus';
```

Include the component directive in the imports array:
```ts
@NgModule({
  imports: [
    // ...
    Ng2DisqusModule
  ]
})
```

Add `disqus` to your template with the shortname and page identifier:

```html
<disqus [shortname]="'threesquared'" [identifier]="post.id"></disqus>
```
