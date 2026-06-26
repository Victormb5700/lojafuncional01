let produtos = [];
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

async function carregarProdutos() {
    try {
        const res = await fetch("api/api_produtos.php");
        produtos = await res.json();
        renderizarProdutos(produtos);
    } catch (erro) {
        console.error("Erro ao carregar livros:", erro);
    }
}

function renderizarProdutos(lista) {

    const grid = document.getElementById("grid-produtos");
    grid.innerHTML = "";

    lista.forEach(livro => {

        const card = document.createElement("div");

        card.className = "card bg-white rounded-3xl shadow-lg overflow-hidden";

        card.innerHTML = `
            <img
                src="img/${livro.imagem}"
                alt="${livro.titulo}"
                class="w-full h-80 object-cover">

            <div class="p-5">

                <h2 class="text-xl font-bold">
                    ${livro.titulo}
                </h2>

                <p class="text-gray-500">
                    ${livro.autor}
                </p>

                <p class="text-blue-600">
                    ${livro.editora}
                </p>

                <p class="text-emerald-600">
                    ${livro.categoria}
                </p>

                <p class="text-sm text-gray-500">
                    Estoque: ${livro.estoque}
                </p>

                <p class="text-2xl font-bold mt-3">
                    R$ ${Number(livro.preco).toFixed(2)}
                </p>

                <button
                    onclick="adicionarAoCarrinho(${livro.id})"
                    class="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl">

                    Adicionar ao Carrinho

                </button>

            </div>
        `;

        grid.appendChild(card);

    });

}

function adicionarAoCarrinho(id) {

    const livro = produtos.find(p => p.id == id);

    carrinho.push(livro);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    document.getElementById("contador").textContent = carrinho.length;

    alert(`${livro.titulo} adicionado ao carrinho!`);
}

function filtrarProdutos() {

    const termo = document
        .getElementById("busca")
        .value
        .toLowerCase();

    const filtrados = produtos.filter(livro =>

        livro.titulo.toLowerCase().includes(termo) ||

        livro.autor.toLowerCase().includes(termo) ||

        livro.categoria.toLowerCase().includes(termo) ||

        livro.editora.toLowerCase().includes(termo)

    );

    renderizarProdutos(filtrados);
}

function mostrarCarrinho() {

    alert(`Carrinho possui ${carrinho.length} livro(s).`);

}

carregarProdutos();