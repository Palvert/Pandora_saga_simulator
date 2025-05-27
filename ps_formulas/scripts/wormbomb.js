function get_by_id(id) {
    element = document.getElementById(id);
    return element ? element : console.log(`something's wrong ${id} is '${element}'`);
}

function new_elem(tag) {
    return document.createElement(tag);
}

const html_calc = get_by_id("calc");


// Creating UI
const input_lvl       = new_elem("input");
input_lvl.id          = "input_lvl";
input_lvl.type        = "text";
input_lvl.placeholder = "LVL";
input_lvl.value = 55;

const input_skill       = new_elem("input");
input_skill.id          = "input_skill";
input_skill.type        = "text";
input_skill.placeholder = "SKILL";
input_skill.value = 90;

const input_dex       = new_elem("input");
input_dex.id        = "input_dex";
input_dex.type        = "text";
input_dex.placeholder = "DEX";
input_dex.value = 100;

const input_int       = new_elem("input");
input_int.id        = "input_int";
input_int.type        = "text";
input_int.placeholder = "INT";
input_int.value = 70;

const p_result       = new_elem("p");
p_result.id          = "p_result";
p_result.textContent = "[Result]";

const p_prev_result= new_elem("p");
p_prev_result.id          = "p_prev_result";
p_prev_result.textContent = "[Previous Result]";

const btn_calc = new_elem("button");
btn_calc.id = "btn_calc";
btn_calc.textContent = "Calculate";
btn_calc.onclick = calculate;

html_calc.appendChild(input_lvl);
html_calc.appendChild(input_skill);
html_calc.appendChild(input_dex);
html_calc.appendChild(input_int);
html_calc.appendChild(p_result);
html_calc.appendChild(p_prev_result);
html_calc.appendChild(btn_calc);


// Calculator logic
function calc_matk(int) {
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
function calculate() {
    // (LVL + (SKILL * 4) + (DEX * 8) + 140) * (1 + (MATK / 100))
    let lvl  = parseFloat(get_by_id("input_lvl").value, 10) || 0.0;
    let skill  = parseFloat(get_by_id("input_skill").value, 10) || 0.0;
    let dex    = parseFloat(get_by_id("input_dex").value, 10) || 0.0;
    let int    = parseFloat(get_by_id("input_int").value, 10) || 0.0;
    let matk   = calc_matk(int);

    if (int % 10 !=0 & int % 5 == 0) {
        matk += Math.floor(int / 5 / 2 - 1);
    }

    if (prev_result < 0) { // skip the first calculation
        prev_result++;
    } else if (prev_result >= 0) { // start from the second calculation
        prev_result = result;
        get_by_id("p_prev_result").textContent = `Prev: ${prev_result}`;
    }
    
    // calc the new result
    result = ( (lvl + (skill * 4.0) + (dex * 8.0) + 140.0) * (1.0 + (matk / 100.0)) ).toFixed(2);

    let difference = "";
    if (prev_result > 0) { // count the difference of the presults
        difference = Math.trunc(result - prev_result);
    }

    get_by_id("p_result").textContent = `DMG: ${result} (${difference})`;
}