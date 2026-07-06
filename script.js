/* =======================================
   HanStudy v0.2.2
======================================= */

let xp = 40;
let level = 1;
let streak = 1;

let currentLesson = null;

// ------------------------
// Seiten wechseln
// ------------------------

function showScreen(screenId){

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(screenId).classList.add("active");

}

// ------------------------
// Lektion öffnen
// ------------------------

function openLesson(id){

    currentLesson = lessons.find(l => l.id === id);

    document.getElementById("lessonTitle").textContent =
        currentLesson.title;

    document.getElementById("lessonPronunciation").textContent =
        currentLesson.pronunciation;

    document.getElementById("lessonTranslation").textContent =
        currentLesson.translation;

    document.getElementById("lessonExplanation").textContent =
        currentLesson.explanation;

    showScreen("lesson");

}

// ------------------------
// Quiz starten
// ------------------------

function startQuiz(){

    document.getElementById("question").textContent =
        currentLesson.question;

    const answers =
        document.getElementById("answers");

    answers.innerHTML = "";

    currentLesson.answers.forEach((answer,index)=>{

        const button =
            document.createElement("button");

        button.className = "answerButton";

        button.textContent = answer;

        button.onclick = function(){

            checkAnswer(index);

        }

        answers.appendChild(button);

    });

    showScreen("quiz");

}

// ------------------------
// Antwort prüfen
// ------------------------

function checkAnswer(index){

    const buttons =
        document.querySelectorAll(".answerButton");

    buttons.forEach(button=>{
        button.disabled=true;
    });

    if(index===currentLesson.correct){

        buttons[index].classList.add("correct");

        addXP(currentLesson.xp);

        setTimeout(showResult,900);

    }else{

        buttons[index].classList.add("wrong");

        buttons[currentLesson.correct]
            .classList.add("correct");

    }

}

// ------------------------
// Ergebnis
// ------------------------

function showResult(){

    document.getElementById("resultXP").textContent =
        "+" + currentLesson.xp + " XP erhalten!";

    showScreen("result");

}

// ------------------------
// XP
// ------------------------

function addXP(amount){

    xp += amount;

    if(xp>=100){

        xp-=100;

        level++;

    }

    updateUI();

    saveProgress();

}

// ------------------------
// Oberfläche aktualisieren
// ------------------------

function updateUI(){

    document.getElementById("xpText").textContent = xp;

    document.getElementById("level").textContent = level;

    document.getElementById("profileLevel").textContent =
        level;

    document.getElementById("profileXP").textContent =
        xp;

    document.getElementById("profileStreak").textContent =
        streak;

    document.getElementById("streakText").textContent =
        streak;

    document.getElementById("xpFill").style.width =
        xp + "%";

}

// ------------------------
// Speichern
// ------------------------

function saveProgress(){

    localStorage.setItem("hanstudyXP",xp);

    localStorage.setItem("hanstudyLevel",level);

    localStorage.setItem("hanstudyStreak",streak);

}

// ------------------------
// Laden
// ------------------------

function loadProgress(){

    const savedXP =
        localStorage.getItem("hanstudyXP");

    const savedLevel =
        localStorage.getItem("hanstudyLevel");

    const savedStreak =
        localStorage.getItem("hanstudyStreak");

    if(savedXP){

        xp = Number(savedXP);

    }

    if(savedLevel){

        level = Number(savedLevel);

    }

    if(savedStreak){

        streak = Number(savedStreak);

    }

    updateUI();

}

loadProgress();
