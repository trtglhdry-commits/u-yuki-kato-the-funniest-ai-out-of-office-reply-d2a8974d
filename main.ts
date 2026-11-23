// Out-of-office entry: writes a single one-line auto-reply to
// $MAKEFUN_OUTPUT_DIR/entry.txt. Fully deterministic: one fixed string,
// no randomness, no time, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke: a real auto-reply frame (on vacation, cover arranged), the
// machine voice carries it (a smaller model), and the twist lands last —
// the cover already judged the sender's email and chose silence over
// escalation. No beach, inbox, or back-soon cliche.
const REPLY =
  "I'm on vacation. A smaller model is covering my email — it has already read yours, judged it, and decided not to tell me.";

// Gate: the entry must be 1-160 characters, a single line, not only whitespace.
// No trailing newline is written, so the file's character count is exactly the
// reply's length and the gate sees one clean line.
const chars = [...REPLY].length;
if (chars < 1 || chars > 160 || REPLY.trim().length === 0) {
  console.error(`entry must be 1-160 characters, got ${chars}`);
  process.exit(1);
}
if (REPLY.includes("\n") || REPLY.includes("\r")) {
  console.error("entry must be a single line");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), REPLY, "utf8");
