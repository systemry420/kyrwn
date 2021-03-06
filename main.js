const main = document.querySelector('main'), 
    sections = document.querySelector('.sections')
// const start = document.querySelector('#start')
const questionEl = document.getElementById('question');
const quiz = document.getElementById('quiz');
const aEl = document.getElementById('a_text');
const bEl = document.getElementById('b_text');
const cEl = document.getElementById('c_text');
const submitBtn = document.getElementById('submit');
let answerEls = document.querySelectorAll('.answer');
let question = null, 
    database = null,
    wrongArr = []
let currentQuiz = 0;
let score = 0;
let answer = undefined;

const links = document.querySelectorAll('section h1')
links.forEach(link=> {
    link.addEventListener('click', renderPage)
})

function renderPage(e) {
    const title = document.querySelector('.title')
    title.innerHTML = e.target.innerHTML
    database = e.target.dataset.db

    sections.innerHTML = ''
    load()
}

let quizData = null,
    arr = null;
// window.addEventListener('load', load)

function load() {
    const ref = db.collection(database)
    
    ref.get().then(snap=>{
        // console.log(snap.docs[0].data());
        // console.log(snap.docs[1].data());
        for (let i = 0; i < snap.docs.length; i++) {
            const quiz = snap.docs[i];
            // console.log(quiz.data());
            const start = document.createElement('button')
            start.setAttribute('class', 'start')
            start.innerText = 'بدء الاختبار '+ (i+1)
            start.addEventListener('click', ()=>{
                loadQuiz(quiz)
            })
            main.appendChild(start)
        }
    })
}
            
function loadQuiz(quizData) {
    const btn = document.querySelectorAll('.start');
    btn.forEach(b => {
        b.style.display = 'none'
    });
    quizData=Object.entries(quizData.data())
    arr = quizData[0][1]
    // console.log(arr);
    loadQuestion()
    quiz.style.display = 'block'
}

function loadQuestion(){
    question = arr[currentQuiz]
    // check(question)
    questionEl.innerText = question.ques[0];
    // console.log(question.q[0]);
    const options = question.ques.slice(1,4);
    aEl.innerText = options[0]
    bEl.innerText = options[1]
    cEl.innerText = options[2]
}

function check(ans) {
    // console.log(question.ques[4], ans);
    let correct = question.ques[4]
    if(ans !=  correct){
        const wrongAnswer = {
            question,
            ans,
            correct
        }

        wrongArr.push(wrongAnswer)
    }
    else {
        return true;
    }
}

function getSelected (){
    answerEls.forEach((answerEl)=>{
        if(answerEl.checked){
            answer = answerEl.id;
        }
    });
    return answer;
}
 
function deselect(){
    answerEls.forEach((answerEl)=>{
        answerEl.checked = false;
    })
}

function nextQuestion() {
    let yourAnswer = getSelected();
    // console.log(yourAnswer);
    if(yourAnswer){
        if(check(yourAnswer)){
            // console.log(check(yourAnswer));
            score++;
        }
        deselect();
        currentQuiz++;
        if(currentQuiz < arr.length){
            loadQuestion();
        }
        else {
            quiz.innerHTML = `<h2 style='padding: 1em'> لقد قمت بالإجابة عن ${score} من أصل ${arr.length}</h2>
            <button onclick='location.reload()'>إعادة الاختبار</button>
            `;

            if(wrongArr.length > 0) {
                let html = `<h1 style="text-align: center"> الأخطاء </h1>`
                wrongArr.forEach(wrongOb=>{
                    // console.log(wrongOb.question.ques);
                    let ques = wrongOb.question.ques
                    html += `
                        <div class="container">
                        <h2> ${ques[0]} </h2>
                        <ul id="list">`

                    let bg = "", ans = wrongOb.ans, correct = wrongOb.correct
                    for (let i = 1; i<=3; i++){
                        bg = i == ans? 'red': i==correct? 'green': ''
                        const option = ques[i]
                        html += `<li style='color:${bg}; font-size: 18px'> ${option} </li>`
                    }
                    html += `</ul></div>`

                })
                document.querySelector('.wrong').innerHTML = html
            }
        }
    }
    yourAnswer = false
    
}

submitBtn.addEventListener("click", nextQuestion)
