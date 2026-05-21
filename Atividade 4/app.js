// ================================================================
// app.js - Arquivo JavaScript da Pizzaria Fatec
// Manipula o carrinho, adiciona itens, calcula total e atualiza DOM
// ================================================================

// Carrinho armazenará objetos:
// { sabor: "Calabresa", preco: 45 }
// Tenta recuperar os dados salvos no localStorage. Se não houver, inicia vazio.
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Seleciona todos os botões de "Pedir Agora"
const botoes = document.querySelectorAll(".botao-pedir");

// Seletores do carrinho
const listaCarrinho = document.getElementById("lista-carrinho");
const totalCarrinho = document.getElementById("total");

// Seletores do modal de resumo
const btnFinalizar = document.getElementById("btn-finalizar");
const modalResumo = document.getElementById("modal-resumo");
const btnFecharModal = document.getElementById("btn-fechar-modal");
const btnConfirmar = document.getElementById("btn-confirmar");
const listaResumo = document.getElementById("lista-resumo");
const quantidadeTotal = document.getElementById("quantidade-total");
const somaFinal = document.getElementById("soma-final");

// ================================================================
// Função: atualizarCarrinho()
// Atualiza visualmente a lista e soma total.
// ================================================================
function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";  // limpa a lista antes de atualizar
    let soma = 0;

    // Agora utilizamos também o 'index' (posição do item no array)
    carrinho.forEach((item, index) => {
        soma += item.preco;

        // cria um elemento de item
        const li = document.createElement("li");
        li.classList.add("item-carrinho");
        
        // Adiciona o texto descritivo do item
        const texto = document.createElement("span");
        texto.textContent = `${item.sabor} — R$ ${item.preco.toFixed(2)}`;
        li.appendChild(texto);
        
        // Cria e configura o botão de remover
        const btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.classList.add("botao-remover");
        
        // EVENTO: ao clicar em "Remover", remove apenas o item deste índice
        btnRemover.addEventListener("click", function() {
            carrinho.splice(index, 1); // Remove 1 item na posição atual do array
            salvarCarrinho();          // Salva a alteração no localStorage
            atualizarCarrinho();       // Atualiza o DOM e recalcula o total instantaneamente
        });
        
        li.appendChild(btnRemover);
        
        listaCarrinho.appendChild(li);
    });

    totalCarrinho.textContent = `Total: R$ ${soma.toFixed(2)}`;
}

// ================================================================
// EVENTO: ao clicar em qualquer botão de pizza
// ================================================================
botoes.forEach(botao => {

    botao.addEventListener("click", function(event) {
        event.preventDefault(); // impede reload da página

        // Lê dados do HTML via data-*
        let sabor = this.dataset.sabor;
        let preco = Number(this.dataset.preco);

        // Cria objeto da pizza pedida
        let pedido = { sabor, preco };

        // Adiciona ao array
        carrinho.push(pedido);
        
        // Salva os dados no localStorage
        salvarCarrinho();

        // Atualiza a interface
        atualizarCarrinho();
    });
});

// ================================================================
// EVENTO: Abrir modal de resumo e preencher dados dinamicamente
// ================================================================
btnFinalizar.addEventListener("click", function() {
    // Prevenção extra: Não abre o modal se o carrinho estiver vazio
    if (carrinho.length === 0) {
        alert("O seu carrinho está vazio! Adicione algumas pizzas antes de finalizar.");
        return;
    }

    // Limpa a lista do resumo antes de preencher
    listaResumo.innerHTML = "";
    let soma = 0;

    // Preenche a lista do modal com as pizzas do carrinho
    carrinho.forEach(item => {
        soma += item.preco;
        const li = document.createElement("li");
        li.textContent = `${item.sabor} — R$ ${item.preco.toFixed(2)}`;
        listaResumo.appendChild(li);
    });

    // Atualiza os dados de quantidade e soma no modal
    quantidadeTotal.textContent = `Quantidade total de pizzas: ${carrinho.length}`;
    somaFinal.textContent = `Soma final: R$ ${soma.toFixed(2)}`;

    // Mostra o modal na tela alterando de "none" para "flex" (para centralização)
    modalResumo.style.display = "flex";
});

// ================================================================
// EVENTO: Fechar o modal de resumo (botao e fora da tela não implementado, opcional)
// ================================================================
btnFecharModal.addEventListener("click", function() {
    modalResumo.style.display = "none";
});

// ================================================================
// INICIALIZAÇÃO
// ================================================================
// Reconstrói visualmente o carrinho com os itens recuperados no carregamento da página
atualizarCarrinho();

// ================================================================
// Função: salvarCarrinho()
// Salva o estado atual do array carrinho no localStorage
// ================================================================
function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// ================================================================
// EVENTO: Confirmar o pedido
// ================================================================
btnConfirmar.addEventListener("click", function() {
    alert("Pedido finalizado com sucesso!");
    
    // Limpa os itens do carrinho array
    carrinho = [];
        // Atualiza o localStorage para refletir que o carrinho está vazio
        salvarCarrinho();
    // Atualiza o carrinho visual e os totais para zero
    atualizarCarrinho();
    
    // Oculta o modal
    modalResumo.style.display = "none";
});