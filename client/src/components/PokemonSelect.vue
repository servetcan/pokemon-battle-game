<template>
  <!-- Pokémon seçim ekranı: Oyuncu ve rakip için seçim yapılır -->
  <div class="select-bg">
    <div class="select-container">
      <h1>Pokémon Seçimi</h1>
      <div v-if="loading">Yükleniyor...</div>
      <div v-else>
        <h3>Oyuncu Pokémon'unu Seç</h3>
        <div class="pokemon-list">
          <div
            v-for="pokemon in pokemons"
            :key="pokemon.id"
            :class="['pokemon-card', { selected: selectedPlayer && selectedPlayer.id === pokemon.id }]"
            @click="selectPlayer(pokemon)"
          >
            <img :src="pokemon.image" :alt="pokemon.name" width="80" height="80" />
            <div>{{ pokemon.name }}</div>
            <div>Tip: {{ pokemon.type }}</div>
          </div>
        </div>

        <h3>Rakip Pokémon'u Seç</h3>
        <div class="pokemon-list">
          <div
            v-for="pokemon in pokemons"
            :key="'opponent-' + pokemon.id"
            :class="['pokemon-card', { selected: selectedOpponent && selectedOpponent.id === pokemon.id }]"
            @click="selectOpponent(pokemon)"
          >
            <img :src="pokemon.image" :alt="pokemon.name" width="80" height="80" />
            <div>{{ pokemon.name }}</div>
            <div>Tip: {{ pokemon.type }}</div>
          </div>
        </div>

        <!-- Savaş başlatma butonu -->
        <button :disabled="!selectedPlayer || !selectedOpponent" @click="startBattle">
          Start Battle
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Gerekli Vue ve store fonksiyonlarını içe aktar
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBattleStore } from '../store/battleStore';

// Pokémon listesini, yüklenme durumunu ve seçimleri tutan değişkenler
const pokemons = ref([]);
const loading = ref(true);
const selectedPlayer = ref(null);
const selectedOpponent = ref(null);
const router = useRouter();
const store = useBattleStore();

// API'den Pokémon verilerini çeken fonksiyon
const fetchPokemons = async () => {
  loading.value = true;
  try {
    const res = await fetch('http://localhost:3001/api/pokemons');
    pokemons.value = await res.json();
  } catch (e) {
    alert('Pokémon verileri alınamadı!');
  }
  loading.value = false;
};

// Oyuncu Pokémon'u seçme fonksiyonu
const selectPlayer = (pokemon) => {
  selectedPlayer.value = pokemon;
};
// Rakip Pokémon'u seçme fonksiyonu
const selectOpponent = (pokemon) => {
  selectedOpponent.value = pokemon;
};

// Savaş başlatma fonksiyonu
const startBattle = () => {
  store.selectPokemons(selectedPlayer.value, selectedOpponent.value);
  router.push('/battle');
};

// Bileşen yüklendiğinde Pokémon listesini çek
onMounted(fetchPokemons);
</script>

<style scoped>
.select-bg {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #1976d2 0%, #43e97b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.select-container {
  background: rgba(255,255,255,0.97);
  border-radius: 18px;
  box-shadow: 0 4px 24px #0002;
  padding: 2.5rem 2rem;
  text-align: center;
  min-width: 350px;
  max-width: 600px;
}
h1 {
  margin-bottom: 1.2rem;
  color: #1976d2;
}
h3 {
  margin-top: 1.5rem;
  color: #43a047;
}
.pokemon-list {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  justify-content: center;
}
.pokemon-card {
  border: 2px solid #ccc;
  border-radius: 8px;
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
  background: #fff;
  transition: border 0.2s, background 0.2s;
  min-width: 110px;
}
.pokemon-card.selected {
  border: 2px solid #1976d2;
  background: #e3f2fd;
}
button {
  padding: 0.5rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 6px;
  border: none;
  background: #1976d2;
  color: #fff;
  cursor: pointer;
  margin-top: 1rem;
}
button:disabled {
  background: #aaa;
  cursor: not-allowed;
}
</style> 