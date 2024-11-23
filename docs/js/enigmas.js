var nome;
var enigmas;
var enigmaAtualIndex = 0;

window.addEventListener("load", function() {
    var params = new URLSearchParams(window.location.search);
    nome = params.get('nome');
    const elementos = document.querySelectorAll(".nome");
    elementos.forEach(elemento => {
        elemento.textContent = nome;
    });
});

function carregarEnigmas() {
    fetch('json/data.json')
    .then(response => response.json())
    .then(data => {
        enigmas = data;
        verificarEstadoAnterior(); // Verifica se há um índice de enigma atual salvo no armazenamento local
        apresentarEnigma(); // Apresenta o enigma correspondente
    });
}

function apresentarEnigma() {
    if (enigmaAtualIndex < enigmas.length) {
        document.getElementById("enigma").textContent = enigmas[enigmaAtualIndex].enigma;
        document.getElementById("indice").textContent = enigmaAtualIndex + 1;
        document.getElementById("enigma").style.display = "block";
        document.getElementById("respostaInput").style.display = "inline-block";
        document.getElementById("enviarResposta").style.display = "inline-block";
        document.getElementById("titulo").style.display = "inline-block";
        document.getElementById("introducao").style.display = "none";
    } else {
        parabensUsuario();
    }
}

function verificarResposta() {
    var resposta = document.getElementById("respostaInput").value.toLowerCase();
    var respostaCorreta = enigmas[enigmaAtualIndex].resposta.toLowerCase();

    if (resposta === respostaCorreta) {
        alert("Resposta correta! Parabéns!");
        enigmaAtualIndex++;
        if (enigmaAtualIndex < enigmas.length) {
            apresentarEnigma();
            // Atualiza o armazenamento local com o novo índice do enigma atual
            localStorage.setItem('enigmaAtualIndex', enigmaAtualIndex);
        } else {
            parabensUsuario();
            // Limpa o armazenamento local quando a brincadeira é concluída
            localStorage.removeItem('enigmaAtualIndex');
        }
    } else {
        alert("Resposta incorreta. Tente novamente.");
    }
    document.getElementById("respostaInput").value = "";
}

function parabensUsuario() {
    window.open("parabens.html", "_self");
}

function verificarEstadoAnterior() {
    var indiceSalvo = localStorage.getItem('enigmaAtualIndex');
    if (indiceSalvo !== null) {
        enigmaAtualIndex = parseInt(indiceSalvo);
    }
}

function iniciarBrincadeira() {
    carregarEnigmas();
}

function validateInput(input) {
    // Remove qualquer caractere não numérico
    input.value = input.value.replace(/[^0-9]/g, '');
}