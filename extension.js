const CSS_TEMPLATE = require('./templates/componentCSSModule');
const COMPONENT_TEMPLATE = require('./templates/componentFile');
const INDEX_TEMPLATE = require('./templates/componentIndex');
const vscode = require('vscode');

function activate(context) {
	console.log('React Component Generator enabled.');

	let disposable = vscode.commands.registerCommand(
		'react-component-generator.generate',
		uri => {
			vscode.window
				.showInputBox({ prompt: 'Enter component name: ' })
				.then(res => {
					const componentName = res[0].toUpperCase() + res.slice(1);
					const componentPath = `${uri.fsPath}/${componentName}/`;

					createFile(
						componentPath,
						componentName + '.jsx',
						COMPONENT_TEMPLATE(componentName)
					);
					createFile(
						componentPath,
						componentName + '.module.scss',
						CSS_TEMPLATE()
					);
					createFile(
						componentPath,
						'index.js',
						INDEX_TEMPLATE(componentName)
					);
				});
		}
	);

	context.subscriptions.push(disposable);
}

function createFile(path, name, content) {
	const filePath = vscode.Uri.file(path + '/' + name);
	vscode.workspace.fs.writeFile(filePath, new TextEncoder().encode(content));
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
