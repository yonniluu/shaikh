'use strict';

import * as vscode from 'vscode';
import * as child_process from 'child_process';
import { window, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument, TextEditor } from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let checkJRE = false;
    let init_disposable = commands.registerCommand('start', () => {
        // window.showInformationMessage('This is Voice Command! activated');
        var spawn = child_process.spawn('java', ['-version']).on('error',
            err => { window.showInformationMessage('Please install JRE in order to run this extension!!!') })
        spawn.stderr.on('data', (data: Buffer) => {
            if (data.indexOf('version') >= 0)
                checkJRE = true
            spawn.kill()
        });
        spawn.on('exit', (code, signal) => {
            if (checkJRE == true) {
                if (process.platform === 'win32') {
                    let vl = new VoiceListener(context, 'other');
                    vl.run();
                }
                else {
                    let vl = new VoiceListener(context, 'other');
                    vl.run();
                }
            }
            else
                window.showInformationMessage('Please install JRE in order to run this extension!!!');
        });
    });
    context.subscriptions.push(init_disposable);
}

class VoiceListener {

    private sysType: String;
    private execFile;
    private child;
    private sttbar: SttBarItem;

    constructor(context: vscode.ExtensionContext, type: String) {
        this.sysType = type;
        this.execFile = child_process.spawn;
        this.sttbar = new SttBarItem();
        let disposable1 = commands.registerCommand('toggle', () => {
            if (this.sttbar.getSttText() == 'on') {
                this.sttbar.off();
                this.killed();
            }
            else {
                this.sttbar.on();
                this.run();
            }
        });
        let disposable2 = commands.registerCommand('stop_listen', () => {
            this.sttbar.off();
            this.killed();
        });
        context.subscriptions.push(disposable1);
        context.subscriptions.push(disposable2);
        this.sttbar.setSttCmd('toggle');
    }
    run() {
        if (this.sysType == 'win')
            // console.log(this.child = this.execFile(__dirname + '/WordsMatching.exe'));
            this.child = this.execFile(__dirname + '/WordsMatching.exe');
        else
            this.child = this.execFile('java', ['-jar', __dirname + '/WordsListener.jar'])
                .on('error', err => { window.showInformationMessage('Something went wrong!!! Sorry 😢') })
        this.child.stdout.on('data', data => {
            window.setStatusBarMessage(data.toString(), 1000);
            let centralCmd = new commandsClass();
            // console.log(data.toString());
            centralCmd.runCmd(data.toString().trim());
        });

        this.child.stderr.on('data', data => {
            console.log(data.toString());
        });
    }
    killed() {
        this.child.kill();
    }
}

class SttBarItem {

    private statusBarItem: StatusBarItem;
    private stt: string;

    constructor() {
        this.statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left, 10);
        this.on();
        this.stt = 'on';
    }
    on() {
        this.statusBarItem.text = '💬 listening';
        this.statusBarItem.show();
        this.stt = 'on';
    }
    off() {
        this.statusBarItem.text = '✖️️ Stop';
        this.statusBarItem.show();
        this.stt = 'off';
    }

    getSttText() {
        return this.stt;
    }
    setSttCmd(cmd) {
        this.statusBarItem.command = cmd;
    }
}

class commandsClass {
    runCmd(theCmd: string) {
        switch (theCmd) {
            case 'copy':
                commands.executeCommand('editor.action.clipboardCopyAction');
                break;
            case 'cut':
                commands.executeCommand('editor.action.clipboardCutAction');
                break;
            case 'delete':
                commands.executeCommand('deleteLeft')
                break;
            case 'find':
                commands.executeCommand('actions.find');
                break;
            case 'format': // using this to insert text
                commands.executeCommand('extension.addText');
                break;
            case 'go to line':
                commands.executeCommand('workbench.action.gotoLine');
                break;
            case 'paste':
                commands.executeCommand('editor.action.clipboardPasteAction');
                break;
            case 'quick open': // repurpose this one too
                commands.executeCommand('workbench.action.quickOpen');
                break
            case 'redo':
                commands.executeCommand('redo');
                break;
            case 'search':
                commands.executeCommand('workbench.view.search');
                break;
            case 'select all':
                commands.executeCommand('editor.action.selectAll');
                break;
            case 'stop listen':
                commands.executeCommand('stop_listen');
                break;
            case 'undo':
                commands.executeCommand('undo');
                break;
            case 'write for loop':
                commands.executeCommand('extension.writeForLoop');
                break;
            case 'change size to n':
                commands.executeCommand('extension.changeSizeToN');
                break;    
            case 'var count equals zero':
                commands.executeCommand('extension.varCountEqualsZero');
                break;    
            case 'add marvel character':
                commands.executeCommand('extension.addMarvelCharacter');
                break;    
            case 'write return zero':
                commands.executeCommand('extension.writeReturnZero');
                break;        
        }
    }
}


