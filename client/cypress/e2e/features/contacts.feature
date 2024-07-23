Feature: Página de Contatos

    Scenario: Acessar página de estatísticas
        Given o usuário está na pagina principal
        When clica no botão "Contato"
        Then o usuário agora está na página de contatos