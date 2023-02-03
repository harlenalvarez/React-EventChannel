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

React Event Channel is a simple library to create an event channel that is easy to use and allows components to trigger events to other components.

But not why just use the context or redux?

While there is nothing wrong with using context or redux to trigger events, I just find it cleaner and more natural to raise an event without having to set up reducers, and actions or create contexts for a simple click.  For example, you have an implementation of a save button that calls a function onClick={submitInformation}, and now you want to move the button to the header to use as a global save button. With this package, you can trigger that event with minimal effort and still know that it works like any other event.


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
const [ handleClick ] = useEventProduce({eventName:'doSomething'}, [])
```

From any component that you want to recieve this event from call the subscriber and pass it in a call back with the same name as the event you're listening to.

The callback can return void, any or a Promise

```tsx
useEventSubscriber({ doSomething: async () => {}}, [])
```
**TIP** If you are listening to multiple events you only need one subscriber ```useEventSubscriber({ event1: () => {}, event2: () => {} })```

### Notify Producer On Complete
But if you want to notify the producer you are done, lets say you add a spinner on click then want to remove it when the listener is done.
```tsx
const [ handleClick ] = useEventProducer({eventName:'doSomething',onComplete: (response) => {
    // do what you need to do
}}, [])
```

And just make sure your subscriber returns a response

```tsx
useEventSubscriber({ doSomething:  () => "I'm done"}, [])
```

### Passing Arguments To Subscribers
If you want to pass extra information with your event make sure to add it to your trigger function
```tsx
const [ handleClick ] = useEventProduce({eventName:'doSomething'}, [])
<button onClick={() => {handleClick('Ticket #', 300)}}>Set Ticket</button>
```

In subcriber
```tsx
useEventSubscriber({
    doSomething: (_, args) => { console.log(args); } // ["Ticket #", 300]
}, [])
```

### Cancel Bubbling
If you have multiple nested components listening to the event they will all recieve it, but you can stop the event from bubbling up from a child by preventing default.

```tsx
useEventSubscriber({ doSomething:  (e) => {e.preventDefault()}, [])
```
> You can't stop bubbling with siblings only to the parent


