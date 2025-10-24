Documentação

Todos os arquivos Markdown (.md) devem ser criados e armazenados dentro da pasta doc/.
Documente decisões arquiteturais importantes (ADRs - Architecture Decision Records) quando relevante.

Padrões de Código

Sempre siga o padrão de código e o idioma adotados pelo projeto.
Mantenha consistência em nomenclaturas, comentários e estrutura.
Idioma: Código em inglês (variáveis, funções, classes); comentários/docs podem ser em português se o time preferir.

Estilo e Legibilidade

Evite emojis ou caracteres não convencionais dentro do código-fonte.
Prefira nomes descritivos a comentários explicativos.
Mantenha funções/métodos pequenos e com responsabilidade única.
Postmodernista
Tailwind CSS
VueUse Motion
daisyui

Arquitetura Modular por Feature
Frontend (Vue)

Componentes "burros": apenas exibem dados via props; emitem eventos.
Composables e Stores: contêm lógica de negócio e estado.
Nada de lógica de API dentro de componentes: use services/composables.
Tipagem forte: evite any; tipar tudo que cruza fronteiras (API/props/eventos).
Organização: agrupe por feature (/features/auth, /features/products).

Backend (NestJS)

Controller fino: apenas roteamento e validação de entrada.
Service com regra: lógica de negócio centralizada.
Repository para dados: abstração de acesso ao banco.
DTOs obrigatórios com validação (class-validator).
Versionamento: use /v1/ para endpoints estáveis.
Documentação automática: Swagger/OpenAPI habilitado.
Erros consistentes: padronize respostas de erro (código, mensagem, detalhes).
Logs estruturados: use níveis adequados (error, warn, info, debug).