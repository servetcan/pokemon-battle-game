<template>
  <!-- Karşılama Ekranı Bileşeni: Oyunun başlangıç tanıtımını ve kurallarını gösterir -->
  <div class="welcome-bg">
    <div class="welcome-center">
      <div class="welcome-container">
        <h1>Pokémon Battle Web Oyunu</h1>
        <!-- Oyunun genel açıklaması -->
        <p>
          Bu oyunda kendi Pokémon'unu seçip rakibinle savaşabilirsin!<br>
          Saldırı türlerini akıllıca kullan, tür avantajlarını unutma.<br>
          Kazanmak için rakibinin HP'sini sıfıra indir!
        </p>
        <!-- Oyun kuralları listesi -->
        <ul>
          <li>Normal Attack her zaman kullanılabilir.</li>
          <li>Special Attack için cooldown beklemen gerekir.</li>
          <li>Tür avantajı: StrongAgainst → 2x, WeakAgainst → 0.5x hasar.</li>
        </ul>
        <!-- Oyunu başlatma butonu -->
        <button @click="startGame">Oyuna Başla</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Gerekli Vue Router modülünü içe aktar
import { useRouter } from 'vue-router';

// Router örneğini al
const router = useRouter();

// Oyunu başlatma ve seçim ekranına yönlendirme fonksiyonu
function startGame() {
  router.push('/select'); // Seçim ekranına yönlendir
}
</script>

<style scoped>
.welcome-bg {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
}
.welcome-center {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.welcome-container {
  background: rgba(255,255,255,0.95);
  border-radius: 18px;
  box-shadow: 0 4px 24px #0002;
  padding: 3rem 2.5rem;
  text-align: center;
  max-width: 420px;
  width: 90vw;
  box-sizing: border-box;
}
h1 {
  margin-bottom: 1.2rem;
  color: #1976d2;
}
p {
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
}
ul {
  text-align: left;
  margin-bottom: 2rem;
  color: #333;
  padding-left: 1.2rem;
}
button {
  padding: 0.7rem 2.2rem;
  font-size: 1.2rem;
  border-radius: 8px;
  border: none;
  background: #1976d2;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background: #125ea2;
}
@media (max-width: 600px) {
  .welcome-container {
    padding: 1.2rem 0.5rem;
    max-width: 98vw;
  }
}
</style> 