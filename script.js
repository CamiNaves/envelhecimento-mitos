/* ==========================================
   DESAFIO LONGEVIDADE
   script.js
========================================== */

const perguntas = [

{
    pergunta:"Envelhecer significa necessariamente adoecer.",

    resposta:false,

    explicacao:"Envelhecer é um processo natural da vida, e não uma doença. Embora algumas doenças sejam mais frequentes com o avanço da idade, muitas pessoas envelhecem com saúde, autonomia e qualidade de vida."
},

{
    pergunta:"Exercícios físicos ajudam a memória.",

    resposta:true,

    explicacao:"A atividade física melhora a circulação do sangue no cérebro, favorece a memória, a atenção, o raciocínio e ainda contribui para o bem-estar emocional."
},

{
    pergunta:"Nunca é tarde para aprender algo novo.",

    resposta:true,

    explicacao:"O cérebro continua aprendendo durante toda a vida graças à neuroplasticidade. Aprender novas habilidades fortalece a memória e aumenta a autoestima."
},

{
    pergunta:"A solidão pode prejudicar a saúde.",

    resposta:true,

    explicacao:"O isolamento social aumenta o risco de depressão, ansiedade, piora da memória e até doenças cardiovasculares."
},

{
    pergunta:"O cérebro pode criar novas conexões durante toda a vida.",

    resposta:true,

    explicacao:"Essa capacidade chama-se neuroplasticidade. Quanto mais usamos o cérebro, maiores são as oportunidades de criar novas conexões."
}

];

let indice = 0;
let acertos = 0;

const questionText = document.getElementById("questionText");
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("scoreText");
const progressFill = document.getElementById("progressFill");

const buttonsArea = document.getElementById("buttonsArea");
const feedbackArea = document.getElementById("feedbackArea");

const feedbackIcon = document.getElementById("feedbackIcon");
const feedbackTitle = document.getElementById("feedbackTitle");
const feedbackExplanation = document.getElementById("feedbackExplanation");

const quizCard = document.getElementById("quizCard");
const resultCard = document.getElementById("resultCard");
const messageCard = document.getElementById("messageCard");

const finalScore = document.getElementById("finalScore");
const finalMessage = document.getElementById("finalMessage");
const medalArea = document.getElementById("medalArea");

const nextButton = document.getElementById("nextButton");



function atualizarPergunta(){

    const atual = perguntas[indice];

    questionText.textContent = atual.pergunta;

    progressText.textContent =
    `Pergunta ${indice+1} de ${perguntas.length}`;

    scoreText.textContent =
    `${acertos} acerto${acertos===1?"":"s"}`;

    progressFill.style.width =
    `${(indice/perguntas.length)*100}%`;

    buttonsArea.classList.remove("hidden");

    feedbackArea.classList.add("hidden");

}


function responder(escolha){

    const atual = perguntas[indice];

    const acertou =
    escolha===atual.resposta;

    if(acertou){

        acertos++;

        feedbackIcon.textContent="✅";

        feedbackTitle.textContent="Você acertou!";

        feedbackTitle.style.color="#2E8B57";

    }else{

        feedbackIcon.textContent="❌";

        feedbackTitle.textContent="Você errou!";

        feedbackTitle.style.color="#D9534F";

    }

    feedbackExplanation.innerHTML=
    `<strong>${atual.resposta?"Verdade":"Mito"}:</strong>
    ${atual.explicacao}`;

    buttonsArea.classList.add("hidden");

    feedbackArea.classList.remove("hidden");

    progressFill.style.width=
    `${((indice+1)/perguntas.length)*100}%`;

    if(indice===perguntas.length-1){

        nextButton.textContent="Ver resultado →";

    }

}


function proximaPergunta(){

    indice++;

    if(indice>=perguntas.length){

        mostrarResultado();

        return;

    }

    atualizarPergunta();

}


function mostrarResultado(){

    quizCard.classList.add("hidden");

    resultCard.classList.remove("hidden");

    finalScore.textContent=
    `${acertos} de ${perguntas.length} acertos`;

    const porcentagem=
    Math.round((acertos/perguntas.length)*100);

    let medalha="";
    let mensagem="";

    if(porcentagem===100){

        medalha="🥇";

        mensagem="Excelente! Você domina muito bem esse tema.";

        soltarConfetes();

    }

    else if(porcentagem>=80){

        medalha="🥈";

        mensagem="Muito bom! Você conhece bastante sobre envelhecimento saudável.";

    }

    else if(porcentagem>=60){

        medalha="🥉";

        mensagem="Bom resultado! Continue aprendendo.";

    }

    else{

        medalha="🌱";

        mensagem="Todo aprendizado começa por um primeiro passo.";

    }

    medalArea.innerHTML=
    `<div style="font-size:70px;text-align:center;margin-top:20px;">
        ${medalha}
    </div>`;

    finalMessage.textContent=
    mensagem;

}



function mostrarMensagemFinal(){

    resultCard.classList.add("hidden");

    messageCard.classList.remove("hidden");

}



function reiniciarQuiz(){

    indice=0;

    acertos=0;

    nextButton.textContent="Próxima →";

    resultCard.classList.add("hidden");

    messageCard.classList.add("hidden");

    quizCard.classList.remove("hidden");

    atualizarPergunta();

}



/* =====================================
        CONFETES
===================================== */

function soltarConfetes(){

    const canvas =
    document.getElementById("confetti");

    const ctx =
    canvas.getContext("2d");

    canvas.width=
    window.innerWidth;

    canvas.height=
    window.innerHeight;

    const pecas=[];

    for(let i=0;i<180;i++){

        pecas.push({

            x:Math.random()*canvas.width,

            y:-20,

            r:Math.random()*8+4,

            dx:(Math.random()-0.5)*4,

            dy:Math.random()*4+3,

            color:`hsl(${Math.random()*360},80%,60%)`

        });

    }

    function animar(){

        ctx.clearRect(0,0,canvas.width,canvas.height);

        pecas.forEach(p=>{

            ctx.fillStyle=p.color;

            ctx.beginPath();

            ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

            ctx.fill();

            p.x+=p.dx;

            p.y+=p.dy;

        });

        if(pecas[0].y<canvas.height+50){

            requestAnimationFrame(animar);

        }

    }

    animar();

}

window.addEventListener("resize",()=>{

    const canvas=document.getElementById("confetti");

    canvas.width=window.innerWidth;

    canvas.height=window.innerHeight;

});

atualizarPergunta();
