'use strict';
import * as vscode from 'vscode';
import { EasyImportProvider } from './provider';

export function activate(context: vscode.ExtensionContext) {
    const provider = new EasyImportProvider();
    const disposable = vscode.languages.registerCompletionItemProvider('*', provider, '\'', '\"');
    context.subscriptions.push(disposable);
}

export function deactivate() {
}