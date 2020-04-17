let tipIterator = 0;
let storage;
const lolPassword = "anandisthebest"
var d = new Date();
const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const nicknames = ["bud", 
  "nav", 
  "navin4",
"man"];
const colors = [{"bg":"#202040","text":"#ff6363"},{"bg":"#543864","text":"#ffffff"},{"bg":"#ff6363","text":"#000000"},{"bg":"#ffbd69","text":"#000000"}];

let tips = ["I'd spend more time at the pool", "tip 2"];

window.onload = function(){
    storage = window.localStorage;

    if(storage.getItem("nav-password") == lolPassword){
        displayTips();
        if(storage.getItem("nav-iterator") === null){
            storage.setItem("nav-iterator", tipIterator);
            console.log("no login found");
        }else{
            tipIterator = storage.getItem("nav-iterator");
            console.log("Logged In...");
            console.log("Current Iterator: " + tipIterator);

            let lastDate = storage.getItem("nav-lastDay");
            let lastMonth = storage.getItem("nav-lastMonth");

            // if a day has past!
            if( d.getDate() > lastDate || d.getMonth() > lastMonth){
                tipIterator++;
                if(tipIterator >= tips.length){
                    tipIterator = 0;
                }
            }
            storage.setItem("nav-iterator", tipIterator);
        }

        storage.setItem("nav-lastMonth",d.getMonth());
        storage.setItem("nav-lastDay",d.getDate());
    }else{
        displayWall();
    }
};

function displayWall(){
    document.querySelector("#wall").style.display = "flex";
    var form = document.querySelector("form");
    let attemptedPass = "";
    form.addEventListener("submit", function(event) {
      console.log("Saving value", form.elements.pwd.value);
      attemptedPass = form.elements.pwd.value;
      event.preventDefault();
      if(attemptedPass == lolPassword){
        displayTips();
        document.querySelector("#wall").style.display = "none";
        storage.setItem("nav-password",lolPassword)
      }
    });

}

// after password entered:
function displayTips(){
    document.querySelector("#card").style.display = "flex";
    fillDate();
    fillTip();
    randomColors();
}

function fillDate(){
    var dayOfWeek = days[d.getDay()];
    var currMonth = months[d.getMonth()];
    var day = d.getDate();

    var dateObject = document.querySelector("#date");
    dateObject.innerHTML = "If I was 18 on " + dayOfWeek + ", " + currMonth + " " + day + "...";
}

function fillTip(){
    var currTip = tips[tipIterator]; // TODO

    var tipObject = document.querySelector("#tip");
    tipObject.innerHTML = currTip;
}

function randomColors(){
    let random = Math.floor(Math.random() * colors.length);
    document.querySelector("#card").style.backgroundColor = colors[random].bg;
    document.querySelector("#card").style.color = colors[random].text;

}


