<template>
  <!-- Savaş Ekranı Bileşeni: Oyuncu ve rakip Pokémon'ların savaşını gösterir -->
  <div class="battle-bg">
    <div class="battle-container">
      <h1 class="center">Savaş Ekranı</h1>
      <div class="battle-area">
        <!-- Oyuncu Pokémon alanı -->
        <div class="pokemon-side">
          <h3>Oyuncu</h3>
          <img :src="player.image" :alt="player.name" width="100" />
          <div>{{ player.name }} ({{ player.type }})</div>
          <!-- Oyuncu HP barı -->
          <div class="hp-bar">
            <div class="hp-inner" :style="{ width: playerHP + '%' }"></div>
          </div>
          <div>HP: {{ playerHP }}</div>
        </div>

        <!-- Rakip Pokémon alanı -->
        <div class="pokemon-side">
          <h3>Rakip</h3>
          <img :src="opponent.image" :alt="opponent.name" width="100" />
          <div>{{ opponent.name }} ({{ opponent.type }})</div>
          <!-- Rakip HP barı -->
          <div class="hp-bar">
            <div class="hp-inner" :style="{ width: opponentHP + '%' }"></div>
          </div>
          <div>HP: {{ opponentHP }}</div>
        </div>
      </div>

      <!-- Saldırı butonları alanı (savaş devam ediyorsa gösterilir) -->
      <div v-if="!battleEnded" class="actions">
        <!-- Normal saldırı butonu -->
        <button @click="attack('normal')" :disabled="turn !== 'player'">Normal Attack</button>
        <!-- Özel saldırı butonu (cooldown kontrolü ile) -->
        <button @click="attack('special')" :disabled="playerCooldown > 0 || turn !== 'player'">Special Attack <span v-if="playerCooldown > 0">({{ playerCooldown }})</span></button>
      </div>
      <!-- Savaş bittiyse sonuç ve Sonuç Ekranına Git butonu -->
      <div v-else class="result-area">
        <h2 class="center">{{ resultText }}</h2>
        <button @click="goResult">Sonuç Ekranına Git</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Gerekli Vue ve store modüllerini içe aktar
import { ref, computed, watch } from 'vue';
import { useBattleStore } from '../store/battleStore'; // Pinia store
import { useRouter } from 'vue-router'; // Vue Router

// Pinia store ve Router örneklerini al
const store = useBattleStore();
const router = useRouter();

// Oyuncu ve rakip Pokémon verilerini store'dan al
const player = store.playerPokemon;
const opponent = store.opponentPokemon;

// Savaş durumunu ve değişkenlerini tanımla (ref ile reaktif yap)
const playerHP = ref(100); // Oyuncu HP'si
const opponentHP = ref(100); // Rakip HP'si
const playerCooldown = ref(0); // Oyuncunun özel saldırı cooldown'ı
const opponentCooldown = ref(0); // Rakibin özel saldırı cooldown'ı
const turn = ref('player'); // Sıra kimde (başlangıçta oyuncuda)
const battleEnded = ref(false); // Savaşın bitip bitmediği
const resultText = ref(''); // Savaş sonucu metni (örn: Kazandın!)
const turns = ref(0); // Toplam tur sayısı

// Tür avantajı hesaplama fonksiyonu
// Saldıran ve savunmacının türüne göre hasar çarpanını döndürür
function getTypeMultiplier(attacker, defender) {
  // Eğer saldıran güçlü olduğu türlere karşıysa (2x hasar)
  if (attacker.strongAgainst && attacker.strongAgainst.includes(defender.type)) return 2;
  // Eğer saldıran zayıf olduğu türlere karşıysa (0.5x hasar)
  if (attacker.weakAgainst && attacker.weakAgainst.includes(defender.type)) return 0.5;
  // Normal hasar (1x)
  return 1;
}

// Saldırı fonksiyonu (oyuncu saldırısı)
// type: 'normal' veya 'special'
function attack(type) {
  if (battleEnded.value) return; // Savaş bittiyse saldırı yapma

  let damage = 0;
  if (type === 'normal') {
    // Normal saldırı gücü ve tür çarpanı ile hasarı hesapla
    damage = player.basicAttack.power * getTypeMultiplier(player, opponent);
  } else if (type === 'special' && playerCooldown.value === 0) {
    // Özel saldırı gücü ve tür çarpanı ile hasarı hesapla (cooldown yoksa)
    damage = player.abilities[0].power * getTypeMultiplier(player, opponent);
    // Özel saldırı sonrası cooldown başlat (3 tur)
    playerCooldown.value = 3;
  } else {
    return; // Cooldown varsa veya geçersiz saldırı türü ise çık
  }

  // Rakip HP'sini güncelle (negatif olamaz)
  opponentHP.value = Math.max(0, opponentHP.value - damage);
  // Oyuncu cooldown'ını azalt (special attack kullanıldıysa)
  playerCooldown.value = Math.max(0, playerCooldown.value - 1);
  turns.value++; // Tur sayısını artır
  checkBattleEnd(); // Savaşın bitip bitmediğini kontrol et

  // Savaş devam ediyorsa sırayı rakibe geçir ve rakip saldırısını tetikle
  if (!battleEnded.value) {
    turn.value = 'opponent';
    setTimeout(opponentAttack, 1000); // Rakip saldırısı 1 saniye sonra
  }
}

