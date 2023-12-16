import { TextGenerator } from "./text-generator";

describe("Class Record", () => {
  describe("Check whole sequence of generated records", () => {
    it("should return the right list of texts from given suffixes", () => {
      const suffixes = ["c", "n", "s"];
      const expectedOutput = ["c", "cn", "cns", "cs", "n", "ns", "s"];
      const textGenerator = new TextGenerator();
      const output = textGenerator.getAllPrefixesFromText(suffixes);
      expect(output).toEqual(expectedOutput);
    });
    it("should return texts array with right length", () => {
      const suffixes = "abcdefgh".split('');
      const textGenerator = new TextGenerator();
      const output = textGenerator.getAllPrefixesFromText(suffixes);
      expect(output.length).toEqual(255);
    });
  });
});
