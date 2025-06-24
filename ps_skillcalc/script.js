function getbyid(object) {
    return document.getElementById(object) || `Unable to return ${object}`;
}

const SBAR_MAX_WIDTH  = 200;
const SBAR_INIT_WIDTH = 0;

function _get_select_class() {
    return getbyid("char_classes").value;
}

function select_class() {
    switch (_get_select_clalss()) {
        case("warrior"): break;
        case("gladiator"): break;
        case("juggernaut"): break;
        case("warrior"): break;
        case("warrior"): break;
        case("warrior"): break;
        case("warrior"): break;

        case("warrior"): break;
        case("warrior"): break;
        case("warrior"): break;
        case("warrior"): break;
        case("warrior"): break;
        case("warrior"): break;
        case("warrior"): break;

        case("warrior"): break;
        case("warrior"): break;
        case("warrior"): break;
        case("warrior"): break;
        case("warrior"): break;
        case("warrior"): break;
        case("warrior"): break;

        case("warrior"): break;
        case("warrior"): break;
        case("warrior"): break;
        case("warrior"): break;
        case("warrior"): break;
        case("warrior"): break;
        case("warrior"): break;
    }
}

function resize_sbar(sbar_name, direction, points_to_chng) {
    let sbar = getbyid(sbar_name);
    let sbar_width = parseFloat(sbar.style.width);

    let one_point_width = SBAR_MAX_WIDTH / 90;

    // increase
    if(points_to_chng == "one" && direction) {
        sbar.style.width = `${Math.min(sbar_width + (one_point_width * 1), 250)}px`;  
    }
    if(points_to_chng == "ten" && direction) {
        sbar.style.width = `${Math.min(sbar_width + (one_point_width * 10), 250)}px`; 
    }
    if(points_to_chng == "all" && direction) {
        sbar.style.width = `${SBAR_MAX_WIDTH}px`;
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
    if (parseFloat(sbar.style.width) > SBAR_MAX_WIDTH) {
        sbar.style.width = `${SBAR_MAX_WIDTH}px`;
    }

    if (parseFloat(sbar.style.width) < 0) {
        sbar.style.width = "0px";
    }
}


getbyid("table_title").setAttribute("colspan", "10");
getbyid("title_char_class").setAttribute("colspan", "10");