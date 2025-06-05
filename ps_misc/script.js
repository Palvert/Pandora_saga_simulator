function getbyid(object) {
    return document.getElementById(object) || `Unable to return ${object}`;
}


getbyid("btn_calc_timeleft").addEventListner("click", () => {
    const TIME = getbyid("inp_time").valueOf;
    const [hours, minutes] = TIME.split(":").map(Number);
    console.log("Selected time:", TIME);
    console.log(`Hours: ${hours}, Minutes: ${minutes}`);
});