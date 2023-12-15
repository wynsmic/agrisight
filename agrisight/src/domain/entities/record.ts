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

  getLastActivatedCharIndex(): number {
    return this.chars.reduce(
      (acc, char, idx) => (char.status === 1 ? idx : acc),
      -1
    );
  }
  getLastInactiveSequence() {
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

  setStatusAtIndex(index: number, status: 1 | 0) {
    if (index >= 0 && index < this.chars.length) {
      this.chars[index].status = status;
    } else {
      console.error("Index out of bounds");
    }
  }

  incrementRecord() {
    const lastActivated = this.getLastActivatedCharIndex();
    const lastInactive = this.getLastInactiveSequence();
    if (lastActivated !== this.chars.length - 1) {
      // Remains some char to activate, ex: 'abc' => 'abcd'
      this.setStatusAtIndex(lastActivated + 1, 1);
    } else if (lastInactive.end !== this.chars.length - 2) {
      // desactivate the before-last char, ex: 'abcd' => 'ab_d'
      this.setStatusAtIndex(this.chars.length - 2, 0);
    } else if (lastInactive.start > 1) {
      // move backward the lastInactive.end and reactivate all subsequent ones 'ab_d' => 'a_cd'
      this.setStatusAtIndex(lastInactive.start - 1, 0);
      for (let idx = lastInactive.start; idx < this.chars.length; idx++) {
        this.setStatusAtIndex(idx, 1);
      }
    } else {
      // remove the first character. Then desactivate all characters axecpt the new first one
      this.chars.shift();
      this.chars = this.chars.map((c, idx) => {
        return { ...c, status: idx === 0 ? 1 : 0 };
      });
    }
  }
}
