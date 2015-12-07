const ITERATOR = typeof Symbol !== "undefined" ? Symbol.iterator : "Symbol(Symbol.iterator)";

export default class IntervalIterator {
  constructor(iter, interval) {
    this._iter = iter;
    this._interval = +interval;
    this._currentTime = 0;
    this._iterItem = null;
    this._done = false;
  }

  next() {
    let t0 = this._currentTime + this._interval;

    if (this._done) {
      return { done: true, value: [] };
    }

    let result = [];
    let iterItem;

    while ((iterItem = this._next(t0)) !== null) {
      result.push(iterItem);
    }

    this._currentTime = t0;

    return { done: false, value: result };
  }

  [ITERATOR]() {
    return this;
  }

  _next(t0) {
    if (this._iterItem) {
      return this._nextIterItem(t0);
    }

    let iterItem = this._iter.next();

    if (!iterItem.done) {
      this._iterItem = iterItem.value;

      return this._nextIterItem(t0);
    }

    this._done = true;

    return null;
  }

  _nextIterItem(t0) {
    if (t0 <= this._iterItem.time) {
      return null;
    }

    let iterItem = this._iterItem;

    this._iterItem = null;

    return iterItem;
  }
}
