# Pokemon Battle Web Oyunu

## Proje Açıklaması
Bu proje, Vue.js 3 (Vite) ve Express.js kullanılarak geliştirilmiş web tabanlı bir Pokémon savaş oyunudur. Oyuncular kendi Pokémon'unu seçip rakip Pokémon ile savaşabilir, saldırı türlerini ve tür avantajlarını kullanarak galip gelmeye çalışır.

## Klasör Yapısı
```
project-root/
├── client/   # Vue.js (frontend)
├── server/   # Express.js (backend)
```

## Kurulum ve Çalıştırma

### 1. Backend (Express.js) Kurulumu
```bash
cd server
npm install
npm start
```
Sunucu varsayılan olarak `http://localhost:3001` adresinde çalışır.

### 2. Frontend (Vue.js) Kurulumu
```bash
cd client
npm install
npm run dev
```
Frontend varsayılan olarak `http://localhost:5173` adresinde çalışır.

### 3. Pokémon Görselleri
- Tüm Pokémon görselleri `client/public/images/pokemons/` klasörüne eklenmelidir.
- Görsel isimleri ve yolları `server/data/pokemons.json` ile uyumlu olmalıdır.

## Kullanım
1. Oyuna girişte karşılama ekranı gelir.
2. "Oyuna Başla" ile Pokémon seçimi ekranına geçilir.
3. Oyuncu ve rakip Pokémon seçilir, savaş başlatılır.
4. Savaş ekranında saldırılar yapılır, tür avantajları ve cooldown sistemi işler.
5. Oyun bitince sonuç ekranı ve savaş geçmişi görüntülenebilir.

## Gereksinimler
- Node.js 16+
- NPM

## Yapımcı
**SERVET CAN KILINÇ**

---
Herhangi bir sorunda veya geliştirme isteğinde bana ulaşabilirsin! 