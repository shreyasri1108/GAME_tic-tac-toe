const boxes = document.querySelectorAll(".box"); // fetching all yhe boxes together
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid; // this collects all the data and counting of players in the grid

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to intialize the game

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""]; // empty at starting of every game

    // also need to empty in UI other than above array 
       boxes.forEach((box,index) =>{
            box.innerText = "";
            boxes[index].style.pointerEvents = "all";
            //removing green color after 'newGameBtn' is clicked for proper fresh screen

            boxes[index].classList.remove("win"); 
                      //  or ( by adding every css property)
            // ex - box.classList = `box box{index+1}`;  (making it like , intially it was)
       });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Position -${currentPlayer}`;
}
initGame();
boxes.forEach((box,index) => // sabhi boxes par event listner laga diya
{
    // index is taken to know which of the box is exactly clicked
  box.addEventListener('click',() =>{  //on every click (on box) code starts from here
    handleClick(index); // handling particular index of particlur clicked box recent
  })
});

function  handleClick(index) {
    
    if(gameGrid[index] === "") // only for onr time clickables
    {
    // **imp- "boxes[index].innerHTML" this makes changes in the UI while "gameGrid[index]" this just makes changes in the above array
        boxes[index].innerText = currentPlayer; //changes in UI
        gameGrid[index] = currentPlayer; //changes in above array
        boxes[index].style.pointerEvents = "none";
        //now swapping the turn
        swapTurn();

        //checking koi jeet to ni gaya
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer === "X")
    {
        currentPlayer = "O" ;
    }
    else{
        currentPlayer = "X";
    }

    //UI updation
    gameInfo.innerText = `Current Position -${currentPlayer}`;
}

newGameBtn.addEventListener('click' , initGame);

function checkGameOver()
{
   let answer = "";

   // iterating on each possible winning position individually
   winningPosition.forEach((position) => {
       if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" ) 
       && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) //yani ki grid me position ki index vali  value must not be empty  
       {
          if(gameGrid[position[0] === "X"])
          answer = "X";
          else
          answer = "O";

          //disable pointer event
          boxes.forEach((box) => {
            box.style.pointerEvents = "none"; // taki winner milne ke baad ab aage click na ho
          })

          // now we know X/O is winner 
          boxes[position[0]].classList.add("win");
          boxes[position[1]].classList.add("win");
          boxes[position[2]].classList.add("win");
       }
     
   }); 

  // it means we have a winner
   if(answer !== "")
   {
    gameInfo.innerText = `Winner Player -${answer}`;
    newGameBtn.classList.add("active");
    return;
   }

   //when the match is draw ... no winner got
   let fillCount = 0;
   gameGrid.forEach((box) =>{
    if(box !== "")
      fillCount++;
   })

   // if every box is filled then fillCount = 9
   if(fillCount === 9)
   {
      gameInfo.innerText = "Game Tied !";
      newGameBtn.classList.add("active");
   }
}