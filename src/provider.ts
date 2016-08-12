import { CompletionItemProvider, TextDocument, Position, CompletionItem, workspace } from 'vscode';
import { PathCompletionItem } from './completion-item';

export function getTextBetweenQuotes(text: string, position: number) {
    const textToPosition = text.substring(0, position);
    const quoatationPosition = Math.max(textToPosition.lastIndexOf('\"'), textToPosition.lastIndexOf('\''));
    return quoatationPosition != -1 ? textToPosition.substring(quoatationPosition + 1, textToPosition.length) : undefined;
}

export class EasyImportProvider implements CompletionItemProvider {
    provideCompletionItems(document: TextDocument, position: Position): Thenable<CompletionItem[]> {
        const lineText = document.lineAt(position.line).text;
        const str = getTextBetweenQuotes(lineText, position.character);
        return workspace.findFiles('**/*.{ts,tsx}', '{**/node_modules/**,**/*.d.ts}').then((uris) => {
            if (!uris) {
                return null;
            }

            return uris.map((uri) => new PathCompletionItem(uri, str));
        });
    }
}
