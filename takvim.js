/* ============================================================
   takvim.js — Bilâd-ı Mütenâfise: ortak oyun günü + gerçek tarih/saat
   ------------------------------------------------------------
   - "Gün N": herkes için AYNI sabit başlangıç tarihinden (MIAT) hesaplanır.
     Yeni indiren oyuncu da bugünün gününü görür (1 değil).
   - Başlıkta gerçek tarih ve saat canlı işler: "Gün 18 · 31.10.2026 19:41"
   - Sadece EKRANDA görünen bilgidir; oyun kurallarına/kayda dokunmaz.
   Güncelleme gerekirse sadece AYARLAR bölümünü değiştir.
   ============================================================ */
(function (global) {
  "use strict";

  /* ---------------- AYARLAR ---------------- */
  var AYARLAR = {
    // Oyunun 1. günü. Türkiye saatiyle gece yarısı (+03:00).
    // 13 Ekim istersen "2026-10-13T00:00:00+03:00" yap.
    MIAT: "2026-10-14T00:00:00+03:00",

    GUN_SURESI_MS: 24 * 60 * 60 * 1000, // 1 oyun günü = 1 gerçek gün

    SANIYE_GOSTER: false,   // true: "19:41:07", false: "19:41"
    TARIH_GOSTER: true      // false: sadece "Gün 18"
  };
  /* ----------------------------------------- */

  var miatMs = new Date(AYARLAR.MIAT).getTime();

  function iki(n) { return (n < 10 ? "0" : "") + n; }

  function gun() {
    var g = Math.floor((Date.now() - miatMs) / AYARLAR.GUN_SURESI_MS) + 1;
    return g < 1 ? 1 : g;
  }

  function tarihSaat() {
    var d = new Date();
    var t = iki(d.getDate()) + "." + iki(d.getMonth() + 1) + "." + d.getFullYear() +
            " " + iki(d.getHours()) + ":" + iki(d.getMinutes());
    if (AYARLAR.SANIYE_GOSTER) t += ":" + iki(d.getSeconds());
    return t;
  }

  function gunMetni() {
    return "Gün " + gun() + (AYARLAR.TARIH_GOSTER ? " · " + tarihSaat() : "");
  }

  function yenile() {
    var e = document.getElementById("hDay");
    if (e) {
      var m = gunMetni();
      if (e.textContent !== m) e.textContent = m;
    }
  }

  setInterval(yenile, 1000);

  global.Takvim = {
    gun: gun,               // sayı: bugünkü oyun günü
    tarihSaat: tarihSaat,   // "31.10.2026 19:41"
    gunMetni: gunMetni,     // "Gün 18 · 31.10.2026 19:41"
    ayarlar: AYARLAR
  };
})(window);
