// src/config/database.js
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';

// Pega o diretório atual
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Cria ou lê o arquivo db.json dentro da pasta config (ou onde preferir)
const file = path.join(__dirname, 'db.json');

const defaultData = { users: [], movies: [] };
const adapter = new JSONFile(file);
const db = new Low(adapter, defaultData);

await db.read(); // Lê os dados existentes no arquivo, se houver

export default db;