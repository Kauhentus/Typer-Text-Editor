module.exports = function text_to_lines(globals, preferences, chars_per_line){
    let inital_text_lines = [];
    let line_lengths = [];

    // first obtain all "true" lines
    globals.text.split('\n').forEach(input_line => {
        // append space to end for word wrapping to work
        let raw_line = `${input_line}\xa0`, counter = 0;
        if(raw_line.length > chars_per_line){ 
            // split long string into smaller strings
            while(counter < raw_line.length){
                if(preferences.text_break_by_word){
                    let chars_for_this_line = chars_per_line, force_break = false;
                    // find first previous space
                    while(raw_line.slice(counter + chars_for_this_line - 1, counter + chars_for_this_line) != '\xa0'){
                        chars_for_this_line--;
                        if(chars_for_this_line <= 0){
                            force_break = true; // if no space is found, break the work
                            break;
                        }
                    }
                    if(force_break){
                        inital_text_lines.push(raw_line.slice(counter, counter + chars_per_line));
                        line_lengths.push(chars_per_line);
                        counter += chars_per_line;
                    } else {
                        inital_text_lines.push(raw_line.slice(counter, counter + chars_for_this_line));
                        line_lengths.push(chars_for_this_line);
                        counter += chars_for_this_line;
                    }
                } else {
                    // break words, just slice the string up
                    inital_text_lines.push(raw_line.slice(counter, counter + chars_per_line));
                    line_lengths.push(chars_per_line);
                    counter += chars_per_line;
                }
            }
        } else {
            inital_text_lines.push(raw_line);
            line_lengths.push(raw_line.length);
        }
    });

    // return an iLine object
    return {
        text: inital_text_lines,
        lengths: line_lengths
    };
}