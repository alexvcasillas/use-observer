## Use Observer

The **Use Observer** package aims to provide a proper implementation of the _Intersection Observer API_ for your React components with ease.

## Motivation

I've used a few libraries that implemented the _Intersection Observer API_ but they were all doing something unwated and that was that my components where all getting re-rendered constantly due to a wrong implementation of the state within the hook. I was working trying to fix this issue because it was really bothering me and was causing some performance issues due to re-rendering (lots of) components on my screen at the same time so I started writing my own _Intersection Observer API_ implementation to remove this other libraries from my dependencies so I finally came up with a solution that would also be a great fit for your projects if you need this _Intersection Observer API_ to work with your React components to animate something when within the viewport.

## Installation

```
yarn add @alexvcasillas/use-observer
```

```
npm i -s @alexvcasillas/use-observer
```

## Usage

```tsx
import { useObserver } from "@alexvcasillas/use-observer";

function MyComponent() {
  const { inView, ref } = useObserver({ threshold: 0.5 });

  return (
    <div ref={ref}>
      Is in view? {inView}
    </div>
  )
}
```

## API

The API of **useObserver** is pretty straightforward, I aimed to keep a consistent and simple API so you would only need to pass an object with the following properties:

```typescript
type ObserverType {
  threshold: number,
  rootMargin?: string,
}
```

The threshold property indicates how much of the component needs to be displayed within the viewport to trigger the animation. It will take a number from 0 to 1 to indicate the percentage of the component that's on the viewport, meaning that 0.5 will be equals to the 50% of the component.

The rootMargin property is a string with syntax similar to that of the CSS margin property. Each side of the rectangle represented by rootMargin is added to the corresponding side in the root element's bounding box before the intersection test is performed. This lets you, for example, adjust the bounds outward so that the target element is considered 100% visible even if a certain number of pixels worth of width or height is clipped away, or treat the target as partially hidden if an edge is too close to the edge of the root's bounding box. [Reference](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin).

**useObserver** will return an object with two properties:

```typescript
{
  inView: boolean,
  ref: React.MutableRefObject
}
```

With the **inView** property you will be able to determine that the given element is in viewport within the given threshold.

You will have to use the **ref** property to create a reference to the element within your React component that you'd like to track (as seen in the example above).

## Used by

* [React Spring POP!](https://github.com/alexvcasillas/react-spring-pop): Animate React elements when they enter the viewport with physics based animations.

If you'd like to add your library that uses **useObserver** feel free to add a PR modifying the above line and I will gladly merge it :)