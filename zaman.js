/* ============================================================
   zaman.js — Bilâd-ı Mütenâfise ortak oyun günü / saat modülü
   ------------------------------------------------------------
   Amaç: Gün sayısı her cihazda AYNI hesaplansın.
   - Gün, cihazda kayıtlı bir sayıdan değil, tek bir ortak
     BASLANGIC tarihinden hesaplanır.
   - Cihaz saati yanlışsa, sitenin sunucu saatiyle düzeltilir.
   Güncelleme gerekirse sadece AYARLAR bölümünü değiştir.
   ============================================================ */
(function (global) {
  "use strict";

  /* ---------------- AYARLAR (sadece burayı değiştir) ---------------- */
  var AYARLAR = {
    // Oyunun 1. günü başladığı an. Türkiye saatiyle gece yarısı.
    // Şu an 18. gün olması için 14 Ekim 2026 seçildi.
    // 18. günün yerine başka bir gün istersen bu tarihi kaydır.
    BASLANGIC: "2026-10-14T00:00:00+03:00",

    // 1 oyun günü kaç milisaniye? 24 saat = gerçek bir gün.
    // Oyun günü daha hızlı geçsin istersen küçült (örn. 6 saat).
    GUN_SURESI_MS: 24 * 60 * 60 * 1000,

    // Cihaz saatini sunucu saatiyle düzeltsin mi?
    SUNUCU_SAATI_KULLAN: true
  };
  /* ------------------------------------------------------------------ */

  var baslangicMs = new Date(AYARLAR.BASLANGIC).getTime();
  var sapmaMs = 0;      // sunucu saati - cihaz saati
  var hazirMi = false;
  var dinleyiciler = [];
  var sonGun = null;

  function simdi() {
    return Date.now() + sapmaMs;
  }

  function gun() {
    var g = Math.floor((simdi() - baslangicMs) / AYARLAR.GUN_SURESI_MS) + 1;
    return g < 1 ? 1 : g;
  }

  function sonrakiGuneKalanMs() {
    var gecen = (simdi() - baslangicMs) % AYARLAR.GUN_SURESI_MS;
    return AYARLAR.GUN_SURESI_MS - gecen;
  }

  // Sunucu saatini oku (aynı siteye HEAD isteği, "Date" başlığı)
  function sunucuyla_esitle() {
    if (!AYARLAR.SUNUCU_SAATI_KULLAN || !global.fetch) {
      return Promise.resolve();
    }
    var t0 = Date.now();
    return fetch(global.location.href.split("#")[0], {
      method: "HEAD",
      cache: "no-store"
    })
      .then(function (r) {
        var t1 = Date.now();
        var d = r.headers.get("Date");
        if (!d) return;
        var sunucu = new Date(d).getTime();
        if (isNaN(sunucu)) return;
        // gidiş-dönüş süresinin yarısını telafi et
        sapmaMs = sunucu + (t1 - t0) / 2 - t1;
      })
      .catch(function () {
        /* internet yoksa cihaz saatiyle devam */
      });
  }

  function gunDegisti() {
    var g = gun();
    if (g !== sonGun) {
      sonGun = g;
      dinleyiciler.forEach(function (fn) {
        try { fn(g); } catch (e) { console.error(e); }
      });
    }
  }

  function gunDegisince(fn) {
    dinleyiciler.push(fn);
    if (hazirMi) fn(gun());
  }

  var hazir = sunucuyla_esitle().then(function () {
    hazirMi = true;
    gunDegisti();
    // Her 30 saniyede bir gün değişti mi kontrol et
    setInterval(gunDegisti, 30000);
    // Uygulamaya geri dönüldüğünde de kontrol et (telefon arka plandan gelince)
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) gunDegisti();
    });
  });

  global.Zaman = {
    hazir: hazir,                    // Promise: saat eşitlendi
    gun: gun,                        // şu anki oyun günü (sayı)
    simdi: simdi,                    // düzeltilmiş şu anki zaman (ms)
    sonrakiGuneKalanMs: sonrakiGuneKalanMs,
    gunDegisince: gunDegisince,      // gün değişince fonksiyon çalıştır
    ayarlar: AYARLAR
  };
})(window);
