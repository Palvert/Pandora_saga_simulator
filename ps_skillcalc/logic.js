const SBAR_MAX_WIDTH  = 200;
const SBAR_INIT_WIDTH = 0;
const MAX_ICONS_IN_ROW = 10;

let active_skill_values = {
    melee: 0,
    // -------------
    slash: 0,
    thrust: 0,
    cleave: 0,
    bash: 0,
    defend: 0,
 
    finesse: 0,
    // -------------
    ranged: 0,
    alchemy: 0,
    dispatch: 0,
    trapping: 0,
    evasion: 0,
 
    prayers: 0,
    // -------------
    grace: 0,
    blessing: 0,
    exorcism: 0,
    hymn: 0,
 
    magic: 0,
    // -------------
    elemental: 0,
    invocation: 0,
    darkness: 0,
    confusion: 0,
 
    special: 0,
    // -------------
    race: 0,
    mounts: 0,
};

let max_skill_values = {
    melee: 90,
    // -------------
    slash: 90,
    thrust: 90,
    cleave: 90,
    bash: 90,
    defend: 90,
 
    finesse: 90,
    // -------------
    ranged: 90,
    alchemy: 90,
    dispatch: 90,
    trapping: 90,
    evasion: 90,
 
    prayers: 90,
    // -------------
    grace: 90,
    blessing: 90,
    exorcism: 90,
    hymn: 90,
 
    magic: 90,
    // -------------
    elemental: 90,
    invocation: 90,
    darkness: 90,
    confusion: 90,
 
    special: 90,
    // -------------
    race: 90,
    mounts: 90,
};

function getbyid(object) {
    return document.getElementById(object) || `Unable to return ${object}`;
}


function set_select_class() {
    let class_name = getbyid("char_classes").value;
    let selected_branch_max_values;
    let selected_branch_init_values;
    let selected_max_skill_values;
    let selected_init_skill_values;
    let selected_skill_steps;
    let selected_skillset;

    switch (class_name) {
        case ("warrior"):   
            selected_branch_max_values = warrior_max_branch;
            selected_branch_init_values = warrior_init_branch;
            selected_max_skill_values = warrior_max_skill;
            selected_init_skill_values = warrior_max_skill;
            selected_skill_steps = warrior_skill_steps;
            selected_skillset = warrior_skillset;
            break;
        case ("gladiator"): 
            selected_branch_max_values = gladiator_max_branch;
            selected_branch_init_values = gladiator_init_branch;
            selected_max_skill_values = gladiator_max_skill;
            selected_init_skill_values = gladiator_max_skill;
            selected_skill_steps = gladiator_skill_steps;
            selected_skillset = gladiator_skillset;
            break;
    }

    //TODO: reset all the currient values to 0 by a loop;

    // Set the maximal and initial skill values
    let sbar_branch_nums = document.getElementsByClassName("branch_num");
    {
        let i = 0;
        Array.from(sbar_branch_nums).forEach(branch_num => {
            branch_num.textContent = `${Object.values(selected_branch_init_values)[i]}/${Object.values(selected_branch_max_values)[i]}`;
            i++;
        });
    }
    let sbar_skill_nums = document.getElementsByClassName("skill_num");
    {
        let i = 0;
        Array.from(sbar_skill_nums).forEach(skill_num => {
            skill_num.textContent = `${Object.values(selected_init_skill_values)[i]}/${Object.values(selected_max_skill_values)[i]}`;
            i++;
        });
    }

    // Fill up the skill tree
    const stree_tbody = getbyid("stree_tbody");
    let row_num = 0;
    selected_skill_steps.forEach(step => {
        let row = stree_tbody.insertRow();
        let row_head_cell = row.insertCell(0);
        row_head_cell.className = "row_head";
        row_head_cell.textContent = step;

        for (let i = 0; i < MAX_ICONS_IN_ROW; i++) {
            let skill_cell = row.insertCell(i + 1);

            let skill_id;
            if (selected_skillset[row_num] !== undefined) {
                skill_id = selected_skillset[row_num][i];
            }

            let skill_icon = document.createElement("img");
            skill_icon.className = "skill_icon";
            if (skill_id !== undefined) {
                skill_icon.src = Object.values(SKILL_LIST)[skill_id].icon_path;
            }
            skill_cell.appendChild(skill_icon);
        }
        row_num++;
    });
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

set_select_class();