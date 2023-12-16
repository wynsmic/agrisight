# Agrisight test

This project is focused on developing a utility to generate a list of strings based on given prefixes. The primary functionality of this application is to take an array of single-character prefixes and generate all possible combinations while maintaining the order of the characters as they appear in the input array.

## Example embeded in mains.ts file

For the user convinience, the input prefixes `['c', 'n', 's']` have been preset in the main.ts file, the application will generate the following list of strings in this specific order:
"[
'c',
'cn',
'cns',
'cs',
'n',
'ns',
's'
]"

## limitation

You may easily increase the input prefixes length by modifying the `mains.ts`. By safety due to the complexity of the calculation, any input array above 16 characters will throw an error. This constraint is in place to prevent excessive computational load and potential performance issues.

## Architecture

This project is structured following the Hexagonal Architecture principles. The core logic resides in the domain layer.
A sligth cli-adapter has been added to interract.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/wynsmic/agrisight.git
```

2. Navigate to the project directory:

```bash
cd agrisight
```

3. Install the necessary packages:

```bash
npm install
```

## Available scripts

1. Tests

```bash
npm run test
```

2. Linting

```bash
npm run lint
```

3. Run the use case of interest:

```bash
npm run start
```

## Built With

- Node.js - The JavaScript runtime
- TypeScript - The programming language used
- Jest - The testing framework
- ESLint - The linting utility
