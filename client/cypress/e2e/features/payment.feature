Feature: Pagamento

Scenario: Visualizar qrcode para pagamento via PIX
    Given eu estou logado com email "tjgc@cin.ufpe.br" e senha "Thiago2604"
    And eu adicionei o produto "Camisa Preta" de tamanho "G" e quantidade "2" ao carrinho
    When estou na página "Carrinho de Compras"
    And seleciono a opção de "finalizar pedido"
    Then estou na página "Pagamento"
    And eu posso ver um "QR Code" para efetuar o pagamento

Scenario: Visualizar qrcode para pagamento via PIX
    Given eu estou logado com email "tjgc@cin.ufpe.br" e senha "Thiago2604"
    And eu adicionei o produto "Camisa Preta" de tamanho "G" e quantidade "2" ao carrinho
    When estou na página "Carrinho de Compras"
    And seleciono a opção de "finalizar pedido"
    Then estou na página "Pagamento"
    And eu posso ver um "Código Copia e Cola" para efetuar o pagamento

Scenario: Admin alterar status de um pedido
    Given eu estou logado com email "nrc2@cin.ufpe.br" e senha "nia12345"
    And estou na página "Status dos Pedidos"
    When seleciono a opção de "alterar o status do pedido"
    And altero o status para "Pago"
    Then eu posso ver na tabela que agora o status do pedido é "Pago"
