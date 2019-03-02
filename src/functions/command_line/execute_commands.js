const fs = require('fs');
const render_docker = require('../command_line/render_command_line');

module.exports = function execute_commands(globals){
    const command = globals.command_line;
    let args = command.replace(/\xa0+/g, '\xa0').split('\xa0');

    if(args.length != 2){
        globals.status = 'Unknown command';
        render_docker(document, window, globals);
        setTimeout(() => {
            globals.status = ':D';
            render_docker(document, window, globals);
        }, 3000);
    } else {
        switch(args[0]){
            case 's':
            case 'save':
            case 'sa':
            case 'saveas':
                globals.file_name = args[1];
                fs.writeFile(`${globals.file_path}/${args[1]}.txt`, globals.text, err => {
                    if(err) {
                        globals.status = 'Save error';
                    } else {
                        globals.status = 'File saved successfully to desktop'
                    }
                    render_docker(document, window, globals);
                    setTimeout(() => {
                        globals.status = ':D';
                        render_docker(document, window, globals);
                    }, 3000);
                });
                break;
            default :
                globals.status = 'Unknown command';
                render_docker(document, window, globals);
                setTimeout(() => {
                    globals.status = ':D';
                    render_docker(document, window, globals);
                }, 3000);
        }
    }
}