# iterator-sequencer
[![Build Status](http://img.shields.io/travis/mohayonao/iterator-sequencer.svg?style=flat-square)](https://travis-ci.org/mohayonao/iterator-sequencer)
[![NPM Version](http://img.shields.io/npm/v/iterator-sequencer.svg?style=flat-square)](https://www.npmjs.org/package/iterator-sequencer)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

> Sequencer-like Iterator

convert to a sequencer-like iterator from an iterator that generates `{ time: number }`.

## Installation

```
$ npm install iterator-sequencer
```

## API
### IteratorSequencer
- `constructor(iter: Iterator, interval: number)`

### Instance methods
- `next(): { done: boolean, value: object[] }`
- `[Symbol.iterator]()`

## Examples

```js
import IteratorSequencer from "iterator-sequencer";

let baseIterator = [
  { time: 0.0 },
  { time: 1.0 },
  { time: 1.5 },
  { time: 2.0 },
  { time: 4.0 },
  { time: 8.0 },
][Symbol.iterator]();

let iter = new IteratorSequencer(baseIterator, 1);

// 0.000
iter.next(); // { done: false, value: [ { time: 0.0 } ] }
// 1.000
iter.next(); // { done: false, value: [ { time: 1.0 }, { time: 1.5 } ] }
// 2.000
iter.next(); // { done: false, value: [ { time: 2.0 } ] }
// 3.000
iter.next(); // { done: false, value: [] }
// 4.000
iter.next(); // { done: false, value: [ { time: 4.0 } ] }
// 5.000
iter.next(); // { done: false, value: [] }
// 6.000
iter.next(); // { done: false, value: [] }
// 7.000
iter.next(); // { done: false, value: [] }
// 8.000
iter.next(); // { done: false, value: [ { time: 8.0 } ] }
// 9.000
iter.next(); // { done: true, value: [] }
```

`{ done: true }` is adjusted by `duration` of the last item if exists.

```js
import IteratorSequencer from "iterator-sequencer";

let baseIterator = [
  { time: 0.0, duration: 2 },
  { time: 1.0, duration: 2 },
  { time: 1.5, duration: 2 },
  { time: 2.0, duration: 2 },
  { time: 4.0, duration: 2 },
  { time: 8.0, duration: 2 },
][Symbol.iterator]();

let iter = new IteratorSequencer(baseIterator, 1);

// 0.000
iter.next(); // { done: false, value: [ { time: 0.0, duration: 2 } ] }
// 1.000
iter.next(); // { done: false, value: [ { time: 1.0, duration: 2 }, { time: 1.5, duration: 2 } ] }
// 2.000
iter.next(); // { done: false, value: [ { time: 2.0, duration: 2 } ] }
// 3.000
iter.next(); // { done: false, value: [] }
// 4.000
iter.next(); // { done: false, value: [ { time: 4.0, duration: 2 } ] }
// 5.000
iter.next(); // { done: false, value: [] }
// 6.000
iter.next(); // { done: false, value: [] }
// 7.000
iter.next(); // { done: false, value: [] }
// 8.000
iter.next(); // { done: false, value: [ { time: 8.0, duration: 2 } ] }
// 9.000
iter.next(); // { done: false, value: [] }
// 10.000
iter.next(); // { done: true , value: [] }
```

## License

MIT
