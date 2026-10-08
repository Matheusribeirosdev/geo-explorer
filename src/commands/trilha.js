import { findTrail, listTechnologies } from "../data.js";

export async function executeTrailCommand(technology, level = "iniciante") {
  if (!technology) {
    const technologies = await listTechnologies();
    return [
      "Uso: npm run trilha -- <tecnologia> <nivel>",
      `Tecnologias disponíveis: ${technologies.join(", ")}`
    ].join("\n");
  }

  const trail = await findTrail(technology, level);

  return [
    "🚀 GEO-EXPLORER — TRILHA",
    "",
    `Tecnologia: ${trail.tecnologia}`,
    `Nível: ${trail.nivel}`,
    `Duração estimada: ${trail.duracao_estimada}`,
    "",
    trail.descricao,
    "",
    "Módulos:",
    ...trail.modulos.map((module, index) => `${index + 1}. ${module}`)
  ].join("\n");
}
