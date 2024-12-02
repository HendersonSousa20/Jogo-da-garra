var claw_el = document.querySelector("#claw")
var claw_hands_el = document.querySelector("#claw-hands")
var claw_rope_el = document.querySelector("#claw-rope")
var right_arrow_el = document.querySelector("#right-arrow")
var left_arrow_el = document.querySelector("#left-arrow")
var window_el = document.querySelector("#window")
var controls_el = document.querySelector("#controls")
var drop_el = document.querySelector("#drop")

const MAX_X = 240;
const MIN_X = 0;
var xTransf = 0;


const RARE_ODDS =.005
const COMMON_ODDS = .1
const LOSING_ODDS = 1 - (RARE_ODDS + (COMMON_ODDS*7)) 
var winningOdds = {0:RARE_ODDS,1:COMMON_ODDS,2:COMMON_ODDS,3:COMMON_ODDS,4:COMMON_ODDS,5:COMMON_ODDS,6:COMMON_ODDS,7:COMMON_ODDS,8:.295}

right_arrow_el.addEventListener("click", (e) => {
    if (xTransf < MAX_X) {
        xTransf += 40
    }
    claw_el.style.transform = `translateX(${xTransf}px)`
    claw_hands_el.style.transform = `rotate(15deg)`
    setTimeout(()=> {claw_hands_el.style.transform = `rotate(0deg)`}, 500)
})

left_arrow_el.addEventListener("click", (e) => {
    if (xTransf > MIN_X) {
        xTransf -= 40
    }
    claw_el.style.transform = `translateX(${xTransf}px)`
    claw_hands_el.style.transform = `rotate(-15deg)`
    setTimeout(()=> {claw_hands_el.style.transform = `rotate(0deg)`}, 500)

})

document.addEventListener("keydown", (e) => {
    var code = e.key;
    if (code == 'ArrowLeft') {
        // Left
        if (xTransf > MIN_X) {
            xTransf -= 40
        }
        claw_el.style.transform = `translateX(${xTransf}px)`
        claw_hands_el.style.transform = `rotate(-15deg)`
        setTimeout(()=> {claw_hands_el.style.transform = `rotate(0deg)`}, 500)
    }
    else if (code == 'ArrowRight') {
        // Right
        if (xTransf < MAX_X) {
            xTransf += 40
        }
        claw_el.style.transform = `translateX(${xTransf}px)`
        claw_hands_el.style.transform = `rotate(15deg)`
        setTimeout(()=> {claw_hands_el.style.transform = `rotate(0deg)`}, 500)
    }
    else if (code == 'ArrowDown' || code==" ") {
        // Down
        setTimeout(dropClaw, 500)
    }
})

drop_el.addEventListener("click", () => {
    setTimeout(dropClaw, 500)}
)

function dropClaw() {
    claw_rope_el.style.transform = `scale(1,4.9)`
    claw_hands_el.style.transform = `translateY(150px)`
    setTimeout(raiseClaw, 1000);
}

function selectWinner(spec){
    var i, sum=0, r=Math.random();
    for (i in spec) {
      sum += spec[i];
      if (r <= sum) return i;
    }
}

function raiseClaw(){

    result = selectWinner(winningOdds);

    claw_hands_el.src = `Assets/machine_imgs/ball${result}.svg`
    claw_rope_el.style.transform = `scale(1,1)`
    claw_hands_el.style.transform = `translateY(0px)`

    setTimeout(()=> {
        window_el.style.transform = "translateY(10px)"
        window_el.style.opacity = "0";
        controls_el.style.transform = "translateY(10px)"
        controls_el.style.opacity = "0";
    }, 1000)

    setTimeout(endGame, 1500);
}

function endGame(){

    sessionStorage.setItem("result", result);
    
    window.location.replace("results.html");
}