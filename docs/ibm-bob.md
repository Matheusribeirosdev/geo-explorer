# IBM Bob e o processo de desenvolvimento

## Objetivo

O desafio propõe o uso de um agente de IA como apoio ao desenvolvimento, sem substituir as decisões e a validação do desenvolvedor.

Neste projeto, o agente pode apoiar cinco momentos:

1. Planejamento da estrutura.
2. Implementação inicial.
3. Geração e revisão de testes.
4. Revisão de qualidade e tratamento de erros.
5. Documentação.

## Exemplos de prompts para o IBM Bob

### Planejamento

```text
Estou desenvolvendo o Geo-Explorer.
Preciso organizar uma aplicação com três comandos: trilha, desafio e certificado.
Sugira uma estrutura de pastas simples e explique a responsabilidade de cada arquivo.
Não implemente ainda.
```

### Revisão

```text
Revise a implementação atual do Geo-Explorer.
Procure duplicação, tratamento de erros insuficiente e problemas de organização.
Liste os pontos encontrados e explique como eu poderia corrigir cada um.
```

### Testes

```text
Analise os comandos do Geo-Explorer e sugira testes automatizados para cenários válidos e inválidos.
Priorize casos que comprovem as regras de negócio.
```

### MCP

```text
Analise o servidor MCP do Geo-Explorer.
Explique como um cliente pode descobrir as ferramentas e chamar consultar_trilha, gerar_desafio e gerar_certificado.
Aponte o que deve ser validado antes de publicar.
```

## Princípio de revisão humana

A IA pode sugerir código, estrutura e testes, mas o desenvolvedor deve:

- conferir cada alteração;
- executar os testes;
- entender as escolhas feitas;
- remover qualquer credencial ou dado privado;
- adaptar o resultado às necessidades do projeto.

## Registro do projeto

Este arquivo serve como evidência de como o projeto pode ser desenvolvido e revisado com um agente de IA. Ao finalizar o desafio com IBM Bob, recomenda-se acrescentar abaixo as perguntas mais úteis e as decisões que foram tomadas a partir das respostas.
