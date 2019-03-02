const command_line_key_events = require('./command_line/command_line_key_events');
const editor_key_events = require('./editor/editor_key_events');

module.exports = function handle_key_events(e, globals){
    if(globals.command_line_interrupt){
        command_line_key_events(globals, e);
    } else {
        editor_key_events(globals, e);
    }
}