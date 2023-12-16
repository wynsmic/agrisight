import { Record } from "./record";

describe("Class Record", () => {
  describe("Check the initialization a new record", () => {
    it("should get the right first record after init", () => {
      const record = new Record([]);
      record.initRecord(["a", "b", "c"]);
      expect(record.snapshot()).toEqual("a");
    });
  });
  describe("Check record properties", () => {
    it("Should not has next record", () => {
      const record = new Record([]);
      record.initRecord(["c"]);
      expect(record.hasNext()).toEqual(false);
    });
    it("Should  has next record", () => {
      const record = new Record([]);
      record.initRecord(["b", "c"]);
      expect(record.hasNext()).toEqual(true);
    });
  });
});
