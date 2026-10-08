import { executeTrailCommand } from "./commands/trilha.js";
import { executeChallengeCommand } from "./commands/desafio.js";
import { executeCertificateCommand } from "./commands/certificado.js";

function printHelp() {
  console.log([
    "GEO-EXPLORER",
    "",
    "Comandos:",
    "  trilha <tecnologia> <nivel>               Consulta uma trilha.",
    "  desafio <tecnologia> <nivel>              Gera um desafio.",
    "  certificado <tecnologia> <nivel> [nome]   Gera um certificado fictício.",
    "",
    "Exemplos:",
    "  npm run trilha -- Python iniciante",
    "  npm run desafio -- JavaScript intermediario",
    "  node src/index.js certificado Git iniciante Matheus Ribeiro"
  ].join("\n"));
}

async function main() {
  const [, , command, technology, level, ...studentParts] = process.argv;
  const student = studentParts.join(" ") || "Participante";

  if (!command || command === "ajuda" || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  let result;

  switch (command.toLowerCase()) {
    case "trilha":
      result = await executeTrailCommand(technology, level);
      break;
    case "desafio":
      result = await executeChallengeCommand(technology, level);
      break;
    case "certificado":
      result = await executeCertificateCommand(technology, level, student);
      break;
    default:
      throw new Error(`Comando desconhecido: ${command}`);
  }

  console.log(result);
}

main().catch((error) => {
  console.error(`Erro: ${error.message}`);
  process.exitCode = 1;
});
