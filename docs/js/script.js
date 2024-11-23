// script.js
function processarNome() {
    var nome = document.getElementById("nameInput").value;
    if (nome) {
        // Redirecionar para a segunda página com o nome na URL
        window.location.href = "enigmas.html?nome=" + encodeURIComponent(nome);
    } else {
        alert("Por favor, insira seu nome.");
    }
}
