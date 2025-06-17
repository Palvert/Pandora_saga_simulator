function getbyid(object) {
    return document.getElementById(object) || `Unable to return ${object}`;
}



function resize_sbar(direction, points_to_chng) {
    let sbar = getbyid("sbar_slash");
    let sbar_width = parseFloat(sbar.style.width);

    let initial_width = 250;
    let one_point_width = initial_width / 90;

    switch (points_to_chng) {
        // increase
        case("one" && direction): sbar.style.width = `${Math.min(sbar_width + (one_point_width * 1), 250)}px`; break;
        case("ten" && direction): sbar.style.width = `${Math.min(sbar_width + (one_point_width * 10), 250)}px`; break;
        case("all" && direction): sbar.style.width = `${initial_width}px`; break;
        // decrease
        case("one"): sbar.style.width = `${Math.max(sbar_width + (one_point_width * 1), 0)}px`; break;
        case("ten"): sbar.style.width = `${Math.max(sbar_width + (one_point_width * 10), 0)}px`; break;
        case("all"): sbar.style.width = `${0}px`; break;
    }
}


getbyid("table_title").setAttribute("colspan", "10");
getbyid("title_char_class").setAttribute("colspan", "10");