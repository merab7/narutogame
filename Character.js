import characterData from './data.js'
import { getDiceRollArray, getDicePlaceholderHtml, getPercentage } from './utils.js'

function Character(data) {
    Object.assign(this, data)
    this.maxHealth = this.health

    this.diceHtml = getDicePlaceholderHtml(this.diceCount)

    this.setDiceHtml = function() {
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceHtml = this.currentDiceScore.map((num) =>
            `<div class="dice">${num}</div>`).join("")
        
            
    }

   
    
    

    this.takeDamage = function (attackScoreArray) {
        const totalAttackScore = attackScoreArray.reduce((total, num) => total + num)
        this.health -= totalAttackScore
        if (this.health <= 0) {
            this.dead = true
            this.health = 0
        }

        this.narutohealth()
        this.forbiden()
    }

    this.narutohealth = function() {
        if (this.name == "Naruto" && this.health <= 20 && this.health > 0 ) {
            document.getElementById('rasinganbtn').style.display = 'flex';
         
        }

        
    }
    
    this.forbiden = function() {
        document.getElementById('rasinganbtn').addEventListener('click', () => {
          
            if (this.name==='Naruto'){
                this.diceCount=8
               this.avatar="kuda.png"
               document.getElementById('audio').innerHTML=`<audio src="Rasengan.mp3" id="my_audio" loop autoplay  ></audio>`
               document.getElementById('attack-button').style.scale='1.2'
               document.getElementById('attack-button').style.backgroundColor='red'
              
            }
        })

        
    }
    
    


    this.getHealthBarHtml = function () {
        const percent = getPercentage(this.health, this.maxHealth)
        return `<div class="health-bar-outer">
                    <div class="health-bar-inner ${percent < 26 ? "danger" : ""}" 
                            style="width:${percent}%;">
                    </div>
                </div>`  

             
    }
    

    this.getCharacterHtml = function () {
        const {  name, avatar, health,  diceHtml } = this
        const healthBar = this.getHealthBarHtml()
        return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b> ${health} </b></div>
                ${healthBar}
                <div class="dice-container" id="diceconti">
                    ${diceHtml}
                </div>
            </div>`
    }

 
  
}

export default Character