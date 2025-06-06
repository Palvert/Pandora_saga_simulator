function getbyid(object) {
    return document.getElementById(object) || `Unable to return ${object}`;
}



function resize_sbar(direction) {
    console.log("pressed!");
    let sbar = getbyid("sbar_slash");
    
    initial_width = 250;
    if (direction) {
        console.log("-decr");
        sbar.style.width = `${sbar.style.width - 1}%`;
    } else {
        console.log("+add");
        sbar.style.width = `${Math.max(parseFloat(sbar.style.width)/90, 0)}%`;
    }
}


getbyid("table_title").setAttribute("colspan", "10");
getbyid("title_char_class").setAttribute("colspan", "10");