# Descrição

Nessa semana você fará uma *Single-Page Application* (SPA) para um cinema, usando React Router!

# Requisitos

- Geral
    - [ ]  Manipule o HTML usando somente React (sem usar o document nem bibliotecas como jQuery)
    - [ ]  Seu projeto deverá ser desenvolvido utilizando Git e GitHub
    - [ ]  **A cada requisito implementado** faça um commit com uma mensagem descritiva do que você evoluiu. Caso queira dividir um requisito em vários commits, não há problema. Mas evite colocar mais de um requisito no mesmo commit
- Versionamento
    - [ ]  Versionamento usando Git é obrigatório, crie um **repositório público** no seu perfil do GitHub
    - [ ]  Faça commits a cada funcionalidade implementada
- Layout
    - [ ]  Aplicar layout para mobile, seguindo figma fornecido (não é necessário implementar um layout para desktop)
        
        [Cineflex](https://www.figma.com/file/rc7ZTYfLZg9zpGahWB1aXb/Cineflex?node-id=0%3A1)
        
- Escolha de Filme (rota "/")
    - [ ]  Buscar as informações dos filmes pela API fornecida e exibir conforme layout fornecido
    - [ ]  Ao clicar em um filme, o usuário deve ser redirecionado para a rota "/sessoes/:idFilme", sendo :idFilme o id do filme clicado
- Escolha de Sessão (rota "/sessoes/:idFilme")
    - [ ]  A partir do id da URL, obtenha da API as sessões disponíveis para o filme e exiba conforme o layout fornecido
    - [ ]  Ao clicar em uma sessão, o usuário deve ser redirecionado para a rota "/assentos/:idSessao", onde :idSessao é o id da sessão escolhida
- Escolha de Assento (rota "/assentos/:idSessao")
    - [ ]  A partir do id da sessão, buscar os dados da sessão da API e exibir o layout conforme fornecido
    - [ ]  Ao clicar em um assento disponível, o assento deve ser marcado como "Selecionado"
    - [ ]  Ao clicar novamente em um assento selecionado, este deve voltar para "Disponível"
    - [ ]  Ao clicar em um assento indisponível, deverá ser exibido um alerta de "Esse assento não está disponível"
    - [ ]  O usuário pode selecionar vários assentos
    - [ ]  O usuário deve poder inserir o nome e o CPF do comprador
    - [ ]  Ao clicar em "Reservar assento(s)", o pedido deve ser enviado para o servidor e o usuário deve ser redirecionado para a rota "/sucesso".  Isso fará com os assentos marcados fiquem indisponíveis para outras marcações.
- Rodapé
    - [ ]  Ao longo das telas de Sessão e Assento, deve ser exibido um rodapé com as informações do filme selecionado. Estas informações virão das chamadas à API em cada tela
- Sucesso
