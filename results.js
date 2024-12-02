
var playAgain_el = document.querySelector("#play-again")
var download_el = document.querySelector("#download")
var window_el = document.querySelector("#result-window")
var result_img_el = document.querySelector("#result-image")


var result = sessionStorage.getItem("result")


function loadPage() {
    window_el.style.opacity = "1"
    window_el.style.transform = "translateY(0px)"
    download_el.style.opacity = "1"
    playAgain_el.style.opacity = "1"
    result_img_el.src = `Assets/preview_imgs/preview${result}.png`
}


loadPage();


download_el.addEventListener("click", () => {
    const link = document.createElement('a')
    link.href = `Assets/prize_imgs/prize${result}.jpeg` 
    link.download = `claw-machine-prize.jpeg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
})


playAgain_el.addEventListener("click", ()=> {
    window.location.replace("game.html");
    window_el.style.opacity = "0"
    window_el.style.transform = "translateY(10px)"
    download_el.style.opacity = "0"
    playAgain_el.style.opacity = "0"
})