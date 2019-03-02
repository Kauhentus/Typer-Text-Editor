
# Typer-Text-Editor
A minimalist text editor written with Electron.js

Release 1.0.0 files: https://github.com/The3DSquare/Typer-Text-Editor/releases/tag/1.0.0

This text editor is highly minimalist with barebones structure. One can:
- Write text
- Delete text
- Move with the arrow keys
- Save text to desktop

And that's it! No mouse functionality is supported for simplicity. 

## How to use Typer
Begin typing within the editor to start. To run commands, either run `Ctrl /` or `Ctrl t` to open the command line. To close the command line, press `Esc`. To enter a command, press `Enter`. The status message will alert the user to various activities of the editor.

Only one command is currently supported:
`save <filename>`
This save command will save the file as `<filename>.txt` to the computer's desktop.

## Why Typer?
Typer is meant to be as simple as possible while being useful. The source code is structured in a way to easily allow one to write their own "plugins" or "add-ons". One's imagination is the limit!

## How do I add to Typer?
- To add more commands, one can add to `./src/functions/command_line/execute_commands.js`. 
- More preferences can be added to under `./src/preferences.json` and applied in `./src/functions/apply_preferences.js` 
- The rendering of the lines of the editor takes place in `./src/functions/editor/render_editor.js`

## How do I package Typer into an Application?
1) Typer is written in Electron.js and is packaged with electron-packager (these libraries can be installed with `npm`
2) Navigate to the `src` folder and run one of the following commands (choose platform):
- `electron-packager ./ --icon=typer.icns --platform=darwin`
- `electron-packager ./ --icon=typer.ico --platform=win32`
3) Now, a folder containing Typer and all of its dependencies will appear in the `src` folder. These steps were how the release 1.0.0 files(https://github.com/The3DSquare/Typer-Text-Editor/releases/tag/1.0.0) were packaged.
