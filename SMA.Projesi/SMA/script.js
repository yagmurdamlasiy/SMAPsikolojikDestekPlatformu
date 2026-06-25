
//Kayıt Olma İşlemi 
function kayitOl() {

    // Kullanıcının girdiği adı alır, baştaki–sondaki boşlukları siler ve küçük harfe çevirir (aynı isimle tekrar kayıt olunmaması için)
    let ad = document.getElementById("ad").value.trim().toLowerCase();

    // Çocuğun yaşı bilgisini inputtan alır
    let cocukYas = document.getElementById("cocukYas").value;

    // Hastalıkla mücadele süresini alır
    let sure = document.getElementById("sure").value;

    // Kullanıcının şifresini alır
    let sifre = document.getElementById("sifre").value;

    // Kullanıcının WhatsApp numarasını alır
    let telefon = document.getElementById("telefon").value;
    if (!telefon) {
    alert("WhatsApp numaranızı giriniz.");
    return;
}

    // Eğer alanlardan herhangi biri boşsa uyarı verir
    if (!ad || !cocukYas || !sure || !sifre) {
        alert("Lütfen tüm alanları doldurun!");
        return; // Fonksiyonu durdurur
    }

    // LocalStorage'da kayıtlı aileler listesini alır
    let aileler = JSON.parse(localStorage.getItem("aileler") || "[]");

    // Aynı kullanıcı adıyla daha önce kayıt yapılmış mı kontrol eder
    if (aileler.find(a => a.ad === ad)) {
        alert("Bu kullanıcı adı zaten kayıtlı!");
        return; // Kayıt işlemini durdurur
    }

    // Yeni kullanıcıyı aileler dizisine ekler
    aileler.push({
        ad: ad,
        cocukYas: Number(cocukYas), 
        sure: Number(sure),         
        sifre: sifre,
        telefon: telefon
    });

    // Güncellenmiş aileler listesini LocalStorage'a kaydeder
    localStorage.setItem("aileler", JSON.stringify(aileler));

    // Kullanıcıya kayıt başarılı mesajı gösterir
    alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");

    // Giriş sayfasına yönlendirir
    window.location.href = "giris.html";
}


//Giriş yapma İşlemi
function girisYap() {
  let ad = document.getElementById("user").value.trim().toLowerCase();
  let sifre = document.getElementById("pass").value;

    // Önce tüm uyarı mesajlarını gizliyoruz
document.getElementById("loginSuccess").style.display = "none";
document.getElementById("loginError").style.display = "none";
document.getElementById("loginEmpty").style.display = "none";

// Eğer kullanıcı adı veya şifre boşsa
if (!ad || !sifre) {

  // "Boş alan" uyarısını göster
  document.getElementById("loginEmpty").style.display = "block";

  // Fonksiyonu burada durdur
  return;
}

// LocalStorage'da kayıtlı aileleri alıyoruz
let aileler = JSON.parse(localStorage.getItem("aileler") || "[]");

// Girilen ad ve şifreye uyan kullanıcıyı arıyoruz
let bul = aileler.find(a => a.ad === ad && a.sifre === sifre);

// Eğer eşleşen kullanıcı bulunamazsa
if (!bul) {

  // Hatalı giriş mesajını göster
  document.getElementById("loginError").style.display = "block";

  // Fonksiyonu durdur
  return;
}

// Giriş yapan kullanıcıyı currentUser olarak kaydediyoruz
localStorage.setItem("aktifKullanici", JSON.stringify(bul));


// Giriş başarılı mesajını gösteriyoruz
document.getElementById("loginSuccess").style.display = "block";

// 2 saniye sonra ana sayfaya yönlendiriyoruz
setTimeout(() => {
  window.location.href = "sma.html";
}, 2000);

// 3 saniye sonra hata mesajını gizliyoruz
setTimeout(() => {
  document.getElementById("loginError").style.display = "none";
}, 3000);


}


        /* Not ekleme ve puanlama*/
function notEkle() {
    let metin = document.getElementById("notMetni").value;
    if (!metin) return alert("Not alanı boş olamaz!");

/*  LocalStorage'de notlar adında dizi oluştur veya boş bir dizi kullanır.*/
    let notlar = JSON.parse(localStorage.getItem("notlar") || "[]");
    
 /* Yeni notu diziye ekler. */
    notlar.push({
        metin: metin,
        puan: 0
    });

    /* Güncellenen diziyi tekrar localStorage'e kaydet. */
    localStorage.setItem("notlar", JSON.stringify(notlar));
    document.getElementById("notMetni").value = "";
    listeleNotlar();
}

function listeleNotlar() {
    /* LocalStorage'den notları alır, Eğer yoksa boş dizi kullanır. */
    let notlar = JSON.parse(localStorage.getItem("notlar") || "[]");

    /* Notların gösterildiği div'i seçer. */
    let div = document.getElementById("notListesi");

    /* Div içeriğini temizler. */
    if(!div) return;
    div.innerHTML = "";
}


document.addEventListener("click", function(e) {
    if (e.target.classList.contains("deleteBtn")) {
        const id = e.target.getAttribute("data-id");

        /*LocalStorage'dan alır */
        let notes = JSON.parse(localStorage.getItem("notes")) || [];

        /* İlgili notu filtreler */
        notes = notes.filter(note => note.id != id);

        /* Güncellenen notları tekrar kaydeder */
        localStorage.setItem("notes", JSON.stringify(notes));

        /* Ekranı yeniler */
        location.reload();
    }
});