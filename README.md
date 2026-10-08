# 🚀 Geo-Explorer

> Projeto educacional para exploração interativa de trilhas de aprendizagem, desenvolvido com apoio de agente de IA.

[![CI](https://github.com/Matheusribeirosdev/geo-explorer/actions/workflows/ci.yml/badge.svg)](https://github.com/Matheusribeirosdev/geo-explorer/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📚 Sobre o projeto

O **Geo-Explorer** é uma aplicação de linha de comando criada para o desafio da DIO sobre desenvolvimento apoiado por agentes de IA.

A proposta é organizar uma base fictícia de trilhas e oferecer três comandos principais:

- **Trilha:** apresenta um plano de estudos conforme tecnologia e nível.
- **Desafio:** gera um desafio de código conforme tecnologia e nível.
- **Certificado:** gera um certificado fictício para uma trilha concluída.

Como extensão, o projeto possui um **Servidor MCP** que expõe essas mesmas capacidades para clientes compatíveis.

## 🎯 Objetivos do desafio atendidos

- Estrutura organizada de projeto.
- Base fictícia de trilhas.
- Comandos de trilha, desafio e certificado.
- Testes automatizados.
- Servidor MCP.
- Documentação de arquitetura e processo de IA.
- CI com GitHub Actions.
- Separação entre dados e lógica.
- Tratamento de entradas inválidas.

## 🗂️ Estrutura do projeto

```text
geo-explorer/
├── data/
│   └── trilhas.json
├── src/
│   ├── commands/
│   │   ├── trilha.js
│   │   ├── desafio.js
│   │   └── certificado.js
│   ├── data.js
│   ├── index.js
│   └── mcp/
│       └── server.js
├── tests/
│   ├── commands.test.js
│   └── mcp.test.js
├── docs/
│   ├── arquitetura.md
│   └── ibm-bob.md
├── mcp/
│   └── client-config.example.json
├── .github/workflows/ci.yml
├── .gitignore
├── LICENSE
├── package.json
└── README.md
```

## ⚙️ Como executar

### Pré-requisito

- Node.js 18 ou superior.
- Git.

### Clonar o projeto

```bash
git clone https://github.com/Matheusribeirosdev/geo-explorer.git
cd geo-explorer
```

Não há dependências externas obrigatórias na versão inicial.

### Ver ajuda

```bash
npm start -- --help
```

## 🧭 Comandos

### Trilha

```bash
npm run trilha -- Python iniciante
```

Também funciona diretamente:

```bash
node src/index.js trilha Python iniciante
```

### Desafio

```bash
npm run desafio -- JavaScript intermediario
```

### Certificado

```bash
node src/index.js certificado Git iniciante Matheus Ribeiro
```

O certificado é propositalmente fictício e existe somente para fins educacionais.

## 🧪 Testes

Execute todos os testes com:

```bash
npm test
```

A suíte valida:

- consulta de trilha;
- normalização de tecnologia e nível;
- geração de desafio;
- geração de certificado;
- tratamento de tecnologia inexistente;
- tratamento de nível inexistente;
- descoberta das ferramentas MCP;
- execução de uma ferramenta MCP.

## 🔌 Servidor MCP

O arquivo `src/mcp/server.js` disponibiliza três ferramentas:

- `consultar_trilha`
- `gerar_desafio`
- `gerar_certificado`

Para iniciar o servidor:

```bash
npm run mcp
```

O servidor usa `stdin/stdout` como canal de comunicação e trabalha com mensagens JSON-RPC. A configuração de exemplo para um cliente MCP está em `mcp/client-config.example.json`.

### Exemplo de descoberta de ferramentas

```json
{"jsonrpc":"2.0","id":1,"method":"tools/list"}
```

### Exemplo de chamada

```json
{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"consultar_trilha","arguments":{"tecnologia":"Python","nivel":"iniciante"}}}
```

## 🤖 Uso de IBM Bob

O projeto foi estruturado para o fluxo proposto no desafio: usar um agente de IA como apoio para planejar, implementar, testar, revisar e documentar.

O arquivo [`docs/ibm-bob.md`](docs/ibm-bob.md) reúne exemplos de prompts para conduzir esse processo com o IBM Bob e registrar as decisões do desenvolvedor.

A IA não deve substituir a revisão humana. Antes da entrega, o desenvolvedor deve revisar os arquivos, executar os testes, compreender o código e garantir que nenhum segredo ou dado privado foi publicado.

## 🌱 Melhorias adicionadas

Além do fluxo mínimo do desafio, a solução inclui:

- cinco tecnologias fictícias;
- níveis iniciante e intermediário;
- mensagens de erro claras;
- CLI com ajuda;
- testes do núcleo e do MCP;
- CI com GitHub Actions;
- documentação de arquitetura;
- guia de uso com IBM Bob;
- exemplo de configuração de cliente MCP;
- separação entre dados e regras de negócio.

## 🎓 O que aprendi

Com este projeto é possível demonstrar aprendizado em:

- organização de um projeto de software;
- separação de responsabilidades;
- leitura e validação de dados JSON;
- criação de interfaces CLI;
- testes automatizados com o test runner nativo do Node.js;
- comunicação por JSON-RPC/stdin/stdout;
- conceito de ferramentas expostas por MCP;
- uso responsável de agentes de IA;
- revisão de código gerado por IA;
- documentação e automação no GitHub.

## ⚠️ Avisos

Os dados de trilhas, desafios e certificados são **fictícios** e foram criados exclusivamente para fins educacionais.

O certificado não representa uma certificação oficial.

## 📄 Licença

MIT.
