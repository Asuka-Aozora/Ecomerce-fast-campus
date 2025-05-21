// index.js
import express from "express";
import cors from "cors";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from "path";
import { fileURLToPath } from "url";


// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT =  5000;
app.use(cors());
app.use(express.json());

// Initialize LowDB
const file = path.join(__dirname, "db", "data.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Load data
await db.read();
// Set defaults if file is empty
db.data ||= { products: [], users: [], carts: [], transactions: [] };
await db.write();

// Helper: CRUD factory
function createCRUD(route, collection) {
  // GET all
  app.get(route, (req, res) => {
    res.json(db.data[collection]);
  });
  // GET by ID
  app.get(`${route}/:id`, (req, res) => {
    const item = db.data[collection].find((i) => i.id === req.params.id);
    item
      ? res.json(item)
      : res.status(404).json({ error: `${collection.slice(0, -1)} not found` });
  });
  // POST create
  app.post(route, async (req, res) => {
    const newItem = { id: Date.now().toString(), ...req.body };
    db.data[collection].push(newItem);
    await db.write();
    res.status(201).json(newItem);
  });
  // PUT update
  app.put(`${route}/:id`, async (req, res) => {
    const idx = db.data[collection].findIndex((i) => i.id === req.params.id);
    if (idx === -1)
      return res
        .status(404)
        .json({ error: `${collection.slice(0, -1)} not found` });
    db.data[collection][idx] = { ...db.data[collection][idx], ...req.body };
    await db.write();
    res.json(db.data[collection][idx]);
  });
  // DELETE
  app.delete(`${route}/:id`, async (req, res) => {
    const idx = db.data[collection].findIndex((i) => i.id === req.params.id);
    if (idx === -1)
      return res
        .status(404)
        .json({ error: `${collection.slice(0, -1)} not found` });
    db.data[collection].splice(idx, 1);
    await db.write();
    res.json({ deleted: true });
  });
}

// Create endpoints for all collections
createCRUD("/products", "products");
createCRUD("/users", "users");
createCRUD("/carts", "carts");
createCRUD("/transactions", "transactions");

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