var codeToWrite = "variable";
var var_name = "doink";
var var_value = "bboinkkkkk";
var coordinates = {
    start: {
     line: 1,
     char: 0
    },
    end: {
     line: 2,
     char: 0
    }
 };

let writeForLoop = vscode.commands.registerCommand('extension.writeForLoop', function() {
    var vsEditor = vscode.window.activeTextEditor;
    var textToAdd = "for (var i = 0; i < size; i++) {}\n";
    applyEdit(vsEditor, coordinates, textToAdd);
});

let changeSizeToN = vscode.commands.registerCommand('extension.changeSizeToN', function() {
    var vsEditor = vscode.window.activeTextEditor;
    var textToAdd = "changed the size to N!!!!!";
    applyEdit(vsEditor, coordinates, textToAdd);
});

let varCountEqualsZero = vscode.commands.registerCommand('extension.varCountEqualsZero', function() {
    var vsEditor = vscode.window.activeTextEditor;
    var textToAdd = "var count = 0;\n";
    applyEdit(vsEditor, coordinates, textToAdd);
});

let addMarvelCharacter = vscode.commands.registerCommand('extension.addMarvelCharacter', function() {
    var vsEditor = vscode.window.activeTextEditor;
    var textToAdd = "superman or smth";
    applyEdit(vsEditor, coordinates, textToAdd);
});

let writeReturnZero = vscode.commands.registerCommand('extension.writeReturnZero', function() {
    var vsEditor = vscode.window.activeTextEditor;
    var textToAdd = "return 0;\n";
    applyEdit(vsEditor, coordinates, textToAdd);
});

let testFunction = vscode.commands.registerCommand('extension.addText', function() {
    var vsEditor = vscode.window.activeTextEditor;
    var textToAdd = "";
    //if (codeToWrite == "for loop") {
      //  textToAdd = "for (int " + var_name + "=" + start_number "; " + var_name + sign + var_termination + "; " + var_name + var_increment + "){ }";
/*} else */if (codeToWrite == "variable") {
        textToAdd += "var " + var_name + " = " + var_value + ";";
    } else if (codeToWrite == "return") {
        textToAdd += "return " + var_name + ";";
    } else {
        textToAdd += "BDFGOBDFSGSJDHFGBJDS!!!!!!!!";
    }
    applyEdit(vsEditor, coordinates, textToAdd);
});

exports.activate = activate;

function applyEdit (vsEditor, coords, content){
    var vsDocument = getDocument(vsEditor);
    var edit = setEditFactory(vsDocument._uri, coords, content);
    vscode.workspace.applyEdit(edit);
    coords.start.line+=1;
  //  coords.start.char++;
    coords.end.line+=1;
 //   coords.end.char++;
}
function getDocument (vsEditor) {
    return typeof vsEditor._documentData !== 'undefined' ? vsEditor._documentData : vsEditor._document;
}

function positionFactory(line, char) {
    return new vscode.Position(line, char);
}

function rangeFactory(start, end) {
    return new vscode.Range(start, end);
}

function textEditFactory(range, content) {
    return new vscode.TextEdit(range, content);
}

function editFactory (coords, content){
    var start = positionFactory(coords.start.line, coords.start.char);
    var end = positionFactory(coords.end.line, coords.end.char);
    var range = rangeFactory(start, end);
    
    return textEditFactory(range, content);
}

function workspaceEditFactory() {
    return new vscode.WorkspaceEdit();
}

function setEditFactory(uri, coords, content) {
    var workspaceEdit = workspaceEditFactory();
    var edit = editFactory(coords, content);

    workspaceEdit.set(uri, [edit]);
    return workspaceEdit;
}


// this method is called when your extension is deactivated
export function deactivate() {
}