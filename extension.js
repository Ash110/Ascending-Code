// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ascending-code" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('ascending-code.arrangeCode', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		try {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showInformationMessage('No selection detected. \nSelect some text before running the command.');
				return;
			}
			var text = editor.document.getText(editor.selection);
			if(text===""){
				vscode.window.showInformationMessage('No selection detected. \nSelect some text before running the command.');
				return;
			}
			text = text.split(/\r?\n/);
			text.sort(function (a, b) {
				// ASC  -> a.length - b.length
				return a.length - b.length;
			});
			text = text.join("\r\n");
			editor.edit((builder) => {
				builder.replace(editor.selection, text);
			}).then(success => {
				var postion = editor.selection.end;
				editor.selection = new vscode.Selection(postion, postion);
			});
		} catch (err) {
			console.log(err);
		}
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
