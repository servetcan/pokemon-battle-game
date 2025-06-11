// Express.js sunucusu: Pokémon ve savaş API'si
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors()); // CORS desteği
app.use(express.json()); // JSON gövde desteği

// Pokémon ve savaş verisi dosyalarının yolu
const pokemons = require('./data/pokemons.json');
const battlesFile = path.join(__dirname, 'data', 'battles.json');

// Tüm Pokémon'ları dönen API
app.get('/api/pokemons', (req, res) => {
  res.json(pokemons);
});

// Belirli bir Pokémon'u ID ile dönen API
app.get('/api/pokemons/:id', (req, res) => {
  const pokemon = pokemons.find(p => p.id == req.params.id);
  if (pokemon) res.json(pokemon);
  else res.status(404).json({ error: 'Not found' });
});

// Savaş kaydı ekleyen API
app.post('/api/battle-log', (req, res) => {
  const battle = req.body;
  let battles = [];
  // Eğer dosya varsa mevcut savaşları oku
  if (fs.existsSync(battlesFile)) {
    battles = JSON.parse(fs.readFileSync(battlesFile));
  }
  battles.push(battle); // Yeni savaşı ekle
  fs.writeFileSync(battlesFile, JSON.stringify(battles, null, 2));
  res.json({ success: true });
});

// Savaş geçmişini dönen API
app.get('/api/battle-history', (req, res) => {
  if (fs.existsSync(battlesFile)) {
    const battles = JSON.parse(fs.readFileSync(battlesFile));
    res.json(battles);
  } else {
    res.json([]);
  }
});

// Sunucuyu başlat
const PORT = 3001;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor!`)); 