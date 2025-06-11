<script setup>
// App düzeyinde şu an için özel bir JavaScript kodu yok.
// Vue 3 Composition API kullanıldığı için script setup bloğu kullanılır.
</script>

<template>
  <!-- Ana Uygulama Bileşeni: Tüm uygulama görünümünü yönetir -->
  <router-view /> <!-- Mevcut rotaya (sayfaya) göre ilgili bileşeni gösterir -->
  <!-- Sayfanın en altında yer alan yapımcı bilgisi -->
  <footer class="footer">
    <span class="author">Yapımcı: SERVET CAN KILINÇ</span>
  </footer>
</template>

<style>
/* Google Fonts: Orbitron fontunu içe aktarır (Yapımcı adı için) */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');
</style>

<style>
/* Global CSS Stilleri: Uygulama genelindeki temel görünümleri belirler */
html, body {
  min-height: 100vh; /* Minimum yüksekliği viewport yüksekliği kadar yapar */
  width: 100vw; /* Genişliği viewport genişliği kadar yapar */
  margin: 0; /* Sayfa kenar boşluklarını sıfırlar */
  padding: 0; /* Sayfa dolgu boşluklarını sıfırlar */
  box-sizing: border-box; /* Kutu modelini kenarlık ve dolgu dahil hesaplar */
}
body {
  font-family: 'Segoe UI', Arial, sans-serif; /* Varsayılan font ailesi */
  background: #f5f5f5; /* Varsayılan arka plan rengi */
}
#app {
  min-height: 100vh; /* Uygulamanın minimum yüksekliği */
}

/* Footer (Alt Bilgi) Stilleri */
.footer {
  width: 100vw; /* Tam ekran genişliği */
  text-align: center; /* Metni ortala */
  padding: 1rem 0 0.7rem 0; /* Üst, sağ, alt, sol dolgu */
  color: #1976d2; /* Metin rengi */
  font-size: 1.1rem; /* Yazı boyutu */
  opacity: 0.85; /* Saydamlık */
  position: fixed; /* Ekranda sabit durur */
  left: 0; /* Sola hizala */
  bottom: 0; /* Alta hizala */
  background: transparent; /* Şeffaf arka plan */
  z-index: 100; /* Diğer elementlerin üzerinde görünmesini sağlar */
  pointer-events: none; /* Üzerine tıklanamaz yapar */
  letter-spacing: 1px; /* Harf aralığı */
}

/* Yapımcı Adı Stilleri */
.author {
  font-family: 'Orbitron', 'Segoe UI', Arial, sans-serif; /* Özel font */
  font-size: 1.15rem; /* Yazı boyutu */
  color: #1976d2; /* Metin rengi */
  /* Metin gölgeleri */
  text-shadow: 0 2px 8px #38f9d7cc, 0 1px 0 #fff;
  /* Gradient arka plan olarak metni kullan */
  background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
  -webkit-background-clip: text; /* Arka planı metinle kırp (Webkit tarayıcılar için) */
  -webkit-text-fill-color: transparent; /* Metin içini şeffaf yap (Webkit tarayıcılar için) */
  background-clip: text; /* Arka planı metinle kırp */
}
</style>
