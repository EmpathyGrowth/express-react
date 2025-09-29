// Importér Express og initialisér app
const express = require("express"); // Importér Express framework
const app = express(); // Opret en ny Express-app
const PORT = 3000; // Definér porten, som serveren skal køre på

// Middleware til at parse JSON fra request body
app.use(express.json()); // Gør det muligt at læse JSON i POST/PUT requests

// In-memory array til at gemme items (simulerer en database)
let items = [];

// --------------
// CRUD ENDPOINTS
// --------------

// CREATE: Tilføj et nyt item (POST) med error handling
app.post("/items", (req, res) => {
  const { name, description } = req.body; // Hent data fra request body
  if (!name || !description) {
    // Tjek for required fields
    return res.status(400).json({ error: "Navn og beskrivelse er påkrævet" }); // Returnér 400 Bad Request og error message hvis navn eller beskrivelse mangler
  }
  // Lav nyt item med auto-increment id
  const newItem = { id: items.length + 1, name, description };

  // Tilføj item til array (vores "database")
  items.push(newItem);

  // Send det nye item tilbage til klienten med status 201 (Created)
  res.status(201).json({ success: true, message: newItem }); // Returnér 201 Created og success message med det nye item
});

// READ: Hent alle items
app.get("/items", (req, res) => {
  res.json(items); // Returnér hele listen med items
});

// READ: Hent et enkelt item efter id
app.get("/items/:id", (req, res) => {
  // Find item med id, som klienten har sendt i URL
  const item = items.find((i = i.id === parseInt(req.params.id)));

  // Hvis item ikke findes, returnér 404
  if (!item) return res.status(404).json({ message: "Item ikke fundet" });

  // Ellers send item tilbage
  res.json(item);
});

// UPDATE: Opdater et item efter id
app.put("/items/:id", (req, res) => {
  // Find item med id
  const item = items.find((i) => i.id === parseInt(req.params.id));

  if (!item) return res.status(404).json({ message: "Item ikke fundet" });

  const { name, description } = req.body;

  // Opdater item med nye værdier
  if (name) item.name = name;
  if (description) item.description = description;

  res.json(item);
});

// DELETE: Slet et item efter id
app.delete("/items/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));

  if (index === -1)
    return res.status(404).json({ message: "Item ikke fundet" });

  items.splice(index, 1);

  res.json({ success: true, message: "Item slettet" });
});

// Start serveren
app.listen(PORT, () => {
  console.log(`Server kører på http://localhost:${PORT}`);
});
