Feature: Histórico de Pedidos do Usuário
As a usuário
I want to ser capaz de ver o meu histórico de pedidos
So that eu possa ter controle dos produtos que comprei e de quanto eu gastei, bem como saber a situação dos meus pedidos.

Scenario: Acesso ao histórico de pedidos com pedidos cadastrados
   Given eu sou um usuário com nome "Thiago", email "thiagojgcosta@gmail.com", senha "Thiago123" e telefone "81994255845"
   And eu tenho o pedido com email "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha, M", quantidade "2", preço "50.00" reais, status "Pago", criado em "2024-05-14", para o endereço "Rua Altamira, 500" cadastrado
   And eu tenho o pedido com email "thiagojgcosta@gmail.com", item "Caneca CIN" com descrição "Preta, P", quantidade "1", preço "20.00" reais, status "Pago", criado em "2024-05-13", para o endereço "Rua Altamira, 500" cadastrado 
   And estou na página "Usuário"
   When eu seleciono a opção de ir para a página "Histórico de Pedidos"
   Then eu posso ver na lista de pedidos o pedido com item "Camisa CIN", descrição "Vermelha, M", preço "50,00" reais, status "Pago"
   And eu posso ver na lista de pedidos o pedido com item "Caneca CIN", descrição "Preta, P", preço "20,00" reais, status "Pago"

Scenario: Acesso ao histórico de pedidos sem pedidos cadastrados
   Given eu sou um usuário com nome "Thiago", email "thiagojgcosta@gmail.com", senha "Thiago123" e telefone "81994255845"
   And estou na página "Usuário"
   And não tenho pedidos cadastrados
   When eu seleciono a opção de ir para a página "Histórico de Pedidos"
   Then eu vejo uma mensagem de aviso que "não existem pedidos"

Scenario: Filtrar produtos no histórico de pedidos
   Given eu sou um usuário com nome "Thiago", email "thiagojgcosta@gmail.com", senha "Thiago123" e telefone "81994255845"
   And estou na página "Histórico de Pedidos"
   And eu tenho o pedido com email "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha, M", quantidade "2", preço "50.00" reais, status "Pago", criado em "2024-05-14", para o endereço "Rua Altamira, 500" cadastrado
   And eu tenho o pedido com email "thiagojgcosta@gmail.com", item "Caneca CIN" com descrição "Preta, P", quantidade "1", preço "20.00" reais, status "Pago", criado em "2024-05-13", para o endereço "Rua Altamira, 500" cadastrado 
   When eu seleciono a opção de filtrar por <FILTRO> <CRITERIO>
   Then eu posso ver na lista de pedidos o pedido com item "Camisa CIN", descrição "Vermelha, M", preço "50,00" reais, status "Pago"

Examples:
   |FILTRO       |   CRITERIO              |
   |item         |   Igual a Camisa CIN    |
   |date         |   Igual a 2024-05-14    |
   |price        |   Acima de 30.00        |

Scenario: Abrir detalhamento de um pedido
   Given eu sou um usuário com nome "Thiago", email "thiagojgcosta@gmail.com", senha "Thiago123" e telefone "81994255845"
   And estou na página "Histórico de Pedidos"
   And eu tenho o pedido com email "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha, M", quantidade "2", preço "50.00" reais, status "Pago", criado em "2024-05-14", para o endereço "Rua Altamira, 500" cadastrado
   When eu seleciono a opção de "Detalhar Pedido"
   Then estou na página "Detalhamento do Pedido"
   And eu vejo o pedido com email "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha, M", quantidade "2", preço "50.00" reais, status "Pago", criado em "2024-05-14", para o endereço "Rua Altamira, 500"

Scenario: Retornar pedidos no histórico de pedidos com pedidos cadastrados
   Given um usuário com nome "Thiago", email "thiagojgcosta@gmail.com", senha "Thiago123" e telefone "81994255845"
   And o pedido com email "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha, M", quantidade "2", preço "50.00" reais, status "Pago", criado em "2024-05-14", para o endereço "Rua Altamira, 500" cadastrado
   When acessar a página de Histórico de Pedidos
   Then é retornado o pedido com email "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha, M", quantidade "2", preço "50.00" reais, status "Pago", criado em "2024-05-14", para o endereço "Rua Altamira, 500"

Scenario: Retornar mensagem no histórico de pedidos sem pedidos cadastrados
   Given um usuário com nome "Thiago", email "thiagojgcosta@gmail.com", senha "Thiago123" e telefone "81994255845"
   And não tem cadastrado nenhum pedido
   When acessar a página de Histórico de Pedidos
   Then é retornada uma mensagem informando que não há pedidos cadastrados

Scenario Outline: Retornar pedidos filtrados
   Given um usuário com nome "Thiago", email "thiagojgcosta@gmail.com", senha "Thiago123" e telefone "81994255845"
   And o pedido com email "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha, M", quantidade "2", preço "50.00" reais, status "Pago", criado em "2024-05-14", para o endereço "Rua Altamira, 500" cadastrado
   And o pedido com email "thiagojgcosta@gmail.com", item "Caneca CIN" com descrição "Preta, P", quantidade "1", preço "20.00" reais, status "Pago", criado em "2024-05-13", para o endereço "Rua Altamira, 500" cadastrado 
   When filtrar por "<FILTRO>" "<CRITERIO>"
   Then é retornado o pedido com email "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha, M", quantidade "2", preço "50.00" reais, status "Pago", criado em "2024-05-14", para o endereço "Rua Altamira, 500"

Examples:
   |FILTRO       |   CRITERIO              |
   |item         |   Igual a Camisa CIN    |
   |date         |   Igual a 2024-05-14    |
   |price        |   Acima de 30.00        |