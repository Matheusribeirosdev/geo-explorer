import { createInterface } from "node:readline";
import { executeTrailCommand } from "../commands/trilha.js";
import { executeChallengeCommand } from "../commands/desafio.js";
import { executeCertificateCommand } from "../commands/certificado.js";

const SERVER_INFO = {
  name: "geo-explorer-mcp",
  version: "1.0.0"
};

const TOOLS = [
  {
    name: "consultar_trilha",
    description: "Consulta uma trilha fictícia de aprendizagem.",
    inputSchema: {
      type: "object",
      properties: {
        tecnologia: { type: "string", description: "Tecnologia da trilha." },
        nivel: { type: "string", enum: ["iniciante", "intermediario"] }
      },
      required: ["tecnologia", "nivel"]
    }
  },
  {
    name: "gerar_desafio",
    description: "Gera um desafio de código associado a uma trilha.",
    inputSchema: {
      type: "object",
      properties: {
        tecnologia: { type: "string", description: "Tecnologia do desafio." },
        nivel: { type: "string", enum: ["iniciante", "intermediario"] }
      },
      required: ["tecnologia", "nivel"]
    }
  },
  {
    name: "gerar_certificado",
    description: "Gera um certificado fictício de trilha concluída.",
    inputSchema: {
      type: "object",
      properties: {
        tecnologia: { type: "string" },
        nivel: { type: "string", enum: ["iniciante", "intermediario"] },
        nome: { type: "string" }
      },
      required: ["tecnologia", "nivel", "nome"]
    }
  }
];

function send(message) {
  process.stdout.write(`${JSON.stringify(message)}\n`);
}

function sendResult(id, result) {
  send({ jsonrpc: "2.0", id, result });
}

function sendError(id, code, message) {
  send({
    jsonrpc: "2.0",
    id,
    error: { code, message }
  });
}

async function handleRequest(request) {
  const { id = null, method, params = {} } = request;

  if (method === "initialize") {
    sendResult(id, {
      protocolVersion: "2025-06-18",
      capabilities: { tools: {} },
      serverInfo: SERVER_INFO
    });
    return;
  }

  if (method === "notifications/initialized") {
    return;
  }

  if (method === "tools/list") {
    sendResult(id, { tools: TOOLS });
    return;
  }

  if (method === "tools/call") {
    const { name, arguments: args = {} } = params;

    let text;
    switch (name) {
      case "consultar_trilha":
        text = await executeTrailCommand(args.tecnologia, args.nivel);
        break;
      case "gerar_desafio":
        text = await executeChallengeCommand(args.tecnologia, args.nivel);
        break;
      case "gerar_certificado":
        text = await executeCertificateCommand(args.tecnologia, args.nivel, args.nome);
        break;
      default:
        sendError(id, -32602, `Ferramenta MCP desconhecida: ${name}`);
        return;
    }

    sendResult(id, {
      content: [{ type: "text", text }]
    });
    return;
  }

  sendError(id, -32601, `Método não suportado: ${method}`);
}

const input = createInterface({ input: process.stdin, crlfDelay: Infinity });

for await (const line of input) {
  if (!line.trim()) continue;

  try {
    await handleRequest(JSON.parse(line));
  } catch (error) {
    sendError(null, -32700, `JSON inválido: ${error.message}`);
  }
}
