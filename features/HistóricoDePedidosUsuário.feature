Feature: Histórico de Pedidos do Usuário
As a usuário
I want to ser capaz de ver o meu histórico de pedidos
So that eu possa ter controle dos produtos que comprei e de quanto eu gastei, bem como saber a situação dos meus pedidos.

Scenario: Acesso ao histórico de pedidos com pedidos cadastrados
Given eu estou logado como "Usuário" com nome "Thiago", email "thiagojgcosta@gmail.com", senha "Thiago123" e telefone "81994255845"
And eu tenho o pedido com email "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha", quantidade "2", tamanho "M", preço "50,00" reais, status "Pago", criado em "14/05/2024", para o endereço "Rua Altamira, 500" cadastrado
And eu tenho o pedido com email "thiagojgcosta@gmail.com", item "Caneca CIN" com descrição "Preta", quantidade "1", tamanho "U", preço "20,00" reais, status "Pago", criado em "13/05/2024", para o endereço "Rua Altamira, 500" cadastrado 
And estou na página "Usuário"
When eu seleciono a opção de ir para a página "Histórico de Pedidos"
Then eu posso ver na lista de pedidos o pedido com item "Camisa CIN", tamanho "M", preço "50,00" reais, status "Pago"
And eu posso ver na lista de pedidos o pedido com item "Caneca CIN", tamanho "U", preço "20,00" reais, status "Pago"

Scenario: Acesso ao histórico de pedidos sem pedidos cadastrados
Given eu estou logado como "Usuário" com nome "Thiago", email "thiagojgcosta@gmail.com", senha "Thiago123" e telefone "81994255845"
And estou na página "Usuário"
And não tenho pedidos cadastrados
When eu seleciono a opção de ir para a página "Histórico de Pedidos"
Then eu vejo uma mensagem de aviso que "não existem pedidos"

Scenario: Filtrar produtos no histórico de pedidos
Given eu estou logado como "Usuário" com nome "Thiago", email "thiagojgcosta@gmail.com", senha "Thiago123" e telefone "81994255845"
And estou na página "Histórico de Pedidos"
And eu tenho o pedido com email "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha", quantidade "2", tamanho "M", preço "50,00" reais, status "Pago", criado em "14/05/2024", para o endereço "Rua Altamira, 500" cadastrado
And eu tenho o pedido com email "thiagojgcosta@gmail.com", item "Caneca CIN" com descrição "Preta", quantidade "1", tamanho "U", preço "20,00" reais, status "Pago", criado em "13/05/2024", para o endereço "Rua Altamira, 500" cadastrado 
When eu seleciono a opção de filtrar por <FILTRO> <CRITERIO>
Then eu posso ver na lista de pedidos o pedido com item "Camisa CIN", tamanho "M", preço "50,00" reais, status "Pago"

Examples:
   FILTRO       |   CRITERIO
   Item         |   Camisa CIN
   Data         |   14/05/2024
   Preço        |   Acima de R$ 30,00

Scenario: Tentar filtrar produtos no histórico de pedidos sem pedidos cadastrados
Given eu estou logado como "Usuário" com nome "Thiago", email "thiagojgcosta@gmail.com", senha "Thiago123" e telefone "81994255845"
And estou na página "Histórico de Pedidos"
When eu tento selecionar um filtro
Then eu vejo uma mensagem de aviso que "não existem pedidos"

Scenario: Abrir detalhamento de um pedido
Given eu estou logado como "Usuário" com nome "Thiago", email "thiagojgcosta@gmail.com", senha "Thiago123" e telefone "81994255845"
And estou na página "Histórico de Pedidos"
And eu tenho o pedido com usuário "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha", quantidade "2", tamanho "M", preço "50,00" reais, status "Pago", criado em "14/05/2024", para o endereço "Rua Altamira, 500" cadastrado
When eu seleciono a opção de "Detalhar Pedido"
Then estou na página "Detalhamento do Pedido"
And eu vejo o pedido com usuário "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha", quantidade "2", tamanho "M", preço "50,00" reais, status "Pago", criado em "14/05/2024", para o endereço "Rua Altamira, 500" cadastrado

Scenario: Retornar pedidos no histórico de pedidos com pedidos cadastrados
Given um usuário com nome "Thiago", email "thiagojgcosta@gmail.com", senha "Thiago123" e telefone "81994255845"
And tem cadastrado o pedido com usuário "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha", quantidade "2", tamanho "M", preço "50,00" reais, status "Pago", criado em "14/05/2024", para o endereço "Rua Altamira, 500"
When acessar a página de "Histórico de Pedidos"
Then é retornado o pedido com usuário "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha", quantidade "2", tamanho "M", preço "50,00" reais, status "Pago", criado em "14/05/2024", para o endereço "Rua Altamira, 500"

Scenario: Retornar mensagem no histórico de pedidos sem pedidos cadastrados
Given um usuário com nome "Thiago", email "thiagojgcosta@gmail.com", senha "Thiago123" e telefone "81994255845"
And está na página "Usuário"
And não tem cadastrado nenhum pedido
When acessar a página de "Histórico de Pedidos"
Then é retornada uma mensagem informando que não há pedidos cadastrados

Scenario: Retornar pedidos filtrados
Given um usuário com nome "Thiago", email "thiagojgcosta@gmail.com", senha "Thiago123" e telefone "81994255845"
And eu tenho o pedido com email "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha", quantidade "2", tamanho "M", preço "50,00" reais, status "Pago", criado em "14/05/2024", para o endereço "Rua Altamira, 500" cadastrado
And eu tenho o pedido com email "thiagojgcosta@gmail.com", item "Caneca CIN" com descrição "Preta", quantidade "1", tamanho "U", preço "20,00" reais, status "Pago", criado em "13/05/2024", para o endereço "Rua Altamira, 500" cadastrado 
When filtrar por <FILTRO> <CRITERIO>
Then é retornado o pedido com usuário "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha", quantidade "2", tamanho "M", preço "50,00" reais, status "Pago", criado em "14/05/2024", para o endereço "Rua Altamira, 500"

Examples:
   FILTRO       |   CRITERIO
   Item         |   Camisa CIN
   Data         |   14/05/2024
   Preço        |   Acima de R$ 30,00