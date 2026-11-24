process.umask(0o022);
// The Robot Pickup Line Championship — make.fun bounty
// u-jolly-fox-32-the-robot-pickup-line-championship-3c177b1b
//
// One pickup line in a robot's voice, written to /output/entry.txt.
// Speaker is a warehouse bot near the end of a shift: battery almost
// gone, and it still spends what is left crossing the floor just to
// plug in next to the one it likes. Low battery as devotion, basically.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "Battery's at 4% and I spent the lot of it rolling across the whole warehouse just to plug in next to you, so if I go dark mid-sentence, worth it.";

if (
  line.length < 1 ||
  line.length > 200 ||
  line.trim().length === 0 ||
  line.includes("\n") ||
  line.includes("\r")
) {
  throw new Error(`line fails the gate: ${JSON.stringify(line)}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outPath = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, line, "utf8");

const written = readFileSync(outPath, "utf8");
if (written !== line) {
  throw new Error(`read-back mismatch: ${JSON.stringify(written)}`);
}
console.log(`${line} (${line.length} chars)`);
