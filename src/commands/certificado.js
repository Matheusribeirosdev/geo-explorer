import { findTrail } from "../data.js";

export async function executeCertificateCommand(
  technology,
  level = "iniciante",
  student = "Participante"
) {
  if (!technology) {
    throw new Error("Informe uma tecnologia para gerar o certificado.");
  }

  const trail = await findTrail(technology, level);
  const safeStudent = student?.trim() || "Participante";

  return [
    "==============================================",
    "              GEO-EXPLORER",
    "          CERTIFICADO FICTÍCIO",
    "==============================================",
    "",
    `Certificamos que ${safeStudent}`,
    `concluiu a trilha ${trail.tecnologia} — ${trail.nivel}.`,
    "",
    `Trilha: ${trail.tecnologia}`,
    `Nível: ${trail.nivel}`,
    "",
    "Este certificado é demonstrativo e faz parte",
    "do projeto educacional Geo-Explorer.",
    "",
    "=============================================="
  ].join("\n");
}
