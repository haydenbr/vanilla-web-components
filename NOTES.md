# Web Components

## Fundamentals

web components in the wild

https://www.youtube.com/watch?v=AS9CMVU4XhI

existing tools

- Polymer
- SkateJS
- x-tag

why do we prefer frameworks?

- consistent API

why?

- portability
- encapsulated components => conflicting css
- sub-DOM tree: doesn't inherit styles, styles don't leak

4 standards

- custom elements
- shadow dom
- html template
- html imports

### Custom Element

- dom element with custom properties, methods, and functionality
- can extend native or custom dom elements
- components from library or framework depend on third-party code to translate components into ht

paragraph element example (elements are just javascript objects)

https://developers.google.com/web/fundamentals/web-components/customelements

### Shadow Dom

- allows element to maintain it's own encapsulated dom tree
- 'open' and 'closed', can / can't manipulate after creation

### HTML template

- allows us to reuse html fragments

https://www.html5rocks.com/en/tutorials/webcomponents/template/

### HTML imports

- include html file as you would a css file
- often used in conjunction with html templates
- designed as packaging mechanism for web components
- a lot of browsers decided not to implement, but easy to pollyfil

## Anatomy of Web Component

### pure.js vs html import

- easier to ship pure.js
- polyfill needed for html import
- cant use bundlers with html method

## Building a custom element

- which attributes does it need?
- how does it react to attribute changes?
- what properties it has?
- what events it fires and when?

if you do like this

```js
this._root = this.attachShadow({ mode: 'open' });
```

then later you would use `this._root.<method | value>` in any place you would otherwise use `document.<method | value>`.

- jsx/tsx in web components?
- writing with typescript?
- perf test of framework component vs. web component
- how would these components work in an app of components?
- how to style components in shadow dom?
- light DOM vs shadow DOM
- what's the difference between this and, say, bootstrap elements?

Writing component:

- class on slot doesn't persist in DOM, but you can still use it in selectors
- default vs named slots
- default slot content

- custom properties vs css variables: let's call them variables, because that's what they are hence `var()`
https://caniuse.com/#search=css%20variables
https://github.com/jhildenbiddle/css-vars-ponyfill

- CSS variables can be defined in a selector targeting any parent of the component (most typically, the component host)
