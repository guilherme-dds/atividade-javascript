// ================================================================
// app.js - Arquivo JavaScript da Pizzaria Fatec
// Manipula o carrinho, adiciona itens, calcula total e atualiza DOM
// ================================================================

// Carrinho armazenará objetos:
// { sabor: "Calabresa", preco: 45 }
let carrinho = [];

// Seleciona todos os botões de "Pedir Agora"
const botoes = document.querySelectorAll(".botao-pedir");

// Seletores do carrinho
const listaCarrinho = document.getElementById("lista-carrinho");
const totalCarrinho = document.getElementById("total");

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

        // Atualiza a interface
        atualizarCarrinho();
    });
});