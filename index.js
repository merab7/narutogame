import characterData from './data.js'
import Character from './Character.js'


window.onclick=function(){
    document.getElementById('my_audio').play();
}

let ninjasArray = ["orochimaru", "deidara", "itachi"]
let isWaiting = false

function getNewNinja() {
    const nextNinjaData = characterData[ninjasArray.shift()]
    return nextNinjaData ? new Character(nextNinjaData) : {}
}

function attack() {

 
    if(!isWaiting){
        naruto.setDiceHtml()
        ninja.setDiceHtml()
        naruto.takeDamage(ninja.currentDiceScore)
        ninja.takeDamage(naruto.currentDiceScore)
        render()
        
        if(naruto.dead){
            endGame()
        }
        else if(ninja.dead){
            isWaiting = true
            if(ninjasArray.length > 0){
                setTimeout(()=>{
                    ninja = getNewNinja()
                    render()
                    isWaiting = false
                },1500)
            }
            else{
                endGame()
            }
        }    
    }

  naruto.forbiden()
    
}

function endGame() {
    isWaiting = true
    const endMessage = naruto.health === 0 && ninja.health === 0 ?
        "No victors - all Ninjas are dead" :
       naruto.health > 0 ? "Naruto Wins" :
            "Naruto loses"

    const endEmoji = naruto.health > 0 ? "🌀" : "☠️"
        setTimeout(()=>{
            document.body.innerHTML = `
                <div class="end-game">
                    <h2>Game Over</h2> 
                    <h3>${endMessage}</h3>
                    <p class="end-emoji">${endEmoji}</p>
                </div>
                `
        }, 2500)
}

document.getElementById("attack-button").addEventListener('click', attack)

function render() {
    document.getElementById('hero').innerHTML = naruto.getCharacterHtml()
    document.getElementById('ninja').innerHTML = ninja.getCharacterHtml()
}

const naruto = new Character(characterData.hero)
naruto.narutohealth()
naruto.forbiden()

let ninja = getNewNinja()
render()


