<template>
  <!-- Sonuç Ekranı Bileşeni: Savaş sonucunu gösterir ve yeni oyun seçenekleri sunar -->
  <div class="result-bg">
    <div class="result-container">
      <h1>Sonuç Ekranı</h1>
      <!-- Savaş sonucuna göre kazanan veya kaybeden mesajı -->
      <h2 v-if="result === 'win'">You Win!</h2>
      <h2 v-else>You Lose!</h2>
      <div class="actions">
        <!-- Aynı Pokémon'larla tekrar oyna butonu -->
        <button @click="playAgain">Play Again</button>
        <!-- Yeni Pokémon seçme butonu -->
        <button @click="chooseNew">Choose New Pokémon</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Gerekli Pinia store ve Vue Router modüllerini içe aktar
import { useBattleStore } from '../store/battleStore';
import { useRouter } from 'vue-router';

// Pinia store ve Router örneklerini al
const store = useBattleStore();
const router = useRouter();

// Savaş sonucunu store'dan al
const result = store.battleResult;

// Aynı Pokémon'larla tekrar savaş başlatma fonksiyonu
function playAgain() {
  // Store'daki mevcut Pokémon'ları tekrar seç ve savaş ekranına yönlendir
  store.selectPokemons(store.playerPokemon, store.opponentPokemon);
  router.push('/battle');
}

// Yeni Pokémon seçimi için ana ekrana dönme fonksiyonu
function chooseNew() {
  // Store'daki savaş durumunu sıfırla ve seçim ekranına yönlendir
  store.resetBattle();
  router.push('/select');
}
</script>

<style scoped>
.result-bg {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.result-container {
  background: rgba(255,255,255,0.97);
  border-radius: 18px;
  box-shadow: 0 4px 24px #0002;
  padding: 2.5rem 2rem;
  text-align: center;
  min-width: 350px;
  max-width: 420px;
  width: 90vw;
  box-sizing: border-box;
}
h1 {
  margin-bottom: 1.2rem;
  color: #1976d2;
}
h2 {
  margin-bottom: 1.2rem;
  color: #43a047;
}
.actions {
  margin-top: 2rem;
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}
button {
  padding: 0.5rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 6px;
  border: none;
  background: #1976d2;
  color: #fff;
  cursor: pointer;
}
button:hover {
  background: #125ea2;
}
</style> 