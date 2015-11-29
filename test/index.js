import assert from "power-assert";
import index from "../src";
import IntervalIterator from "../src/IntervalIterator";

describe("index", () => {
  it("exports", () => {
    assert(index === IntervalIterator);
  });
});
