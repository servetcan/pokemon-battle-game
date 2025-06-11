// Vue uygulamasının ana giriş dosyası
import { createApp } from 'vue'; // Vue uygulamasını oluşturmak için createApp fonksiyonunu içe aktar
import { createPinia } from 'pinia'; // Pinia state yönetim kütüphanesini içe aktar
import App from './App.vue'; // Ana Vue bileşenini (root component) içe aktar
import router from './router'; // Vue Router kurulumunu içe aktar

// Yeni bir Vue uygulaması örneği oluştur
const app = createApp(App);

// Pinia'yı Vue uygulamasına ekle (state yönetimi için)
app.use(createPinia());

// Vue Router'ı Vue uygulamasına ekle (sayfa yönlendirmeleri için)
app.use(router);

// Vue uygulamasını HTML'deki id'si 'app' olan DOM elementine bağla
app.mount('#app');