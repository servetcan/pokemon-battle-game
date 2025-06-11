// Vue Router kurulumu: Uygulama içi sayfa geçişlerini yönetir
import { createRouter, createWebHistory } from 'vue-router';

// Bileşenleri içe aktar
import WelcomeScreen from '../components/WelcomeScreen.vue'; // Karşılama ekranı
import PokemonSelect from '../components/PokemonSelect.vue'; // Pokémon seçim ekranı
import BattleScreen from '../components/BattleScreen.vue'; // Savaş ekranı
import ResultScreen from '../components/ResultScreen.vue'; // Sonuç ekranı
import BattleHistory from '../components/BattleHistory.vue'; // Savaş geçmişi ekranı

// Rota tanımlamaları: Hangi URL'in hangi bileşene karşılık geldiğini belirtir
const routes = [
  // Ana sayfa: Karşılama ekranı
  { path: '/', name: 'Welcome', component: WelcomeScreen },
  // Pokémon seçim sayfası
  { path: '/select', name: 'Select', component: PokemonSelect },
  // Savaş sayfası
  { path: '/battle', name: 'Battle', component: BattleScreen },
  // Savaş sonuç sayfası
  { path: '/result', name: 'Result', component: ResultScreen },
  // Savaş geçmişi sayfası
  { path: '/history', name: 'History', component: BattleHistory }
];

// Router örneğini oluştur
const router = createRouter({
  history: createWebHistory(), // Tarayıcı geçmişini kullan (URL'de # olmadan)
  routes // Tanımlanan rotaları kullan
});

// Router'ı dışa aktar (main.js'de kullanılacak)
export default router; 