function get_by_id(id) {
    element = document.getElementById(id);
    return element ? element : console.log(`something's wrong ${id} is '${element}'`);
}


// Calculator logic
function _calc_matk(int) {
    let matk = 0;
    
    if (int >= 10)  matk = 1.0;
    if (int >= 20)  matk = 3.75;
    if (int >= 30)  matk = 6.75;
    if (int >= 40)  matk = 10.25;
    if (int >= 50)  matk = 14.0;
    if (int >= 60)  matk = 18.25;
    if (int >= 70)  matk = 22.75;
    if (int >= 80)  matk = 27.75;
    if (int >= 90)  matk = 33.25;
    if (int >= 100) matk = 39.0;
    if (int >= 110) matk = 47.0;

    return 100 + matk;
}

let prev_result = -1;
let result = -1;
function wb_calculate() {
    // (LVL + (SKILL * 4) + (DEX * 8) + 140) * (1 + (MATK / 100))
    let lvl    = parseFloat(get_by_id("wb_char_lvl").value, 10) || 0.0;
    let skill  = parseFloat(get_by_id("wb_skill_trap").value, 10) || 0.0;
    let dex    = parseFloat(get_by_id("wb_stat_dex").value, 10) || 0.0;
    let int    = parseFloat(get_by_id("wb_stat_int").value, 10) || 0.0;
    let matk   = _calc_matk(int);


    if (int % 10 !=0 & int % 5 == 0) {
        matk += Math.floor(int / 5 / 2 - 1);
    }

    // Save and show the previous result
    if (prev_result < 0) { // skip the first calculation
        prev_result++;
    } else if (prev_result >= 0) { // start from the second calculation
        prev_result = result;
        get_by_id("wb_prev_result").textContent = prev_result;
    }
    
    // calc the new result
    result = ( (lvl + (skill * 4.0) + (dex * 8.0) + 140.0) * (1.0 + (matk / 100.0)) ).toFixed(2);

    let difference = "";
    if (prev_result > 0) { // count the difference of the presults
        difference = Math.trunc(result - prev_result);
    }

    // set label colors depndently  
    if (result > prev_result) {
        get_by_id("wb_result").style.color = "lime";
    } else { 
        get_by_id("wb_result").style.color = "red";
    }

    get_by_id("wb_result").textContent = result;
    get_by_id("wb_difference").textContent = difference;
    
}

