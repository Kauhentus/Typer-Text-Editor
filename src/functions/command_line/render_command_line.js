module.exports = function render_docker(document, window, globals){
    let docker = document.getElementById('docker');
    let command_line  = docker.children[0];
    let status  = docker.children[1];

    command_line.textContent = `~ ${globals.command_line}`;
    if(globals.command_line_interrupt){
        status.textContent = 'Waiting for command...';
    } else {
        status.textContent = globals.status;
    }
    
}
