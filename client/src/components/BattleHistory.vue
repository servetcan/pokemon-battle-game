<template>
  <!-- Savaş Geçmişi Ekranı Bileşeni: Kaydedilmiş savaşların listesini gösterir -->
  <div class="history-bg">
    <div class="history-container">
      <h1>Savaş Geçmişi</h1>
      <!-- Geçmişi yenileme butonu -->
      <button @click="fetchHistory">Yenile</button>
      <!-- Eğer geçmişte savaş varsa tabloyu göster -->
      <table v-if="history.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>Oyuncu</th>
            <th>Rakip</th>
            <th>Kazanan</th>
            <th>Tur Sayısı</th>
          </tr>
        </thead>
        <tbody>
          <!-- Her bir savaş kaydı için tablo satırı -->
          <tr v-for="(battle, i) in history" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ battle.player }}</td>
            <td>{{ battle.opponent }}</td>
            <td>{{ battle.winner === 'player' ? 'Oyuncu' : 'Rakip' }}</td>
            <td>{{ battle.turns }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Savaş geçmişi yoksa bilgilendirme mesajı -->
      <div v-else>
        Henüz savaş geçmişi yok.
      </div>
    </div>
  </div>
</template>

<script setup>
// Gerekli Vue modüllerini içe aktar
import { ref, onMounted } from 'vue';

// Savaş geçmişi verisini tutan reaktif değişken
const history = ref([]);

// API'den savaş geçmişini çeken fonksiyon
async function fetchHistory() {
  try {
    const res = await fetch('http://localhost:3001/api/battle-history');
    history.value = await res.json();
  } catch (e) {
    alert('Geçmiş alınamadı!');
  }
}

// Bileşen yüklendiğinde savaş geçmişini otomatik olarak çek
onMounted(fetchHistory);
</script>

<style scoped>
.history-bg {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #f5d020 0%, #f53803 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.history-container {
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
  color: #d2691e;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px #0001;
}
th, td {
  border: 1px solid #eee;
  padding: 0.5rem 1rem;
  text-align: center;
}
th {
  background: #f5d020;
  color: #333;
  font-weight: bold;
}
button {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 0.4rem 1.2rem;
  border-radius: 6px;
  border: none;
  background: #d2691e;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
}
button:hover {
  background: #a0522d;
}
</style> 