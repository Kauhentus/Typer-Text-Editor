const execute_commands = require('./execute_commands');

module.exports = function command_line_key_events(globals, e){
    if(e.key.length == 1){
        // typing in the command line
        let letter = e.key;
        if(letter == ' ') letter = '\xa0';
        
        globals.command_line = globals.command_line.slice(0, globals.command_cursor_pos) + letter + globals.command_line.slice(globals.command_cursor_pos);
        globals.command_cursor_pos++
    } else {
        switch(e.key){
            case 'Enter':
                // execute command
                execute_commands(globals);
                
                globals.command_line_interrupt = false;
                globals.command_line = '';
                break;
            case 'Escape':
                globals.command_line_interrupt = false;
                globals.command_line = '';
                break;
            case 'Backspace':
                globals.command_line = globals.command_line.slice(0, globals.command_cursor_pos - 1) + globals.command_line.slice(globals.command_cursor_pos);
                globals.command_cursor_pos--;
                break;
        }
    }
}