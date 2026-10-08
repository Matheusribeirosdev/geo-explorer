import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function startMcpServer() {
  return spawn(process.execPath, [path.join(projectRoot, "src", "mcp", "server.js")], {
    cwd: projectRoot,
    stdio: ["pipe", "pipe", "pipe"]
  });
}

function request(server, payload) {
  return new Promise((resolve, reject) => {
    let buffer = "";
    const onData = (chunk) => {
      buffer += chunk.toString();
      const newline = buffer.indexOf("\n");
      if (newline === -1) return;
      const line = buffer.slice(0, newline);
      server.stdout.off("data", onData);
      try {
        resolve(JSON.parse(line));
      } catch (error) {
        reject(error);
      }
    };
    server.stdout.on("data", onData);
    server.stdin.write(`${JSON.stringify(payload)}\n`);
  });
}

test("MCP lista as três ferramentas", async () => {
  const server = startMcpServer();
  try {
    const response = await request(server, {
      jsonrpc: "2.0",
      id: 1,
      method: "tools/list"
    });

    assert.equal(response.jsonrpc, "2.0");
    assert.equal(response.result.tools.length, 3);
    assert.deepEqual(
      response.result.tools.map((tool) => tool.name),
      ["consultar_trilha", "gerar_desafio", "gerar_certificado"]
    );
  } finally {
    server.kill();
  }
});

test("MCP executa uma ferramenta", async () => {
  const server = startMcpServer();
  try {
    const response = await request(server, {
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: {
        name: "consultar_trilha",
        arguments: { tecnologia: "Git", nivel: "iniciante" }
      }
    });

    assert.match(response.result.content[0].text, /Git/);
    assert.match(response.result.content[0].text, /Branches/);
  } finally {
    server.kill();
  }
});
