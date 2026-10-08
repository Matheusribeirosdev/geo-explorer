import test from "node:test";
import assert from "node:assert/strict";
import { executeTrailCommand } from "../src/commands/trilha.js";
import { executeChallengeCommand } from "../src/commands/desafio.js";
import { executeCertificateCommand } from "../src/commands/certificado.js";
import { listTechnologies, findTrail } from "../src/data.js";

test("lista as tecnologias disponíveis", async () => {
  const technologies = await listTechnologies();
  assert.ok(technologies.includes("Python"));
  assert.ok(technologies.includes("JavaScript"));
});

test("consulta uma trilha existente", async () => {
  const result = await executeTrailCommand("Python", "iniciante");
  assert.match(result, /Python/);
  assert.match(result, /Módulos:/);
  assert.match(result, /Funções/);
});

test("aceita tecnologia e nível sem diferenciar maiúsculas", async () => {
  const trail = await findTrail("javascript", "INICIANTE");
  assert.equal(trail.tecnologia, "JavaScript");
  assert.equal(trail.nivel, "iniciante");
});

test("gera um desafio válido", async () => {
  const result = await executeChallengeCommand("JavaScript", "intermediario");
  assert.match(result, /DESAFIO/);
  assert.match(result, /JavaScript/);
  assert.match(result, /API pública/);
});

test("gera um certificado fictício", async () => {
  const result = await executeCertificateCommand("Git", "iniciante", "Matheus Ribeiro");
  assert.match(result, /Matheus Ribeiro/);
  assert.match(result, /CERTIFICADO FICTÍCIO/);
  assert.match(result, /Git/);
});

test("rejeita tecnologia inexistente", async () => {
  await assert.rejects(
    executeTrailCommand("Cobol", "iniciante"),
    /Tecnologia não encontrada/
  );
});

test("rejeita nível inexistente", async () => {
  await assert.rejects(
    executeChallengeCommand("Python", "avancado"),
    /Nível.*não encontrado/
  );
});
