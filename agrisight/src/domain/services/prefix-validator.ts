export class PrefixValidator {
  private prefixListsMaxLength = 1;

  constructor(maxLength: number) {
    this.prefixListsMaxLength = maxLength;
  }

  checkIfSingleCharArray(prefixList: string[]): void {
    if (
      !prefixList.every((char) => typeof char === "string" && char.length === 1)
    ) {
      throw new Error(
        "All elements of the input array must be single characters."
      );
    }
  }

  // The problem is of compexity O(2^n), so expotential !
  checkLenthRequirements(prefixList: string[]): void {
    if (
      !prefixList.length ||
      prefixList.length === 0 ||
      prefixList.length > this.prefixListsMaxLength
    ) {
      throw new Error(
        "The list of prefixes do not comply with length requirement."
      );
    }
  }

  removeDuplicates(prefixList: string[]):string[]{
    return Array.from(new Set(prefixList));
  }
}
