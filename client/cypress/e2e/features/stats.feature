Feature: Página de Estatísticas

    Scenario: Acessar página de estatísticas
        Given o usuário está na pagina dashboard
        When clica no botão "Estatísticas"
        Then o usuário agora está na página de estatísticas

    Scenario: Aplicar filtro nas estatísticas
        Given o usuário está na página de estatísticas
        When define ano para "2024"
        And clica no botão "Filtrar"
        Then a tabela de produtos agora tem produtos de data "2024-01"

    Scenario: Resetar filtros
        Given o usuário está na página de estatísticas
        And a tabela de produtos tem produtos de data "2024-01"
        When clica no botão "Reset"
        Then a tabela de produtos agora tem produtos totais