const handle_cursor = require('./handle_cursor');

module.exports = function handle_up_down(globals, text_with_cursor, inital_text_lines){
    if(globals.move_up != 0){
        let move_up = globals.move_up;
        globals.move_up = 0;
        if(move_up == -1){ // move down
            if(text_with_cursor.cursor_line != 0){
                const cursor_distance_from_line_start = globals.cursor_pos - text_with_cursor.text.slice(0, text_with_cursor.cursor_line).reduce((a, b) => a + b.length, 0);
                let previous_line_length_offset = text_with_cursor.text[text_with_cursor.cursor_line - 1].length - cursor_distance_from_line_start;
                if(previous_line_length_offset < 0) previous_line_length_offset = 1;
                const total_offset = cursor_distance_from_line_start + previous_line_length_offset;

                globals.cursor_pos -= total_offset;
                return handle_cursor(inital_text_lines, globals);
            } else {
                return null;
            }
        } else {
            if(text_with_cursor.cursor_line < text_with_cursor.text.length - 1){
                const cursor_distance_from_line_end = text_with_cursor.text.slice(0, text_with_cursor.cursor_line + 1).reduce((a, b) => a + b.length, 0) - globals.cursor_pos;
                const cursor_distance_from_line_start = globals.cursor_pos - text_with_cursor.text.slice(0, text_with_cursor.cursor_line).reduce((a, b) => a + b.length, 0);
                
                let next_line_length_offset = cursor_distance_from_line_start;
                if(next_line_length_offset > text_with_cursor.text[text_with_cursor.cursor_line + 1].length) next_line_length_offset = text_with_cursor.text[text_with_cursor.cursor_line + 1].length - 1;
                const total_offset = cursor_distance_from_line_end + next_line_length_offset;

                globals.cursor_pos += total_offset;
                return handle_cursor(inital_text_lines, globals);
            } else {
                return null;
            }
        }
        
    }
}