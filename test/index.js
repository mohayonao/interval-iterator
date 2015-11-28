import assert from "power-assert";
import index from "../src";
import IteratorSequencer from "../src/IteratorSequencer";

describe("index", () => {
  it("exports", () => {
    assert(index === IteratorSequencer);
  });
});
