import { PrefixValidator } from "./prefix-validator";

describe("Class TextValidator", () => {
  let textValidator: PrefixValidator;

  beforeEach(() => {
    textValidator = new PrefixValidator(5);
  });

  describe("Check the composition of prefixes list items", () => {
    it("should not throw an error for an array of single characters", () => {
      const input = ["a", "b", "c"];
      expect(() => textValidator.checkIfSingleCharArray(input)).not.toThrow();
    });

    it("should throw an error for an array with a string of more than one character", () => {
      const input = ["a", "bc", "d"];
      expect(() => textValidator.checkIfSingleCharArray(input)).toThrow(
        "All elements of the input array must be single characters."
      );
    });

    it("should throw an error for an array with a non-string element", () => {
      const input = ["a", 123, "b"] as string[];
      expect(() => textValidator.checkIfSingleCharArray(input)).toThrow(
        "All elements of the input array must be single characters."
      );
    });

    it("should throw an error for an empty string element", () => {
      const input = ["a", "", "b"];
      expect(() => textValidator.checkIfSingleCharArray(input)).toThrow(
        "All elements of the input array must be single characters."
      );
    });
  });

  describe("Check if the prefixe list complies with length requirement", () => {
    it("should not throw an error for prefixes under the length limit", () => {
      const validList = ["a", "b", "c"];
      expect(() =>
        textValidator.checkLenthRequirements(validList)
      ).not.toThrow();
    });

    it("should throw an error for prefixes exceeding the length limit", () => {
      const invalidList = ["a", "c", "d", "d", "d", "d"];
      expect(() => textValidator.checkLenthRequirements(invalidList)).toThrow();
    });

    it("should throw on empty array", () => {
      const emptyPrefixes: string[] = [];
      expect(() =>
        textValidator.checkLenthRequirements(emptyPrefixes)
      ).toThrow();
    });
  });

  describe("Duplicates removal in prefix lists", () => {
    it("should remove duplicate prefixes from the list", () => {
      const prefixList = ["aaa", "b", "a", "c", "b"];
      const deduplicatedList = textValidator.removeDuplicates(prefixList);
      expect(deduplicatedList).toEqual(["aaa","b", "a", "c"]);
    });

    it("should not modify the list if there are no duplicates", () => {
      const prefixList = ["z", "a", "b", "c"];
      const deduplicatedList = textValidator.removeDuplicates(prefixList);
      expect(deduplicatedList).toEqual(["z", "a", "b", "c"]);
    });

    it("should handle an empty array", () => {
      const prefixList: string[] = [];
      const deduplicatedList = textValidator.removeDuplicates(prefixList);
      expect(deduplicatedList).toEqual([]);
    });
  });
});
