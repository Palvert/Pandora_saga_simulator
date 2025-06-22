function getbyid(object) {
    return document.getElementById(object) || `Unable to return ${object}`;
}


getbyid("calc1_btn_timeleft").addEventListener("click", () => {
    const NIGHT_RESP_TIME_IN_GAME_MINS = 19*60;// 7pm
    const TIME = getbyid("calc1_inp_time").value;
    const [hours, minutes] = TIME.split(":").map(Number);
    let game_time_in_minutes = (hours * 60) + minutes;

    let game_mins_before_night;
    if (NIGHT_RESP_TIME_IN_GAME_MINS >= game_time_in_minutes) {
        game_mins_before_night = NIGHT_RESP_TIME_IN_GAME_MINS - game_time_in_minutes;
    } else { // input time is past 7pm
        game_mins_before_night = (NIGHT_RESP_TIME_IN_GAME_MINS + (24 * 60 - game_time_in_minutes));
    }

    const ONE_GAME_MIN_TO_REAL_MIN = 0.125;
    let game_time_in_real_time = game_mins_before_night * ONE_GAME_MIN_TO_REAL_MIN;
    let real_hrs = Math.floor(game_time_in_real_time / 60);
    let real_min = Math.floor(game_time_in_real_time % 60);
    let real_sec = Math.floor(60 * ((game_time_in_real_time % 60) - real_min));

    // add zeros to the single digits
    let str_hrs = (real_hrs < 10) ? ('0' + real_hrs.toString()) : real_hrs.toString();
    let str_min = (real_min < 10) ? ('0' + real_min.toString()) : real_min.toString();
    let str_sec = (real_sec < 10) ? ('0' + real_sec.toString()) : real_sec.toString();

    getbyid("calc1_lbl_tleft").textContent = `${str_hrs}:${str_min}:${str_sec}`;
});


getbyid("calc2_btn_timeleft").addEventListener("click", () => {
    const TIME = getbyid("calc2_curtime").value;
    const [cur_hours, cur_minutes] = TIME.split(":").map(Number);
    let cur_game_time_in_minutes = (cur_hours * 60) + cur_minutes;

    const need_game_time_in_minutes = getbyid("calc2_gtime").value;
    const [need_hours, need_minutes] = need_game_time_in_minutes.split(":").map(Number);
    let NIGHT_RESP_TIME_IN_GAME_MINS = (need_hours * 60) + need_minutes;

    let game_mins_left;
    if (NIGHT_RESP_TIME_IN_GAME_MINS >= cur_game_time_in_minutes) {
        game_mins_left = NIGHT_RESP_TIME_IN_GAME_MINS - cur_game_time_in_minutes;
    } else { // input time is past 7pm
        game_mins_left = (NIGHT_RESP_TIME_IN_GAME_MINS + (24 * 60 - cur_game_time_in_minutes));
    }

    const ONE_GAME_MIN_TO_REAL_MIN = 0.125;
    let game_time_in_real_time = game_mins_left * ONE_GAME_MIN_TO_REAL_MIN;
    let real_hrs = Math.floor(game_time_in_real_time / 60);
    let real_min = Math.floor(game_time_in_real_time % 60);
    let real_sec = Math.floor(60 * ((game_time_in_real_time % 60) - real_min));

    // add zeros to the single digits
    let str_hrs = (real_hrs < 10) ? ('0' + real_hrs.toString()) : real_hrs.toString();
    let str_min = (real_min < 10) ? ('0' + real_min.toString()) : real_min.toString();
    let str_sec = (real_sec < 10) ? ('0' + real_sec.toString()) : real_sec.toString();

    getbyid("calc2_lbl_tleft").textContent = `${str_hrs}:${str_min}:${str_sec}`;
});