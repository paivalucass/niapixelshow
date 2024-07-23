Feature: Categoria

    Scenario: Administrador Adiciona uma nova Categoria de Produto
        Given o administrador com e mail "nrc2@cin.ufpe.br" e senha "nia12345" está logado no painel de administração do e-commerce
        And está na página "Gerenciamento de Categorias"
        When ele seleciona a opção "Criar Categoria"
        And ele insere o nome "Acessórios Temáticos"
        Then ele aperta o botão "Criar" o cadastro da categoria pode ver a nova categoria na lista de categorias.

    Scenario: Administrador Edita uma Categoria Existente 
        Given o administrador com e mail "nrc2@cin.ufpe.br" e senha "nia12345" está logado no painel de administração do e-commerce
        And está na página "Gerenciamento de Categorias"
        When ele seleciona a opção "Editar" para a categoria "Acessórios Temáticos"
        And ele adiciona a palavra " Personalizados" ao seu nome
        Then ele aperta o botão "Salvar" e pode ver a caregoria atualizada na lista de categorias.

    Scenario: Administrador Exclui uma Categoria de Produto
        Given o administrador com e mail "nrc2@cin.ufpe.br" e senha "nia12345" está logado no painel de administração do e-commerce
        And está na página "Gerenciamento de Categorias"
        When ele seleciona a opção "Excluir" na categoria "Acessórios Temáticos Personalizados"
        Then ele aperta o botão "Excluir" e a categoria deletada some da lista de categorias.

    Scenario: Erro ao Adicionar uma nova Categoria de Produto
        Given o administrador com e mail "nrc2@cin.ufpe.br" e senha "nia12345" está logado no painel de administração do e-commerce
        And está na página "Gerenciamento de Categorias"
        When ele seleciona a opção "Criar Categoria"
        And não adiciona nenhum nome e confirma
        Then ele recebe uma mensagem de erro.