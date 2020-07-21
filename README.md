# Fish

## What is Fish?

Fish is a `Discord.js Framework Non-Constructer` in **bata**.
it is meant to allow easy and quick setups for anyone. with 
upcoming built-in commands and all the complicated processes done for you.

## What Fish is going to offer.

It will offer built-in commands with all the difficult and tedious
processes done for you. like permission checking and it is built-in 
Non-Constructer form. 

Example of non-Constructer
```js

module.exports = {
  name: "SomeName",
  aliases: ["aliases1", "aliases2"], // and so on...
  description: "SomeDescription",
  usage: "someUsage",
  // will be added ( permission: ["Manage nicknames"] // and so on... )
  run: (
    // options
  ) => {
    // code
  }
};

```

Example of Constructer
```js

const somthing = require("Somthing");

class exampleOfConstructer extends somthing.command {
  constructor (
  // options
  ) {
      // optional more code
    super (
  // options pasedin
    );
    // more code
  }
  // optional more code
};

```

## Installation

Node 8+ or newer is required.
[Comming soon]

## TODO

- [x] FishClient
  - [x] FishOptions
    - [x] prefix
    - [ ] dev (s)
    - [x] message eventLoader
    - [ ] bot support server links client option
- [ ] FishMessage
  - [x] args Variable
  - [x] commandName Variable
  - [ ] load commands
- [ ] built in to Fish
  - [ ] help command
  - [ ] eval command
  - [ ] reload command

### bugs

Message events undefined 'undefined' more info on the file path: 'src/bace/events/message.js'
