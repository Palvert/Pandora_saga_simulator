//================================================================================
// Mine calculator
//================================================================================
//LVL + (DEX * 3.5) + (SKILL * 0.7) + 48

function get_by_id(id) {
    element = document.getElementById(id);
    return element ? element : console.log(`something's wrong ${id} is '${element}'`);
}

// Calculator logic
// ================================================================================

let m_prev_result = -1;
let m_result = -1;
function mine_calculate() {
    let lvl    = parseFloat(get_by_id("mine_char_lvl").value, 10) || 0.0;
    let skill  = parseFloat(get_by_id("mine_skill_trap").value, 10) || 0.0;
    let dex    = parseFloat(get_by_id("mine_stat_dex").value, 10) || 0.0;

    // Save and show the previous m_result
    if (m_prev_result < 0) { // skip the first calculation
        m_prev_result++;
    } else if (m_prev_result >= 0) { // start from the second calculation
        m_prev_result = m_result;
        get_by_id("mine_prev_result").textContent = m_prev_result;
    }
    
    // calc the new m_result
    //LVL + (DEX * 3.5) + (SKILL * 0.7) + 48
    m_result = Math.trunc(lvl + (dex * 3.5) + (skill * 0.7) + 48.0);

    let difference = "";
    if (m_prev_result > 0) { // count the difference of the presults
        difference = Math.trunc(m_result - m_prev_result);
    }

    // set label colors depndently  
    if (difference > 0) {
        get_by_id("mine_result").style.color = "lime";
    } else if (difference < 0) {
        get_by_id("mine_result").style.color = "red";
    }

    get_by_id("mine_result").textContent = m_result;
    get_by_id("mine_difference").textContent = difference;
}