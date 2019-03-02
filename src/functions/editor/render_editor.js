const get_text_width = require('../get_text_width');
const text_to_lines = require('./text_to_lines');
const handle_cursor = require('./handle_cursor');
const handle_up_down = require('./handle_up_down_movement');

module.exports = function render_editor(document, window, globals) {
    const preferences = globals.preferences;
    const line_count = Math.floor(window.innerHeight * 72 / 96 / preferences.text_font_size / preferences.text_line_spacing) - 2;
    const half_line_count = Math.floor(line_count / 2);
    const chars_per_line = Math.floor(Math.floor(window.innerWidth / get_text_width('a', `${preferences.text_font_size}pt ${preferences.text_font[0]}`))) - 5;

    const inital_text_lines = text_to_lines(globals, preferences, chars_per_line);
    let text_with_cursor = handle_cursor(inital_text_lines, globals);

    // move lines if arrow up/down event occured
    let new_text_lines = handle_up_down(globals, text_with_cursor, inital_text_lines);
    if(new_text_lines != null) text_with_cursor = new_text_lines;
    
    // create displayed lines
    const final_displayed_lines = Array(line_count).fill('').map((x, i) => {
        const desired_index = text_with_cursor.cursor_line  + i - half_line_count;

        if(desired_index < 0 || desired_index >= text_with_cursor.text.length){
            return '\xa0\xa0-'
        } else {
            return `${desired_index + 1}\xa0-\xa0${text_with_cursor.text[desired_index]}`
        }
    });

    // clear all display lines
    let text_lines_element = document.getElementById('lines_container');
    while (text_lines_element.firstChild) {
        text_lines_element.removeChild(text_lines_element.firstChild);
    }

    for(let i = 0; i < line_count; i++){
        let new_line_element = document.createElement("p");
        new_line_element.appendChild(document.createTextNode(final_displayed_lines[i]));
        new_line_element.setAttribute("style", ` 
            margin-top: ${(preferences.text_line_spacing - 1) * preferences.text_font_size}pt;
            margin-bottom: 0%;
            height: ${preferences.text_font_size}pt;`);
        text_lines_element.appendChild(new_line_element); 
    }
    //console.log(document.documentElement)
}