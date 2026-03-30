# Events and Buffers

## What are Events in Node.js?

- Node.js follows an event-driven architecture where actions (events) trigger specific responses.
- The `EventEmitter` class in the events module is used to handle events in Node.js.
- Events in Node.js work like a _publisher-subscriber_ model where an event is emitted and event listeners (handlers) respont to it.

## Why use Events?

- Helps in asynchronous programming without callback hell.
- Used heavily in real-time applications like chat apps, notifications, and streams.
- Core modules like `fs`, `http`, and `stream` use events internally.

## What are Buffers in Node.js

- A Buffer is a temporary storage area for binary data.
- Node.js does not support direct binary manipulation (like C/C++), so Buffers help handle raw data efficiently.
- Used mostly when dealing with file streams, network data, and binary protocols.

## Why do we need Buffers?

- JavaScript strings are UTF-16 encoded, making direct binary data handling inefficient.
- Buffers store binary data outside V8's heap.
- Useful when working with:
  - File system (`fs` module)
  - Networking (TCP, UDP, WebSockets)
  - Streams (handling chunks of data)
