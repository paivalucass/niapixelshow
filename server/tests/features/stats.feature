Feature: Estatísticas de Vendas

Scenario: Requisição de Estatísticas
Given o banco de dados tem pedido com qtd "2", date "2024-06-17", item "Camisa Nova", price "50.00", description "Vermelha, M", addr "Rua umburanas, 40", email "thiagojgcosta@gmail.com" e status "Pago"
When são requisitadas as estatísticas de vendas
Then o sistema retorna vendas totais "50", produto mais vendido "Camisa Nova" e tabela de produtos com produto "Camisa Nova" com quantidade "2" e valor total "50"