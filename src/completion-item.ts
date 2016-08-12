import * as vscode from 'vscode';
import * as path from 'path';

export class PathCompletionItem extends vscode.CompletionItem {
    constructor(uri: vscode.Uri, search: string) {
        super(uri.fsPath);
        const basename = path.basename(uri.fsPath);
        this.label = basename;
        this.detail = uri.fsPath;
        this.sortText = basename.indexOf(search) === 0 ? '_' + basename : basename;
        this.filterText = uri.fsPath;
        this.insertText = uri.path;
        this.kind = vscode.CompletionItemKind.File;
    }
}
