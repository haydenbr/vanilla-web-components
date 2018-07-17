# Web Components

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

## Custom Element

- dom element with custom properties, methods, and functionality
- can extend native or custom dom elements
- components from library or framework depend on third-party code to translate components into ht

paragraph element example (elements are just javascript objects)

https://developers.google.com/web/fundamentals/web-components/customelements

## Shadow Dom

- allows element to maintain it's own encapsulated dom tree
- 'open' and 'closed', can / can't manipulate after creation

## HTML template

- allows us to reuse html fragments

https://www.html5rocks.com/en/tutorials/webcomponents/template/

## HTML imports

- include html file as you would a css file
- often used in conjunction with html templates
- designed as packaging mechanism for web components
- a lot of browsers decided not to implement, but easy to pollyfil
