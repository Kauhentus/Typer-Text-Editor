const fs = require('fs');
const render_editor = require('./functions/editor/render_editor.js');
const render_docker = require('./functions/command_line/render_command_line');

const apply_preferences = require('./functions/apply_preferences');
const handle_key_events = require('./functions/handle_key_events');

let globals = {
    preferences : JSON.parse(fs.readFileSync(`${__dirname}/preferences.json`, 'utf8')),

    command_line_interrupt : false,
    command_line : '',
    status : ':)',

    text : '',
    command_down : false,
    cursor_pos : 0,
    command_cursor_pos : 0,
    move_up : 0,

    file_name : `untitled-${new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' +  new Date().getDate()}`,
    file_path : require('path').join(require('os').homedir(), 'Desktop')
}

function Init(){
    window.addEventListener('keydown', (e) => {
        handle_key_events(e, globals);

        Render();
    });
    
    window.addEventListener('keyup', (e) => {
        if(e.key == 'Control' || e.key == 'Meta'){
            globals.command_down = false;
        }
    });
    
    window.addEventListener('resize', () => {
        Render();
    });
}

function Render() {
    render_docker(document, window, globals);
    render_editor(document, window, globals);
}

apply_preferences(document, globals);
Render();
Init();