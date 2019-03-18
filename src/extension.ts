import * as vscode from 'vscode';

function sortEntries() {
	const doc = vscode.window.activeTextEditor!.document;

	if (doc) {
		let entries: { [key: string] : string; } = {};
		let output_text = "";
		let input_text = doc.getText() + "\n\n";

		let list_entries = input_text.toString().split("@").slice(1);
		let list_keys: string[] = new Array(list_entries.length);

		for (let i = 0; i < list_entries.length; i++) {
			let entry = list_entries[i];
			let key = entry.slice(entry.indexOf("{")+1, entry.indexOf(","));

			entries[key] = entry;
			list_keys[i] = key;
		}

		list_keys.sort();

		for (let i = 0; i < list_keys.length; i++) {
			output_text += "@" + entries[list_keys[i]];
		}

		var edit = new vscode.WorkspaceEdit();
		edit.replace(doc.uri, new vscode.Range(0,0, doc.lineCount, doc.eol), output_text.toString());
		vscode.workspace.applyEdit(edit);
	}
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) 
{
	let disposable = vscode.commands.registerCommand('extension.biborganizer', () => {
		sortEntries();

		vscode.window.showInformationMessage('Sorting By Key in Ascending Order');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
