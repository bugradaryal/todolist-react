# Yapılacaklar Listesi (React + Vite)

Web Geliştirme; JavaScript Proje Yönergesi kapsamında hazırlanmış basit TODO uygulaması.

- **Kütüphane:** React (Vite ile)
- **Stil:** Pure CSS
- **Veri:** localStorage (giriş / kayıt / backend yok)
- **İşlemler:** Ekle, Listele, Güncelle (düzenle + tamamla), Sil, Temizle
- **Ekstra:** Öncelik, son tarih (gecikme uyarısı), arama, filtre, istatistik

## Çalıştırma

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Netlify: [https://todolist-softwarepersona.netlify.app/](https://todolist-softwarepersona.netlify.app/)

## Klasör yapısı

```
src/
  components/  Header, Footer, Stats, TodoForm, Toolbar, TodoList, TodoItem
  pages/       Home(localstorage ile birlikte)
  interfaces/  Todo (createTodo, PRIORITIES)
  assets/      logo.svg, todo-bg.jpg
```