import { findTrail, listTechnologies } from "../data.js";

export async function executeChallengeCommand(technology, level = "iniciante") {
  if (!technology) {
    const technologies = await listTechnologies();
    return [
      "Uso: npm run desafio -- <tecnologia> <nivel>",
      `Tecnologias disponíveis: ${technologies.join(", ")}`
    ].join("\n");
  }

  const trail = await findTrail(technology, level);

  return [
    "🎯 GEO-EXPLORER — DESAFIO",
    "",
    `Tecnologia: ${trail.tecnologia}`,
    `Nível: ${trail.nivel}`,
    "",
    "Desafio:",
    trail.desafio,
    "",
    "Objetivo: praticar os conteúdos da trilha de forma aplicada."
  ].join("\n");
}
