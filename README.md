# Descrição

Nessa semana você fará uma *Single-Page Application* (SPA) para um cinema, usando React Router!

# Requisitos

- Geral
    - [x]  Manipule o HTML usando somente React (sem usar o document nem bibliotecas como jQuery)
    - [x]  Seu projeto deverá ser desenvolvido utilizando Git e GitHub
    - [x]  **A cada requisito implementado** faça um commit com uma mensagem descritiva do que você evoluiu. Caso queira dividir um requisito em vários commits, não há problema. Mas evite colocar mais de um requisito no mesmo commit
- Versionamento
    - [x]  Versionamento usando Git é obrigatório, crie um **repositório público** no seu perfil do GitHub
    - [x]  Faça commits a cada funcionalidade implementada
- Layout
    - [x]  Aplicar layout para mobile, seguindo figma fornecido (não é necessário implementar um layout para desktop)
        
        [Cineflex](https://www.figma.com/file/rc7ZTYfLZg9zpGahWB1aXb/Cineflex?node-id=0%3A1)
        
- Escolha de Filme (rota "/")
    - [x]  Buscar as informações dos filmes pela API fornecida e exibir conforme layout fornecido
    - [x]  Ao clicar em um filme, o usuário deve ser redirecionado para a rota "/sessoes/:idFilme", sendo :idFilme o id do filme clicado
- Escolha de Sessão (rota "/sessoes/:idFilme")
    - [x]  A partir do id da URL, obtenha da API as sessões disponíveis para o filme e exiba conforme o layout fornecido
    - [x]  Ao clicar em uma sessão, o usuário deve ser redirecionado para a rota "/assentos/:idSessao", onde :idSessao é o id da sessão escolhida
- Escolha de Assento (rota "/assentos/:idSessao")
    - [x]  A partir do id da sessão, buscar os dados da sessão da API e exibir o layout conforme fornecido
    - [x]  Ao clicar em um assento disponível, o assento deve ser marcado como "Selecionado"
    - [x]  Ao clicar novamente em um assento selecionado, este deve voltar para "Disponível"
    - [x]  Ao clicar em um assento indisponível, deverá ser exibido um alerta de "Esse assento não está disponível"
    - [x]  O usuário pode selecionar vários assentos
    - [x]  O usuário deve poder inserir o nome e o CPF do comprador
    - [x]  Ao clicar em "Reservar assento(s)", o pedido deve ser enviado para o servidor e o usuário deve ser redirecionado para a rota "/sucesso".  Isso fará com os assentos marcados fiquem indisponíveis para outras marcações.
- Rodapé
    - [x]  Ao longo das telas de Sessão e Assento, deve ser exibido um rodapé com as informações do filme selecionado. Estas informações virão das chamadas à API em cada tela
- Sucesso
    - [x]  Implementar layout conforme fornecido, exibindo os dados do pedido feito
    - [x]  Ao clicar em "Home" o usuário deve voltar para a rota inicial ("/"), com o pedido zerado

# Bônus (opcional)

- Botão de voltar
    - [x]  Adicione um botão de voltar no topo do site à esquerda
    - [x]  O topo do site deve estar fora dos componentes das páginas, ou seja, fora do <Switch> do React Router
    - [x]  Ao clicar no botão voltar, o usuário deve retornar para a página que estava anteriormente
        
        **Dica**: pesquise pela função `useHistory()` do React Router
        
    - [x]  O botão não deve ser exibido na tela inicial
- Informação de comprador por assento
    - [x]  Faça com que os campos de Nome e CPF do comprador deixem de ser um único campo para serem campos pra cada assento selecionado. Ou seja, cada assento selecionado terá seu próprio Nome e CPF
    - [x]  Conforme a pessoa for selecionando assentos, os campos devem ser exibidos abaixo na quantidade condizente com os assentos selecionados
    - [x]  Ao desmarcar um assento que já possuía dados preenchidos, pergunte ao usuário com um **confirm** se ele gostaria realmente de remover o assento e apagar os dados
