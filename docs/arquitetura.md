# Arquitetura do Geo-Explorer

## Visão geral

O Geo-Explorer foi organizado para separar a interface de entrada, as regras dos comandos e a base fictícia de dados.

```text
                     GEO-EXPLORER
                          |
             +------------+------------+
             |            |            |
           trilha      desafio    certificado
             |            |            |
             +------------+------------+
                          |
                       data.js
                          |
                    trilhas.json

                    +-------------+
                    | MCP Server  |
                    +-------------+
                          |
                 reutiliza commands
```

## Componentes

- `data/trilhas.json`: base fictícia com tecnologias, níveis, módulos e desafios.
- `src/data.js`: leitura e consulta dos dados.
- `src/commands/`: regras dos três comandos principais.
- `src/index.js`: interface de linha de comando.
- `src/mcp/server.js`: servidor MCP leve sobre JSON-RPC/stdin/stdout para expor as mesmas funcionalidades.
- `tests/`: testes automatizados dos comandos e do servidor MCP.
- `docs/ibm-bob.md`: registro do uso do agente de IA e das perguntas de revisão.
- `.github/workflows/ci.yml`: execução automática dos testes no GitHub Actions.

## Decisões de projeto

1. Os dados ficam separados do código para permitir novas trilhas sem alterar os comandos.
2. Os comandos reutilizam a mesma camada de dados para evitar duplicação.
3. O certificado é explicitamente fictício.
4. O MCP reutiliza as funções existentes, mostrando como uma camada externa pode acessar a mesma lógica.
5. Não há credenciais, tokens ou segredos no repositório.

## Fluxo do usuário

```text
Entrada CLI / cliente MCP
        |
        v
Comando / ferramenta
        |
        v
Regra de negócio
        |
        v
Base fictícia
        |
        v
Resposta estruturada ou textual
```
