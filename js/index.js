const wordE1=document.getElementById("word");
const wrongLettersE1=document.getElementById("wrong-letters");
const playAgainBtn=document.getElementById("play-button");
const popup=document.getElementById("popup-container");
const notification=document.getElementById("notification-container");
const finalMessge=document.getElementById("final-message");
const finalMessgeRevealWord=document.getElementById("final-message-revel-word");

const figureParts=document.querySelectorAll(".figure-part");
// console.log(figureParts);
const words=["application","programming","wizard","interface","html","female","male","end","cool"];

let selectedWord=words[Math.floor(Math.random()*words.length)];

let playable=true;

const correctLetters=[];
const wrongLetters=[];

function displayWord(){
    wordE1.innerHTML=`
    ${selectedWord.split('').map(letter=>{
        return `<span class="letter">
        ${correctLetters.includes(letter)?letter:""}
        </span>`
    }).join('')}
    `;

    const innerWord=wordE1.innerText.replace(/[ \n]/g,'');
    if(innerWord===selectedWord)
    {
        finalMessge.innerText="Congratulations! You Won";
        popup.style.display="flex";
        playable=false;
    }
    // console.log(innerWord);
}

function showNotification()
{
    notification.classList.add("show");
    setTimeout(function(){
        notification.classList.remove("show")
    },2000);
}

function updateWrongLetterE1(){
    wrongLettersE1.innerHTML=`
    ${wrongLetters.length>0?`<p>Wrong Letters</p>`:''}
    ${wrongLetters.map(letter=> `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part,index)=> {
        const errors=wrongLetters.length;
        if(index<errors){
            part.style.display="block";
        }
        else{
            part.style.display="none";
        }
    });
    

    if(wrongLetters.length===figureParts.length){
        finalMessge.innerHTML="Unfortunately you Lost";
        popup.style.display="flex";
        playable=false;
    };
    

    
};


window.addEventListener('keydown',e=>{
    if(playable)
    {
        if(e.keyCode>=65 && e.keyCode<=90)
        {
            const letter=e.key.toLowerCase();
            if(selectedWord.includes(letter))
            {
                if(!correctLetters.includes(letter))
                {
                    correctLetters.push(letter);
                    displayWord(letter);
                }

                else
                {
                   showNotification(); 
                }
            }
            else{
                if(!wrongLetters.includes(letter))
                {
                    wrongLetters.push(letter);
                    updateWrongLetterE1();
                }
                else{
                    showNotification();
                }
            }
        }
    }
});

playAgainBtn.addEventListener("click",function(){
    playable=true;
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord=words[Math.floor(Math.random()*words.length)];
    displayWord();
    updateWrongLetterE1();
    popup.style.display="none";
})
displayWord()
