<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

React Event Channel is a simple library to create an event channel that is easy to use and allow for component to trigger events to other components.

But not why just use the context or redux?

While you can have a button that dispatches and event for another component to pick up the data do something and dispatch it back, sometimes all you need is a simple way to say HEY! I clicked this as do something without having to set up reducers, store or do any clean up. Raising events is a natural way to think about these type of behaviour.  Another reason is lets say you have a component with a safe button all wired, but the designer desides to move the save button to the header and make it a global save depending on the page that is rendered.  Now you would have to add reducers, button state, clean up, add your logic into an useEffect.... instead you can just listen to the click event from the button that is now outside of your component ( and without prop drilling ).


Well that's just me I like simplicity.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

### Installation

```npm
npm i @practicaljs/react-eventchannel
```

### Usage

From any component where you want to raise an event call the producer

```tsx
const [ handleClick ] = useEventProduce({eventName:'doSomething'})
```

From any component that you want to recieve this event from call the subscriber and pass it in a call back with the same name as the event you're listening to.

The callback can return void, any or a Promise

```tsx
useEventSubscriber({ doSomething: async () => {}})
```
**TIP** If you are listening to multiple events you only need one subscriber ```useEventSubscriber({ event1: () => {}, event2: () => {} })```

### Notify Producer On Complete
But if you want to notify the producer you are done, lets say you add a spinner on click then want to remove it when the listener is done.
```tsx
const [ handleClick ] = useEventProducer({eventName:'doSomething',onComplete: (response) => {
    // do what you need to do
}})
```

And just make sure your subscriber returns a response

```tsx
useEventSubscriber({ doSomething:  () => "I'm done"})
```

### Passing Arguments To Subscribers
If you want to pass extra information with your event make sure to add it to your trigger function
```tsx
const [ handleClick ] = useEventProduce({eventName:'doSomething'})
<button onClick={() => {handleClick('Ticket #', 300)}}>Set Ticket</button>
```

In subcriber
```tsx
useEventSubscriber({
    doSomething: (_, args) => { console.log(args); } // ["Ticket #", 300]
})
```

### Cancel Bubbling
If you have multiple nested components listening to the event they will all recieve it, but you can stop the event from bubbling up from a child by preventing default.

```tsx
useEventSubscriber({ doSomething:  (e) => {e.preventDefault()})
```
> You can't stop bubbling with siblings only to the parent


