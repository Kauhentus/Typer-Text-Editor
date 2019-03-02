module.exports = function handle_cursor(inital_text_lines, globals){
    let lines_with_cursor = inital_text_lines.text;
    let counter = 0, previous_sum = 0;
    let cursor_line_index = -1;

    // create iTextCursor object
    return {
        text: lines_with_cursor.map((line, i) => {
            counter += inital_text_lines.lengths[i];

            // if cursor is in current line
            if(counter - inital_text_lines.lengths[i] <= globals.cursor_pos && globals.cursor_pos < counter){
                let temp = previous_sum;
                previous_sum += inital_text_lines.lengths[i];
                cursor_line_index = i;
                // add cursor
                return `${line.slice(0, globals.cursor_pos - temp)}|${line.slice(globals.cursor_pos - temp + 1)}`
            } else {
                previous_sum += inital_text_lines.lengths[i];
                return line;
            }
        }),
        cursor_line: cursor_line_index
    }
}