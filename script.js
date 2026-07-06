// HanStudy Demo 0.1

function showScreen(screenId) {

    // Alle Seiten ausblenden
    const screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen) {
        screen.classList.remove("active");
    });

    // Gewünschte Seite anzeigen
    document.getElementById(screenId).classList.add("active");
}

// ----------------------------
// Vorbereitung für spätere Versionen
// ----------------------------

let xp = 40;
let level = 1;
let streak = 1;

function addXP(amount) {
    xp += amount;

    // Später wird hier die XP-Leiste aktualisiert
    console.log("XP:", xp);
}

function increaseStreak() {
    streak++;
    console.log("Streak:", streak);
}

function saveProgress() {

    localStorage.setItem("hanstudyXP", xp);
    localStorage.setItem("hanstudyLevel", level);
    localStorage.setItem("hanstudyStreak", streak);

}

function loadProgress() {

    const savedXP = localStorage.getItem("hanstudyXP");
    const savedLevel = localStorage.getItem("hanstudyLevel");
    const savedStreak = localStorage.getItem("hanstudyStreak");

    if(savedXP){
        xp = Number(savedXP);
    }

    if(savedLevel){
        level = Number(savedLevel);
    }

    if(savedStreak){
        streak = Number(savedStreak);
    }

}

loadProgress();
function openLesson(id){

    const lesson = lessons.find(l => l.id === id);

    document.getElementById("lessonTitle").textContent =
    lesson.title;

    document.getElementById("lessonPronunciation").textContent =
    lesson.pronunciation;

    document.getElementById("lessonTranslation").textContent =
    lesson.translation;

    document.getElementById("lessonExplanation").textContent =
    lesson.explanation;

    showScreen("lesson");

}

function startQuiz(){

    alert("Das Quiz kommt im nächsten Update 🌸");

}
