import * as vscode from 'vscode';
import * as path from 'path';

function convertToSlash(fsPath: string): string {
    return fsPath.split(path.sep).join('/');
}

function prependDotSlash(fsPath: string): string {
    return path.basename(fsPath) === fsPath ? `./${fsPath}` : fsPath;
}

function removeExtension(fsPath: string): string {
    return path.join(path.dirname(fsPath), path.basename(fsPath, path.extname(fsPath)));
}

export class PathCompletionItem extends vscode.CompletionItem {
    constructor(uri: vscode.Uri, search: string, editorFilename: string, projectRoot: string) {
        super(uri.fsPath);
        const basename = path.basename(uri.fsPath);
        const dirRelativeToProjectRoot = convertToSlash(
            path.dirname(path.relative(projectRoot, uri.fsPath))
        );
        const relativeToProjectRoot = `${dirRelativeToProjectRoot}/${basename}`;
        const relativeToEditorFile = prependDotSlash(
            convertToSlash(
                removeExtension(
                    path.relative(path.dirname(editorFilename), uri.fsPath)
                )
            )
        );

        this.label = relativeToProjectRoot;
        this.sortText = basename.startsWith(search) ? '_' + relativeToProjectRoot : relativeToProjectRoot;
        this.filterText = relativeToProjectRoot.split('/').join(' ');
        this.insertText = relativeToEditorFile;
        this.kind = vscode.CompletionItemKind.File;
    }
}
