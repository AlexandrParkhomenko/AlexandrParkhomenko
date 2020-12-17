// Plugin for Visual Studio Code. 
// This is an experiment.

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

server_request = function(link){
  vscode.window.showInformationMessage("start");
  const axios = require('axios');
  axios.get(link)
  .then(res => {
    vscode.window.showInformationMessage(res.data);
    console.log(res.headers['content-type']);
    console.log(res.data);
  })
  .catch(err => {
    vscode.window.showInformationMessage(err);
    console.log(err);
  });
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld-minimal-sample" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Get the active text editor
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			// Get the word within the selection
			const word = document.getText(selection);
			const reversed = word.split('').reverse().join('');
			editor.edit(editBuilder => {
				editBuilder.replace(selection, reversed);
			});
		}
		server_request("https://translate.google.ru/translate_a/t?client=x&text=hello%20cool%20world&hl=en&sl=en&tl=ru");

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

// eslint-disable-next-line no-undef
module.exports = {
	activate,
	deactivate
}
