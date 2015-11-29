const ITERATOR = typeof Symbol !== "undefined" ? Symbol.iterator : "Symbol(Symbol.iterator)";

export default class IntervalIterator {
  constructor(iter, interval) {
    this.iter = iter;
    this.interval = +interval;
    this._currentTime = 0;
    this._iterItem = null;
    this._doneTime = 0;
    this._done = false;
  }

  next() {
    let t0 = this._currentTime + this.interval;

    if (this._done && this._doneTime < t0) {
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

    let iterItem = this.iter.next();

    if (iterItem.done) {
      this._done = true;
      return null;
    }

    this._iterItem = iterItem.value;
    this._doneTime = this._iterItem.time + (this._iterItem.duration || 0);

    return this._nextIterItem(t0);
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
