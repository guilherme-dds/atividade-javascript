// ================================================================
// contato.js - Validação do Formulário de Contato
// ================================================================

// Selecionando os elementos do DOM
const form = document.getElementById("form-contato");
const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");
const inputMensagem = document.getElementById("mensagem");
const msgSucesso = document.getElementById("mensagem-sucesso");

// Função auxiliar para demonstrar o erro na tela (boas práticas de UX)
function exibirErro(input, idMensagemErro) {
    input.classList.add("erro");
    document.getElementById(idMensagemErro).style.display = "block";
}

// Função auxiliar para limpar o erro
function ocultarErro(input, idMensagemErro) {
    input.classList.remove("erro");
    document.getElementById(idMensagemErro).style.display = "none";
}

// Validador de Email com Regex Simples
function validarEmail(email) {
    // Regex simples: texto @ texto . texto
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ================================================================
// EVENTO: Envio do Formulário
// ================================================================
form.addEventListener("submit", function(event) {
    // Impede o recarregamento da página
    event.preventDefault();
    
    let formularioValido = true;
    
    // Oculta mensagem de sucesso caso já esteja aparente em novo envio
    msgSucesso.style.display = "none";

    // 1. Validação: Nome (Verifica se está vazio)
    if (inputNome.value.trim() === "") {
        exibirErro(inputNome, "erro-nome");
        formularioValido = false;
    } else {
        ocultarErro(inputNome, "erro-nome");
    }

    // 2. Validação: E-mail (Verifica se é vazio ou inválido)
    const emailDigitado = inputEmail.value.trim();
    if (emailDigitado === "" || !validarEmail(emailDigitado)) {
        exibirErro(inputEmail, "erro-email");
        formularioValido = false;
    } else {
        ocultarErro(inputEmail, "erro-email");
    }

    // 3. Validação: Mensagem (Verifica se tem pelo menos 10 caracteres)
    if (inputMensagem.value.trim().length < 10) {
        exibirErro(inputMensagem, "erro-mensagem");
        formularioValido = false;
    } else {
        ocultarErro(inputMensagem, "erro-mensagem");
    }

    // Condição final: Se o formulário for totalmente válido
    if (formularioValido) {
        form.reset(); // Limpa os campos após o envio bem sucedido
        msgSucesso.style.display = "block"; // Dá feedback visual positivo ao usuário
    }
});

// ================================================================
// EVENTOS EXTRAS de UX: Limpar erros enquanto o usuário corrige
// ================================================================
inputNome.addEventListener("input", () => ocultarErro(inputNome, "erro-nome"));
inputEmail.addEventListener("input", () => ocultarErro(inputEmail, "erro-email"));
inputMensagem.addEventListener("input", () => ocultarErro(inputMensagem, "erro-mensagem"));