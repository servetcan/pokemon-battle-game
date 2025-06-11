import { defineStore } from 'pinia';

// Pinia Battle Store'u tanımlama
export const useBattleStore = defineStore('battle', {
  // State (durum) tanımlamaları: Uygulama genelinde paylaşılacak veriler
  state: () => ({
    playerPokemon: null, // Oyuncunun seçtiği Pokémon objesi
    opponentPokemon: null, // Rakibin seçtiği Pokémon objesi
    battleStarted: false, // Savaşın başlayıp başlamadığı durumu
    battleResult: null, // Savaşın sonucu (örn: 'win', 'lose')
    battleHistory: [], // Kaydedilen savaş geçmişi listesi
    playerHP: 100, // Oyuncu Pokémon'un anlık HP'si
    opponentHP: 100, // Rakip Pokémon'un anlık HP'si
    playerCooldown: 0, // Oyuncu özel saldırı cooldown sayacı
    opponentCooldown: 0, // Rakip özel saldırı cooldown sayacı
    turns: 0 // Savaşta geçen tur sayısı
  }),
  // Actions (eylemler) tanımlamaları: State'i değiştiren fonksiyonlar
  actions: {
    // Pokémonları seçme ve savaş değişkenlerini sıfırlama eylemi
    selectPokemons(player, opponent) {
      this.playerPokemon = player;
      this.opponentPokemon = opponent;
      this.playerHP = 100; // HP'yi başlangıç değerine sıfırla
      this.opponentHP = 100;
      this.battleStarted = false; // Savaş başlamadı olarak ayarla
      this.battleResult = null; // Sonucu sıfırla
      this.playerCooldown = 0; // Cooldownları sıfırla
      this.opponentCooldown = 0;
      this.turns = 0; // Tur sayısını sıfırla
    },
    // Savaşı başlatan eylem
    startBattle() {
      this.battleStarted = true;
    },
    // Savaşı bitiren eylem ve sonucu kaydetme
    endBattle(result) {
      this.battleResult = result;
      this.battleStarted = false;
    },
    // Savaş durumunu tamamen sıfırlayan eylem (yeni oyun için)
    resetBattle() {
      this.playerPokemon = null;
      this.opponentPokemon = null;
      this.battleStarted = false;
      this.battleResult = null;
      this.playerHP = 100;
      this.opponentHP = 100;
      this.playerCooldown = 0;
      this.opponentCooldown = 0;
      this.turns = 0;
    },
    // Savaş geçmişini güncelleyen eylem
    setBattleHistory(history) {
      this.battleHistory = history;
    }
  }
}); 