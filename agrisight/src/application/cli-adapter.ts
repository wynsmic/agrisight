import { SingleCharacter } from "../domain/entities/record";
import { TextGenerator } from "../domain/services/text-generator";


export class CLIAdapter {
    private textGenerator: TextGenerator;

    constructor(textGenerator: TextGenerator) {
        this.textGenerator = textGenerator;
    }

    handleUserInput(input: SingleCharacter) {
        const chars: SingleCharacter[] = input.split('') as SingleCharacter[];
        const prefixes = this.textGenerator.getAllPrefixesFromText(chars);
        console.log(prefixes);
    }
}
