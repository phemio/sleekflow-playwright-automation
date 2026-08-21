import fs from 'fs';
import path from 'path';

const STORAGE_FILE = path.resolve(__dirname, '..', 'test-results', 'email-counter.json');

/** @internal — ensure parent directory exists */
function ensureDir(): void {
  const dir = path.dirname(STORAGE_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/** Read saved state: `{ date, lastIndex }` */
function readState(): { date: string; lastIndex: number } | null {
  try {
    const raw = fs.readFileSync(STORAGE_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Save state atomically (write tmp → rename) */
function writeState(state: { date: string; lastIndex: number }): void {
  const tmpFile = STORAGE_FILE + '.tmp';
  fs.writeFileSync(tmpFile, JSON.stringify(state));
  try {
    fs.renameSync(tmpFile, STORAGE_FILE);
  } catch {
    // If atomic rename fails, try direct write as fallback
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(state));
  }
}

/** Generate `ddmmyy{index}@test.sleekflow.io` */
export function newUniqueEmail(): string {
  const now = new Date();
  const ddmmyy = [
    String(now.getDate()).padStart(2, '0'),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getFullYear()).slice(-2),
  ].join('');

  ensureDir();

  let state = readState();

  // New day detected — reset counter but check manual offset
  if (!state || state.date !== ddmmyy) {
    // Auto-detect highest used index from existing emails in test results dir
    let maxIdx = 0;
    try {
      const dir = path.join(path.dirname(STORAGE_FILE), '..');
      // No need to scan — just start from 2 as user requested
      maxIdx = 2;
    } catch {
      /* ignore */
    }
    state = { date: ddmmyy, lastIndex: maxIdx };
  }

  const idx = state.lastIndex;
  const email = `${ddmmyy}${idx}@test.sleekflow.io`;

  // Increment for next call
  state.lastIndex++;
  writeState(state);

  return email;
}
