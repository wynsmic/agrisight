import { WriteStream } from "fs";
import { PrefixValidator } from "./prefix-validator";
import { Record, SingleCharacter } from "../entities/record";

export class TextGenerator {
  private writeStream: WriteStream | null;
  private textValidator = new PrefixValidator(10);

  constructor(writeStream?: WriteStream) {
    this.writeStream = writeStream ?? null;
  }

  // IDEA: Let say that the 2^N complexity will lead us toward memory rampage
  // => we need stream or whatever
  streamRecord(record: string) {
    if (this.writeStream) {
      this.writeStream.write(record + "\n");
    }
  }

  // But for small input text, let's put it in array:
  getAllPrefixesFromText(chars: SingleCharacter[]): string[] {
    this.textValidator.checkIfSingleCharArray(chars);
    this.textValidator.removeDuplicates(chars);
    this.textValidator.checkLenthRequirements(chars);
    const record = new Record([]);
    const texts: string[] = [];
    record.initRecord(chars);
    while (record.snapshot() !== chars.slice(-1)[0]) {
      texts.push(record.snapshot());
      record.incrementRecord();
    }
    texts.push(record.snapshot());
    return texts;
  }
}
