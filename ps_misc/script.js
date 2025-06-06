function getbyid(object) {
    return document.getElementById(object) || `Unable to return ${object}`;
}


getbyid("btn_calc_timeleft").addEventListener("click", () => {
    const NIGHT_RESP_TIME_IN_GAME_MINS = 19*60;// 7pm
    const TIME = getbyid("inp_time").value;
    const [hours, minutes] = TIME.split(":").map(Number);
    let game_time_in_minutes = (hours * 60) + minutes;

    let game_mins_before_nighta;
    if (NIGHT_RESP_TIME_IN_GAME_MINS >= game_time_in_minutes) {
        game_mins_before_night = NIGHT_RESP_TIME_IN_GAME_MINS - game_time_in_minutes;
    } else {
        game_mins_before_night = (NIGHT_RESP_TIME_IN_GAME_MINS + (24 * 60 - game_time_in_minutes)) - game_time_in_minutes;
    }

    const ONE_GAME_MIN_TO_REAL_MIN = 0.125;
    let game_time_in_real_time = game_mins_before_night * ONE_GAME_MIN_TO_REAL_MIN;
    let real_hrs = Math.floor(game_time_in_real_time / 60);
    let real_min = game_time_in_real_time % 60;
    getbyid("lbl_tleft").textContent = `${real_hrs} h. ${Math.floor(real_min)} min.`;
    console.log(real_hrs, real_min);
});