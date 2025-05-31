function getbyid(object) {
    return document.getElementById(object) || `Unable to return ${object}`;
}





getbyid("table_title").setAttribute("colspan", "10");
getbyid("title_char_class").setAttribute("colspan", "10");