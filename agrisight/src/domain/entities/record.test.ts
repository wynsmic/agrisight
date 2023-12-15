import {
  Record,
  RecordType as CharsType,
} from "./record";

describe("Class Record", () => {
  describe("Check the initialization a new record", () => {
    it("should get the right first record after init", () => {
      const chars: CharsType = [
        { char: "a", status: 1 },
        { char: "b", status: 0 },
        { char: "c", status: 0 },
      ];
      const record = new Record([]);
      record.initRecord(['a', 'b', 'c'])
      expect(record.snapshot()).toEqual("a");
    });

  });
  describe("Check the generation of next record", () => {
    it("should activate next char", () => {
      const chars: CharsType = [
        { char: "a", status: 1 },
        { char: "b", status: 1 },
        { char: "c", status: 0 },
        { char: "d", status: 0 },
      ];
      const record = new Record(chars);
      record.setStatusAtIndex(2, 1);

      expect(record.snapshot()).toEqual("abc");
    });
    it("should find the last active char", () => {
      const chars: CharsType = [
        { char: "a", status: 1 },
        { char: "b", status: 1 },
        { char: "c", status: 0 },
        { char: "d", status: 0 },
      ];
      const record = new Record(chars);
      const idx = record.getLastActivatedCharIndex();

      expect(idx).toEqual(1);
    });

    it("should find the last inactive sequence of char", () => {
      const chars: CharsType = [
        { char: "a", status: 1 },
        { char: "b", status: 0 },
        { char: "c", status: 0 },
        { char: "d", status: 1 },
      ];
      const record = new Record(chars);
      const startIndex = record.getLastInactiveSequence().start;
      const endIndex = record.getLastInactiveSequence().end;

      expect(startIndex).toEqual(1);
      expect(endIndex).toEqual(2);
    });
  });
});