// Rakip saldırısı fonksiyonu
function opponentAttack() {
  if (battleEnded.value) return; // Savaş bittiyse saldırı yapma

  let type = 'normal';
  // Rastgele olarak veya cooldown yoksa özel saldırı kullanabilir
  if (opponent.abilities && opponentCooldown.value === 0 && Math.random() > 0.5) {
    type = 'special';
  }

  let damage = 0;
  if (type === 'normal') {
    // Normal saldırı hasarını hesapla
    damage = opponent.basicAttack.power * getTypeMultiplier(opponent, player);
  } else if (type === 'special') {
    // Özel saldırı hasarını hesapla ve cooldown başlat (3 tur)
    damage = opponent.abilities[0].power * getTypeMultiplier(opponent, player);
    opponentCooldown.value = 3;
  }

  // Oyuncu HP'sini güncelle (negatif olamaz)
  playerHP.value = Math.max(0, playerHP.value - damage);
  // Rakip cooldown'ını azalt
  opponentCooldown.value = Math.max(0, opponentCooldown.value - 1);
  checkBattleEnd(); // Savaşın bitip bitmediğini kontrol et

  // Savaş devam ediyorsa sırayı oyuncuya geçir
  if (!battleEnded.value) {
    turn.value = 'player';
  }
}

// Savaşın bitip bitmediğini kontrol eden fonksiyon
function checkBattleEnd() {
  // Oyuncu veya rakip HP'si 0 veya altındaysa savaş biter
  if (playerHP.value <= 0 || opponentHP.value <= 0) {
    battleEnded.value = true; // Savaş bitti olarak işaretle
    // Kazananı belirle ve sonuç metnini ayarla
    if (playerHP.value > opponentHP.value) resultText.value = 'Kazandın!';
    else if (playerHP.value < opponentHP.value) resultText.value = 'Kaybettin!';
    else resultText.value = 'Berabere!';
    // Savaş kaydını backend'e gönder
    saveBattleLog();
  }
}

// Sonuç ekranına yönlendirme fonksiyonu
function goResult() {
  // Store'da savaş sonucunu ayarla ve sonuç ekranına yönlendir
  store.endBattle(resultText.value === 'Kazandın!' ? 'win' : 'lose');
  router.push('/result');
}

// Savaş kaydını backend API'ye gönderen fonksiyon
function saveBattleLog() {
  fetch('http://localhost:3001/api/battle-log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      player: player.name,
      opponent: opponent.name,
      winner: playerHP.value > opponentHP.value ? 'player' : 'opponent',
      turns: turns.value
    })
  });
}

// turn (sıra) değişkeni değiştiğinde cooldownları azaltan watch fonksiyonu
// Her tur sonunda cooldown 1 azalır
watch(turn, () => {
  if (turn.value === 'player' && playerCooldown.value > 0) playerCooldown.value--;
  if (turn.value === 'opponent' && opponentCooldown.value > 0) opponentCooldown.value--;
});

// Bileşen yüklendiğinde savaş durumunu sıfırla (her yeni savaş için)
playerHP.value = 100; // Oyuncu HP'si başlangıç değeri
opponentHP.value = 100; // Rakip HP'si başlangıç değeri
playerCooldown.value = 0; // Oyuncu cooldown'ı başlangıç değeri
opponentCooldown.value = 0; // Rakip cooldown'ı başlangıç değeri
turn.value = 'player'; // İlk sıra oyuncuda
battleEnded.value = false; // Savaş bitmedi
resultText.value = ''; // Sonuç metni boş
turns.value = 0; // Tur sayısı sıfır

// Store'daki cooldown değerlerini de sıfırla
store.playerCooldown = 0;
store.opponentCooldown = 0;
</script>

<style scoped>
.battle-bg {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.battle-container {
  background: rgba(255,255,255,0.97);
  border-radius: 18px;
  box-shadow: 0 4px 24px #0002;
  padding: 2.5rem 2rem;
  text-align: center;
  min-width: 350px;
  max-width: 700px;
  width: 90vw;
  box-sizing: border-box;
}
.center {
  text-align: center;
}
.result-area {
  margin-top: 2rem;
}
.battle-area {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 3rem;
  margin-bottom: 2rem;
}
.pokemon-side {
  width: 260px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px #0001;
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hp-bar {
  width: 100%;
  height: 18px;
  background: #eee;
  border-radius: 8px;
  margin: 0.5rem 0;
  overflow: hidden;
}
.hp-inner {
  height: 100%;
  background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
  transition: width 0.5s;
}
.actions {
  display: flex;
  gap: 1rem;
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
  margin-top: 1rem;
}
button:disabled {
  background: #aaa;
  cursor: not-allowed;
}
@media (max-width: 700px) {
  .battle-area {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  .pokemon-side {
    width: 90vw;
    max-width: 320px;
  }
}
</style> 