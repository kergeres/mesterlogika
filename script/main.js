"use strict"

// color change on the user selected dots 
let selects = document.querySelectorAll("select")
selects.forEach(select => {
    select.addEventListener("change", (e) => {

        select.style.backgroundColor = `${e.target.value}`
        select.style.borderColor = `${e.target.value}`
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









// let key = [
//     { key: "yellow" },
//     { key: "red" },
//     { key: "green" },
//     { key: "purple" }
// ]

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
    if (scoreCounter == 4) {
        alert("nyert")
        return
    }
    feedBackAppender(checkedArray, tips)

}
let roundcounter = 0;
let feedBackAppender = (checkerColorOrder, tipsColorOrder) => {

    roundcounter++

    let dotContainer = document.createElement('div')
    dotContainer.classList.add("check-row-container")

    if (roundcounter > 10) {
        alert("vege a jateknak, tul sok kor");
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



    if (roundcounter > 9) {
        alert("vege a jateknak, tul sok kor");
        return
    }

    let newTipContainer = document.createElement('form')
    newTipContainer.innerHTML = ` 
    <form class="tip-row-container">
    <div style="background-color: ${tipsColorOrder[0]}; border-color: ${tipsColorOrder[0]};" class="tipdot">
     
    </div>
    <div style="background-color: ${tipsColorOrder[1]}; border-color: ${tipsColorOrder[1]};" class="tipdot">
   
    </div>
    <div style="background-color: ${tipsColorOrder[2]}; border-color: ${tipsColorOrder[2]};" class="tipdot">
 
    </div>
    <div style="background-color: ${tipsColorOrder[3]}; border-color: ${tipsColorOrder[3]};" class="tipdot">
   
    </div>
    
</form>`

    document.querySelector('.past-tip-container').appendChild(newTipContainer)
}





