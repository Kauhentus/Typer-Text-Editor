module.exports = function apply_preferences(document, globals){
    const preferences = globals.preferences;
    document.body.setAttribute('style', `
        background-color: rgb(${preferences.color_background.toString()});
        color: rgb(${preferences.color_text.toString()});

        font-family: ${preferences.text_font[0]}, ${preferences.text_font[1]}, ${preferences.text_font[2]};
        font-size: ${preferences.text_font_size}pt;
    `);
}