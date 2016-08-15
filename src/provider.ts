import * as vscode from 'vscode';
import { PathCompletionItem } from './completion-item';

const INCLUDE_GLOB = '**/*.{ts,tsx}';
const EXCLUDE_GLOB = '{**/node_modules/**,**/*.d.ts}';

function getTextBetweenQuotes(text: string, position: number) {
    const textToPosition = text.substring(0, position);
    const quoatationPosition = Math.max(textToPosition.lastIndexOf('\"'), textToPosition.lastIndexOf('\''));
    return quoatationPosition != -1 ? textToPosition.substring(quoatationPosition + 1, textToPosition.length) : undefined;
}

export class EasyImportProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(
            document: vscode.TextDocument,
            position: vscode.Position): Thenable<vscode.CompletionItem[]> {
        const lineText = document.lineAt(position.line).text;
        const str = getTextBetweenQuotes(lineText, position.character);

        if (!str || str.indexOf('/') > -1) {
            return Promise.resolve(null);
        }

        return vscode.workspace.findFiles(INCLUDE_GLOB, EXCLUDE_GLOB).then((uris) => {
            if (!uris) {
                return null;
            }

            return uris.map((uri) => {
                return new PathCompletionItem(uri, str, document.fileName, vscode.workspace.rootPath);
            });
        });
    }
}
