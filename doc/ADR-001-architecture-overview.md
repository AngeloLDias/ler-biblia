# ADR 001: Arquitetura do MVP - Aplicativo de Leitura Bíblica

## Status
Aceito

## Contexto
Precisamos construir um MVP de aplicativo de leitura bíblica com foco em experiência fluida de leitura, busca confiável, destaques de versículos, anotações vinculadas a versículos e planos de leitura.

## Decisão

### Stack Tecnológica

#### Frontend
- **Framework**: Vue 3 com TypeScript
- **Build Tool**: Vite
- **Roteamento**: Vue Router 4
- **Estado**: Pinia
- **Estilização**: Tailwind CSS + daisyUI
- **Animações**: VueUse Motion
- **HTTP Client**: Axios

#### Backend
- **Framework**: NestJS
- **Banco de Dados**: SQLite (offline-first)
- **ORM**: TypeORM
- **Validação**: class-validator
- **Documentação**: Swagger/OpenAPI

### Arquitetura

#### Organização por Features
```
frontend/src/features/
  ├── bible/          # Leitura, navegação, versículos
  ├── search/         # Busca full-text
  ├── notes/          # Anotações e destaques
  ├── plans/          # Planos de leitura
  └── settings/       # Preferências do usuário

backend/src/features/
  ├── bible/          # Entidades e serviços da Bíblia
  ├── search/         # Serviço de busca
  ├── notes/          # CRUD de anotações
  └── plans/          # Gerenciamento de planos
```

#### Modelo de Dados

**Entidades Principais:**
1. **Translation** - Traduções da Bíblia (NVI, ARC, KJV, etc.)
2. **Book** - Livros da Bíblia (66 livros)
3. **Verse** - Versículos individuais com texto
4. **Highlight** - Destaques coloridos em versículos
5. **Note** - Anotações vinculadas a versículos
6. **ReadingPlan** - Planos de leitura pré-configurados
7. **ReadingProgress** - Progresso do usuário nos planos
8. **UserPreference** - Preferências (tema, fonte, última leitura)

### Princípios de Design

1. **Offline-First**: Todo conteúdo bíblico disponível sem internet
2. **Componentes Burros**: Componentes Vue apenas exibem dados via props
3. **Lógica em Composables**: Regras de negócio em composables/stores
4. **Controllers Finos**: Backend apenas roteamento e validação
5. **Services com Regras**: Lógica de negócio centralizada em services
6. **Tipagem Forte**: Evitar `any`, tipar todas as fronteiras

### Fluxos de Usuário

#### 1. Leitura
```
Home → Selecionar Tradução → Selecionar Livro → Selecionar Capítulo → Ler
```

#### 2. Busca
```
Busca → Filtros (Tradução, Testamento, Livro) → Resultados → Abrir Contexto
```

#### 3. Anotações
```
Versículo → Ação Rápida → Destacar/Anotar → Salvar
```

#### 4. Planos de Leitura
```
Planos → Selecionar Plano → Acompanhar Progresso → Marcar Concluído
```

## Consequências

### Positivas
- Arquitetura modular facilita evolução
- Offline-first garante disponibilidade
- Tipagem forte reduz bugs
- Separação clara de responsabilidades
- Fácil adicionar novas traduções

### Negativas
- SQLite pode ter limitações para busca full-text complexa
- Sincronização multi-dispositivo requer trabalho adicional
- Tamanho do banco pode crescer com múltiplas traduções

## Alternativas Consideradas

1. **MongoDB**: Descartado por complexidade de setup offline
2. **IndexedDB direto**: Descartado por falta de queries relacionais
3. **React**: Descartado em favor de Vue (preferência do time)
4. **PostgreSQL**: Descartado por não ser adequado para offline-first

## Notas de Implementação

- Usar índices no banco para otimizar buscas
- Implementar cache de capítulos lidos recentemente
- Lazy loading de traduções adicionais
- Service Worker para PWA
- Backup/restore via JSON para portabilidade

