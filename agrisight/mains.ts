import { CLIAdapter } from "./src/application/cli-adapter";
import { TextGenerator } from "./src/domain/services/text-generator";


const textGenerator = new TextGenerator();
const cliAdapter = new CLIAdapter(textGenerator);

// Example user input
const userInput = "cns";

cliAdapter.handleUserInput(userInput);
