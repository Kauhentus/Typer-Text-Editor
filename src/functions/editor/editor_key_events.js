const render_editor = require('./render_editor');
const fs = require('fs');

module.exports = function editor_key_events(globals, e){
    if(!globals.command_line_interrupt){
        if(e.key.length == 1){
            let letter = e.key;
            if(letter == ' ') letter = '\xa0';
            
            if(globals.command_down){
                switch(letter){
                    // Enter commmand line mode
                    case ' ':
                    case 't':
                    case '/':
                        globals.command_line_interrupt = true;
                        break;
                    // save file
                    case 's':
                        fs.writeFile(`${globals.file_path}/${globals.file_name}.txt`, globals.text, err => {
                            if(err) globals.status = 'Save Error';
                            render_editor(document, window, globals);
                            setTimeout(() => {
                                globals.status = ':D';
                            }, 3000);
                        });
                        break;
                }
            } else {
                // handle typing within the editor
                globals.text = globals.text.slice(0, globals.cursor_pos) + letter + globals.text.slice(globals.cursor_pos);
                globals.cursor_pos++;
            }
        } else {
            // handle special keys within the editor
            switch(e.key){
                case 'Enter':
                    globals.text = globals.text.slice(0, globals.cursor_pos) + '\n' + globals.text.slice(globals.cursor_pos);
                    globals.cursor_pos++;
                    break;
                case 'Backspace':
                    if(globals.text.length > 0){
                        globals.text = globals.text.slice(0, globals.cursor_pos - 1) + globals.text.slice(globals.cursor_pos);
                        globals.cursor_pos--;
                    }
                    break;
                case 'Control':
                case 'Meta':
                    globals.command_down = true;
                    break;
                case 'Delete':
                    if(globals.cursor_pos < globals.text.length){
                        globals.text = globals.text.slice(0, globals.cursor_pos + 1) + globals.text.slice(globals.cursor_pos + 2);
                    }
                    break;
                case 'ArrowLeft':
                    if(globals.cursor_pos > 0) globals.cursor_pos--;
                    break;
                case 'ArrowRight':
                    if(globals.cursor_pos < globals.text.length) globals.cursor_pos++;
                    break;
                case 'ArrowUp':
                    globals.move_up = -1;
                    break;
                case 'ArrowDown':
                    globals.move_up = 1;
                    break;
            };
        }
    }
}