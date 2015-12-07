# interval-iterator
[![Build Status](http://img.shields.io/travis/mohayonao/interval-iterator.svg?style=flat-square)](https://travis-ci.org/mohayonao/interval-iterator)
[![NPM Version](http://img.shields.io/npm/v/interval-iterator.svg?style=flat-square)](https://www.npmjs.org/package/interval-iterator)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

> An iterator for time-based sequence events

Iterate composed aggregate items by interval from an iterator that generates `{ time: number }`.

## Installation

```
$ npm install interval-iterator
```

## API
### IntervalIterator
- `constructor(iter: Iterator, interval: number)`

### Instance methods
- `next(): { done: boolean, value: object[] }`
- `[Symbol.iterator](): self`

## Examples

```js
import IntervalIterator from "interval-iterator";

let baseIterator = [
  { time: 0.0 },
  { time: 1.0 },
  { time: 1.5 },
  { time: 2.0 },
  { time: 4.0 },
  { time: 8.0 },
][Symbol.iterator]();

let iter = new IntervalIterator(baseIterator, 1);

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

## License

MIT
