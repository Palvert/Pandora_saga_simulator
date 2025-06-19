function getbyid(object) {
    return document.getElementById(object) || `Unable to return ${object}`;
}



function resize_sbar(direction, points_to_chng) {
    let sbar = getbyid("sbar_slash");
    let sbar_width = parseFloat(sbar.style.width);

    let initial_width = 0;
    let max_width     = 200;
    let one_point_width = max_width / 90;

    // increase
    if(points_to_chng == "one" && direction) {
        sbar.style.width = `${Math.min(sbar_width + (one_point_width * 1), 250)}px`;  
    }
    if(points_to_chng == "ten" && direction) {
        sbar.style.width = `${Math.min(sbar_width + (one_point_width * 10), 250)}px`; 
    }
    if(points_to_chng == "all" && direction) {
        sbar.style.width = `${max_width}px`;
    }

    // decrease
    if(points_to_chng == "one" && !direction) {
        sbar.style.width = `${Math.max(sbar_width - (one_point_width * 1), 0)}px`;  
    }
    if(points_to_chng == "ten" && !direction) {
        sbar.style.width = `${Math.max(sbar_width - (one_point_width * 10), 0)}px`;
    }
    if(points_to_chng == "all" && !direction) {
        sbar.style.width = "0px";
    }

    // limit the bar width
    if (parseFloat(sbar.style.width) > max_width) {
        sbar.style.width = `${max_width}px`;
    }

    if (parseFloat(sbar.style.width) < 0) {
        sbar.style.width = "0px";
    }
}


getbyid("table_title").setAttribute("colspan", "10");
getbyid("title_char_class").setAttribute("colspan", "10");