import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const dataPath = path.join(currentDir, "..", "data", "trilhas.json");

export async function loadTrails() {
  const content = await readFile(dataPath, "utf8");
  return JSON.parse(content);
}

export async function listTechnologies() {
  const data = await loadTrails();
  return data.trilhas.map((trail) => trail.tecnologia);
}

export async function findTrail(technology, level = "iniciante") {
  const data = await loadTrails();
  const normalizedTechnology = technology?.trim().toLowerCase();
  const normalizedLevel = level?.trim().toLowerCase();

  const trail = data.trilhas.find(
    (item) => item.tecnologia.toLowerCase() === normalizedTechnology
  );

  if (!trail) {
    throw new Error("Tecnologia não encontrada.");
  }

  const selectedLevel = trail.niveis[normalizedLevel];
  if (!selectedLevel) {
    throw new Error(
      `Nível "${level}" não encontrado para ${trail.tecnologia}.`
    );
  }

  return {
    tecnologia: trail.tecnologia,
    descricao: trail.descricao,
    nivel: normalizedLevel,
    ...selectedLevel
  };
}
