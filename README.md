# SweetCandyPEX
Documentação do Projeto: SweetCandy
📋 Visão Geral
A SweetCandy é uma aplicação web moderna do tipo e-commerce (vitrine de doceria virtual), desenvolvida para proporcionar uma experiência de compra fluida, interativa e visualmente agradável. O projeto simula o fluxo completo de um cliente: desde a exploração do cardápio até a finalização do pedido integrada diretamente com o WhatsApp da loja.

🛠️ Tecnologias Utilizadas
O projeto foi construído utilizando tecnologias nativas da web, garantindo alta performance, leveza e facilidade de execução sem a necessidade de dependências complexas ou ferramentas de build pesadas:

HTML5: Responsável pela estrutura semântica da página, incluindo cabeçalho, vitrine de produtos, modal de carrinho e elementos de controle.

CSS3: Utilizado para estilização completa com foco em design responsivo (Mobile First), utilizando Flexbox e CSS Grid para organização dos elementos, além de animações suaves e paleta de cores temática (tons pastéis e rosa).

JavaScript (ES6+): Linguagem responsável por toda a lógica de negócio, manipulação dinâmica do DOM, gerenciamento de estado do carrinho, algoritmos de busca e filtros, e integração com APIs externas (WhatsApp).

FontAwesome: Utilizado para iconografia intuitiva (carrinho de compras, ícones de doces e botões de controle).

Unsplash API: Fonte para imagens de alta qualidade dos produtos do cardápio.

⚙️ Funcionalidades e Mecânicas de Projeto
1. Vitrine de Produtos Dinâmica
Como foi projetada: Os produtos não ficam estáticos no HTML. Eles são renderizados dinamicamente a partir de um array de objetos em JavaScript (products), facilitando a manutenção e a adição de novos itens.

Mecânica: Cada produto possui ID, nome, preço, categoria e link de imagem. O script percorre essa lista e injeta os cards formatados diretamente no DOM utilizando template strings.

2. Sistema de Busca em Tempo Real
Como foi projetada: Uma barra de pesquisa no topo da página permite que o usuário digite o nome do doce desejado.

Mecânica: O evento onkeyup aciona a função searchProducts(), que filtra instantaneamente o array de produtos utilizando o método .filter() combinado com .toLowerCase(), exibindo apenas os itens correspondentes ou uma mensagem amigável caso nenhum doce seja encontrado.

3. Filtros por Categoria
Como foi projetada: Botões de navegação rápida (Todos, Bolos & Tortas, Doces Finos, Gelados) posicionados abaixo da busca.

Mecânica: Ao clicar em um botão de categoria, a função filterCategory() altera o estado global da categoria ativa (currentCategory), atualiza a classe visual do botão selecionado e reexecuta a renderização da grade de produtos.

4. Sistema de Carrinho de Compras Interativo
Como foi projetada: Um ícone flutuante no cabeçalho exibe um badge contador com o total de itens adicionados. Ao clicar, um modal elegante se abre sobre a tela com o resumo do pedido.

Mecânica:

Adição: A função addToCart() verifica se o produto já existe no carrinho (cart). Se sim, incrementa apenas a quantidade (quantity++); se não, o adiciona com quantidade 1.

Controle de Quantidade (+ / -): Permite ajustar a quantidade de cada item diretamente no modal. Caso a quantidade chegue a zero, o item é removido automaticamente.

Cálculo de Totais: O preço total é recalculado de forma reativa a cada alteração utilizando métodos de redução de arrays (.reduce()).

5. Seleção de Forma de Pagamento
Como foi projetada: Um menu suspenso (<select>) dentro do modal do carrinho onde o cliente escolhe como deseja pagar (Pix, Cartão de Crédito/Débito ou Dinheiro).

Mecânica: A escolha do usuário é capturada no momento do fechamento do pedido para ser incluída nos metadados enviados à loja.

6. Checkout Integrado com o WhatsApp
Como foi projetada: Substitui os sistemas tradicionais de pagamento online por um fluxo direto e humanizado via mensageria.

Mecânica: Ao clicar em "Finalizar Compra via WhatsApp", a função checkout() valida se o carrinho não está vazio, compila um recibo textual formatado (contendo os itens, quantidades, valores individuais, subtotal e a forma de pagamento escolhida), codifica o texto para URL (encodeURIComponent) e abre automaticamente uma conversa no WhatsApp (wa.me) com o número pré-configurado da loja contendo o pedido pronto para envio. Por fim, o carrinho é limpo e o modal é fechado.
