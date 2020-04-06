function createElement(tagName, className) {
    const element = document.createElement(tagName)
    element.classList.add (className) 
    return element
}
class Barrier{
    constructor(normal = true){           
        this.barrier = createElement('div', 'barrier')
        this.normal =  normal
       
    }
    setHeight(height){
       
        return this.body.style.height = `${height}px`  
    }
    
    createBarrier(){
        this.body = createElement('div','barrier-body' )
        this.border = createElement('div','border')
 
        this.barrier.appendChild(this.normal? this.body: this.border )
        this.barrier.appendChild( this.normal? this.border: this.body) 
    }
     
}
class Barriers {
    constructor(xPosition){
        this.barries = createElement('div', 'barriers')

        this.top = new Barrier(true)
        this.top.createBarrier()
        this.bottom = new Barrier(false)
        this.bottom.createBarrier()

        this.barries.appendChild(this.top.barrier)
        this.barries.appendChild(this.bottom.barrier)


        this.setOpenningPoisition()
        this.setXposition(xPosition)
    }
    setOpenningPoisition(){
        const height = 700
        const opening = 250
        const topHeight = Math.random()*(height-opening)
        const bottomHeight = height - topHeight - opening
         
        this.top.setHeight(topHeight)
         
        this.bottom.setHeight(bottomHeight)
    }
    getXposition(){
 
        return parseInt(this.barries.style.left.split('px')[0])
    }
   
    setXposition(x){
        return this.barries.style.left = `${x}px`
    }
}
 
class SetBarriers{
    constructor (xPosition, barriersDistance ){
        this.barriers = [
            new Barriers( xPosition),
            new Barriers( xPosition + barriersDistance),
            new Barriers( (xPosition + barriersDistance *2)),
            new Barriers( (xPosition + barriersDistance * 3))
        ]
        this.distance = barriersDistance
         
    }
    barriersAnimation(){
        this.barriers.map( barrier => {
            if(barrier.getXposition()< -130){
                barrier.setXposition(1200 + -130 + this.distance)
                barrier.setOpenningPoisition()
            }
            const transition = 1
            barrier.setXposition(barrier.getXposition() - transition)

            const gameWidth = 1200        
            const barrierWidth = 130

            function collapse () {
               const ghostYpos = play.ghost.getYPosition()
               const topBarrier =   690 -barrier.top.barrier.clientHeight
               const bottomBarrier =   barrier.bottom.barrier.clientHeight

               const topCollapse = ghostYpos +65 >= topBarrier
               const bottomCollapse = ghostYpos+20  <= bottomBarrier


               if(topCollapse || bottomCollapse){
                   return true
               }
            
            }
            if( barrier.getXposition() <= gameWidth/2 && barrier.getXposition() + barrierWidth > gameWidth/2 )
                {      
                if( collapse()){
                    play.collapse = true
                }                  
            } 
            if(barrier.getXposition()+130 == 599){
                play.score.setPoints()
            }           
        }) 
    }
}
class Score {
    constructor(){
        this.score = createElement('span', 'score')
        this.points = 0
        this.setPoints()
    }
    setPoints(){
        this.points++
        this.score.innerHTML = this.points
        
    }
}
class Ghost {
    constructor(){
        this.ghost = createElement('img', 'ghost')
        this.ghost.src = './assets/ghost.png'

        this.flying = false
        window.onkeydown = e => this.flying = true
        window.onkeyup = e => this.flying = false
        this.initialPosition()
         
    }
    initialPosition(){
        return this.ghost.style.bottom = '350px'
    }
    getYPosition(){
        return parseInt(this.ghost.style.bottom.split('px')[0])
    }
    setYPosition(){
         const newPosition = this.getYPosition() + (this.flying ? 2 : -0.002)
         const height = 700
         const ghostHeight = 85
         if(newPosition >= (height - ghostHeight)){
            this.ghost.style.bottom = `${height - ghostHeight}px`
         }else{ 
         this.ghost.style.bottom = `${newPosition}px`  }       
    }
                        

}

 
function Game () {

    const allB = new SetBarriers( 1200, 400)
    const container = document.getElementsByClassName('container')[0]
    allB.barriers.map(barrier=> container.appendChild(barrier.barries))
    this.score = new Score
    this.ghost = new Ghost
    container.appendChild(this.ghost.ghost)
    container.appendChild(this.score.score)

    this.collapse = false
    
    
    this. start= () => {
        const play = setInterval(() => {
        allB.barriersAnimation()
        this.ghost.setYPosition(2)

        if(this.collapse){
            clearInterval(play)
        }
    }, 0) 
  
    }
}
const play = new Game()
play.start()