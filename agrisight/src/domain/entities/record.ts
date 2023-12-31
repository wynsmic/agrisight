export type SingleCharacter = `${string}`;
export type RecordType = { char: SingleCharacter; status: 1 | 0 }[];

export class Record {
  private chars: RecordType;

  constructor(record: RecordType) {
    this.chars = record;
  }

  initRecord(chars: SingleCharacter[]) {
    this.chars = chars.map((val, idx) => {
      return { char: val, status: idx === 0 ? 1 : 0 };
    });
  }

  snapshot(): string {
    return this.chars
      .filter(({ status }) => status === 1)
      .map(({ char }) => char)
      .join("");
  }

  hasNext(): boolean {
    return this.chars.length > 1;
  }

  private getLastActiveCharIndex(): number {
    return this.chars.reduce(
      (acc, char, idx) => (char.status === 1 ? idx : acc),
      -1
    );
  }
  private getLastInactiveSequence() {
    let end = -1;
    for (let i = this.chars.length - 1; i >= 0; i--) {
      if (this.chars[i].status === 0) {
        end = i;
        break;
      }
    }
    if (end === -1) {
      return { start: -1, end: -1 }; // No inactive sequence found
    }
    let start = end;
    while (start > 0 && this.chars[start - 1].status === 0) {
      start--;
    }
    return { start, end };
  }

  private setStatusAtIndex(index: number, status: 1 | 0) {
    if (index >= 0 && index < this.chars.length) {
      this.chars[index].status = status;
    } else {
      throw new Error("Index out of bounds ");
    }
  }

  incrementRecord() {
    const lastActivated = this.getLastActiveCharIndex();
    const lastInactive = this.getLastInactiveSequence();
    if (lastActivated !== this.chars.length - 1) {
      // There remain some char to activate, ex: 'abc' => 'abcd'
      this.setStatusAtIndex(lastActivated + 1, 1);
    } else if (lastInactive.end !== this.chars.length - 2) {
      // desactivate the before-last char, ex: 'abcd' => 'ab_d'
      this.setStatusAtIndex(this.chars.length - 2, 0);
    } else if (lastInactive.start > 1) {
      // move backward the lastInactive.end and reinit all subsequent ones 'ab_d' => 'a_c_'
      this.setStatusAtIndex(lastInactive.start - 1, 0);
      for (let idx = lastInactive.start; idx < this.chars.length; idx++) {
        this.setStatusAtIndex(idx, 0);
      }
      this.setStatusAtIndex(lastInactive.start, 1);
    } else {
      // remove the first character. Then restart same process from start..
      this.chars.shift();
      const newChars = this.chars.map(({ char }) => char);
      this.initRecord(newChars);
    }
  }
}
