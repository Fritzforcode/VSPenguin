// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vspenguin" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('vspenguin.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from VSPenguin!');
	});

	context.subscriptions.push(disposable);

	// Register a CompletionItemProvider for JSON files
	const completionProvider = vscode.languages.registerCompletionItemProvider(
		{ language: 'json', scheme: 'file' }, // Target JSON files
		{
			provideCompletionItems(document, position, token, context) {
				// Example: Add a JSON key suggestion
				const keySuggestion = new vscode.CompletionItem(
					'"exampleKey":',
					vscode.CompletionItemKind.Property
				);
				keySuggestion.insertText = new vscode.SnippetString('"exampleKey": "$1"');
				keySuggestion.detail = 'An example key for JSON';
				keySuggestion.documentation = 'This adds an example key to the JSON object.';

				// Example: Add a nested JSON object suggestion
				const nestedObjectSuggestion = new vscode.CompletionItem(
					'"nestedObject":',
					vscode.CompletionItemKind.Property
				);
				nestedObjectSuggestion.insertText = new vscode.SnippetString(
					`"nestedObject": {\n\t"$1": "$2"\n}`
				);
				nestedObjectSuggestion.detail = 'A nested JSON object';
				nestedObjectSuggestion.documentation =
					'This adds a nested JSON object structure.';

				// Return both suggestions
				return [keySuggestion, nestedObjectSuggestion];
			},
		},
		'"' // Trigger character for autocompletion (suggestions appear after typing a quote)
	);

	context.subscriptions.push(completionProvider);
}

// This method is called when your extension is deactivated
export function deactivate() {}
