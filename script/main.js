"use strict"

// color change on the user selected dots 
let selects = document.querySelectorAll("select")
selects.forEach(select => {
    select.addEventListener("change", (e) => {

        select.style.backgroundColor = `${e.target.value}`
        select.style.borderColor = `${e.target.value}`
        select.style.color = `${e.target.value}`
    })

})

let colors = ["yellow", "green", "red", "blue", "purple", "orange"]

let key = []

let randomize = () => {
    let result = 0
    let htmlTemlate = ""
    let numbersInKey = []
    for (let i = 0; numbersInKey.length < 4; i++) {

        result = Math.floor(Math.random() * 5) + 1

        if (!numbersInKey.includes(colors[result])) {
            key.push({ key: `${colors[result]}` })
            numbersInKey.push(colors[result])

            htmlTemlate += `<div style="background-color: 
            // ${colors[result]}; 
            // border-color: ${colors[result]}
            " class="keydot">?</div>`

        }

    }


    document.querySelector(".key-row-container").innerHTML = htmlTemlate
}
randomize()

let bigImg = (be) => {
    console.log(be);
}



let alertMessage = (textToDisplay) => {
    let messageTemplate = `
    <div class="msg-bg">
    <div class="msg-card" ><h2>${textToDisplay}</h2>
    <a href="index.html"><button>restart</button></a>
    </div>
    </div>
    `
    setTimeout(() => {
        document.querySelector(".allert-msg-container").innerHTML = messageTemplate
    }, 500);

}

let tipChecker = (roundIndex) => {
    let checkedArray = [], tips = [], keys = []


    // collect the user selected tips
    document.querySelectorAll(`.tips`).forEach(tip => {
        tips.push(tip.value)
    })

    // match the key dot color with the user tip color 
    for (let k = 0; k < tips.length; k++) {
        key[k].tip = tips[k]
        keys[k] = key[k].key

    }
    let scoreCounter = 0;
    // check if the tip's place and color is right
    key.forEach(keyAndTip => {


        if (keyAndTip.key == keyAndTip.tip) {

            checkedArray.push("white")
            scoreCounter++;

        }
        // check if the color is right but the place is not
        else if (keys.includes(keyAndTip.tip)) {
            checkedArray.push("black")
        }
        // either place and either color not right 
        else {
            checkedArray.push("none")
        }
    })

    feedBackAppender(checkedArray, tips, scoreCounter)

}
let roundcounter = 0;
let feedBackAppender = (checkerColorOrder, tipsColorOrder, scoreCounter) => {

    roundcounter++

    let dotContainer = document.createElement('div')
    dotContainer.classList.add("check-row-container")
    if (scoreCounter == 4) {
        alertMessage('you won')
        return
    }
    if (roundcounter > 9) {

        alertMessage('you lost')
        document.querySelector(".tip-row-container").style.display = "none"
        return
    }

    // set the right color (white, black or none) bgco to the feedback dots 
    checkerColorOrder.forEach(color => {

        let dot = document.createElement('div')
        dot.classList.add("checkdot")
        dot.style.backgroundColor = `${color}`
        dot.style.borderColor = `${color}`
        dotContainer.appendChild(dot)
    });
    document.querySelector(".checker-container").appendChild(dotContainer)





    let newTipContainer = document.createElement('form')
    newTipContainer.innerHTML = ` 
    <form class="tip-row-container">
    <div style="background-color: ${tipsColorOrder[0]}; border-color: ${tipsColorOrder[0]}; color: ${tipsColorOrder[0]}; " class="tipdot">
     
    </div>
    <div style="background-color: ${tipsColorOrder[1]}; border-color: ${tipsColorOrder[1]}; color: ${tipsColorOrder[1]};" class="tipdot">
   
    </div>
    <div style="background-color: ${tipsColorOrder[2]}; border-color: ${tipsColorOrder[2]}; color: ${tipsColorOrder[2]};" class="tipdot">
 
    </div>
    <div style="background-color: ${tipsColorOrder[3]}; border-color: ${tipsColorOrder[3]}; color: ${tipsColorOrder[3]};" class="tipdot">
   
    </div>
    
</form>`

    document.querySelector('.past-tip-container').appendChild(newTipContainer)
}





