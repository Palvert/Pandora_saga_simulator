function getbyid(object) {
    return document.getElementById(object) || `Unable to return ${object}`;
}


function resize_sbar(direction) {
    let sbar = getbyid("sbar_slash");
    initial_width = 250;
    if (direction) {
        sbar.style.width += initial_width / 100 * 1;
    } else {
        sbar.style.width -= initial_width / 100 * 1;
    }
}


getbyid("table_title").setAttribute("colspan", "10");
getbyid("title_char_class").setAttribute("colspan", "10");