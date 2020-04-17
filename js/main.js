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

let tips = ["You can treat yourself on your birthday as much as others treat you", 
"The “adults” don’t have it anymore figured out than us",
"Life is messy, the messiness makes us human",
"Self-care is an active practice",
"Love brings out our most beautiful and fragile sides",
"The world needs more compliments, share appreciation of others often",
"Your self-worth is not dependent on your number of side projects"];

window.onload = function(){
    storage = window.localStorage;

    if(storage.getItem("nav-password") == lolPassword){
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
        displayTips();
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

      //first login!
      if(attemptedPass == lolPassword){
        displayTips();
        document.querySelector("#wall").style.display = "none";
        storage.setItem("nav-password",lolPassword)
        storage.setItem("nav-lastMonth",d.getMonth());
        storage.setItem("nav-lastDay",d.getDate());
        storage.setItem("nav-iterator", tipIterator);
      }
    });

}

// after password entered:
function displayTips(){
    window.setTimeout(function(){
        document.querySelector("#card").classList.add("visible");

    },10);
    fillDate();
    fillTip();
    randomColors();
}

function fillDate(){
    var dayOfWeek = days[d.getDay()];
    var currMonth = months[d.getMonth()];
    var day = d.getDate();

    var dateObject = document.querySelector("#date");
    dateObject.innerHTML = "Yo! It's " + dayOfWeek + ", " + currMonth + " " + day + ".";
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


