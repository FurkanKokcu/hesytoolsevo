 document.addEventListener('alpine:init', () => {
    Alpine.data('hesyapp', () => ({
        diskaybi: '',
        atasmankaybi: '',
        sigara: '',
        periosonuc: '',
        kanamaging:'',
        yuzging:'',
        gingsonuc:'',
        hastalik:'',
        islem:'',
        ilac:'',
        konssonuc:'',
        check1:'',
        lathassozluk: {},
        herbstverileri: [],
        receteverileri:[],
        ha1c:'',
        sysInput:'',
        diaInput:'',
        inr:'',
        hemoglobin:'',
        hemasonuc:'',
        pedoguideicerik:'',
        pedoguideverileri: [],
        secilenPedo: null,
        updates:[],
        user:'',
        status:'',
        yolcheck:'',
        alergycheck:'',
        kilo:'',
        profilaksisonuc:'',
        probed:'',
        patientres:'',
        diyabet:'',
        hafifging:'',
        ortaging:'',
        siddetliging:'',
        loesy:'',
        loessonuc:'',
        


        async init(){
            try{
                const [lathasanswer, herbstanswer, receteanswer, pedoanswer,]= await Promise.all([
                    fetch('lathas.json'),
                    fetch('herbst.json'),
                    fetch('receteler.json'),
                    fetch('pedoguide.json'),
                    
                ])
                this.lathassozluk = await lathasanswer.json();
                this.herbstverileri = await herbstanswer.json();
                this.receteverileri = await receteanswer.json();
                this.pedoguideverileri = await pedoanswer.json();
                this.user = localStorage.getItem("username") || "";

            }
            catch(hata){
                console.error("Dosya okunamadı:", hata)
            }
        },


        ging(){
            let gingvar
            let gingind
            const kana = Number(this.kanamaging);
            const yuzd = Number(this.yuzging);
            const probe = Number(this.probed);
            let evre;
            let drc;
            const dis = Number(this.diskaybi) || 0;
            const atasman = Number(this.atasmankaybi) || 0;
            const sig = Number(this.sigara) || 0;
            const diy = Number(this.diyabet) || 0;

            if (yuzd === 0){
                this.gingsonuc = "Yüz sayısı sıfır olamaz.";
                return;
            }
            gingind=(kana/yuzd)*100
            if(gingind>10 && probe>4 || dis>0){
                if (dis < 1 && atasman < 3) {
                    evre = 1;
                } else if (dis < 1 && atasman > 2) {
                    evre = 2;
                } else if (dis <= 4) {
                    evre = 3;
                } else {
                    evre = 4;
                }

                if (sig >=10 || diy>=7) {
                    drc = "C";
                } else if (sig >0 || diy > 0) {
                    drc = "B";
                } else {
                    drc = "A";
                } gingvar = `Hastada evre ${evre} derece ${drc} periodontitis mevcut.`;
            }else if (gingind>10){
                gingvar = "Gingivitis mevcut!"
            }else if (probe <= 3){
                gingvar = "Sağlıklı!"
            }else if (probe === 4){
                gingvar = "Azalmış periodonsiyumda sağlık!"
            }else{
                gingvar = ""
            }

            this.gingsonuc = `Kanama yüzdesi %${gingind}  ${gingvar}`
        },

        loes(){
            let loedeger
            let loecikti
            const hafifg = Number(this.hafifging);
            const ortag = Number(this.ortaging);
            const siddetlig = Number(this.siddetliging);
            const loesyuz = Number(this.loesy);
            if (this.hafifging === "" || this.ortaging === "" || this.siddetliging === "" || this.loesy === "") {
                this.loessonuc = "Eksik girdi yaptınız!";
                return;
            }
            loedeger = (hafifg+2*ortag+3*siddetlig)/loesyuz
            if(loedeger<=1){
                loecikti = loedeger + " Hafif"
            }else if(loedeger<=2){
                loecikti = loedeger + " Orta"
            }else if (loedeger<=3){
                loecikti = loedeger + " Şiddetli"
            }else{
                this.loessonuc = "Hesaplamada bir hata var!"
            }
            this.loessonuc = `Kişinin gingival indeksi ${loecikti}`
        },

        kons(){
            const girdi = this.hastalik;
            const islem = this.islem;
            const ilac = this.ilac;
            const lathas = this.lathassozluk
            const lagir = lathas[girdi]||girdi
            const check = this.check1;

            if (check){
                this.konssonuc = `Hastada alınan sözlü anamnezde ${lagir} geçmişi olduğu ilaç kullanmadığı öğrenilmiştir. Hastaya ${islem} uygulanacaktır. Tarafınızca değerlendirilmesi rica olunur.`  ;
            } else if (ilac === ""){
                this.konssonuc = `Hastada alınan sözlü anamnezde ${lagir} geçmişi olduğu ilaç kullandığı kullandığı ilacın ismini bilmediği öğrenilmiştir. Hastaya ${islem} uygulanacaktır. Tarafınızca değerlendirilmesi rica olunur.`  ;   
            }
            else{
                this.konssonuc = `Hastada alınan sözlü anamnezde ${lagir} geçmişi olduğu ilaç kullandığı kullandığı ilacın isminin ${ilac} öğrenilmiştir. Hastaya ${islem} uygulanacaktır. Tarafınızca değerlendirilmesi rica olunur.`  ;
            }
        },

        hemamathfunc(){
            const ha1c = this.ha1c;
            const buyuk = this.sysInput;
            const kucuk = this.diaInput;
            const inr = this.inr;
            const hemoglobin = this.hemoglobin;
            let inrdeger
            let hemoglobindeger
            let ha1cdeger
            let tansiyondeger

            if (inr===""){
                inrdeger = "Bir değer giriniz!"
            }else if (inr>3){
                inrdeger = "Konsültasyon gerekli!"
            }else if (inr<=3){
                inrdeger = "Kanama açısından düşük risk, cerrahi çekimde herhangi bir sakınca yok"
            }

            if(hemoglobin===""){
                hemoglobindeger = "Bir değer giriniz!"
            }else if (hemoglobin>18){
                hemoglobindeger = "Konsültasyon gerekli!"
            }else if(hemoglobin>10){
                hemoglobindeger = "Her türlü dental tedavi yapılabilir."
            }else if(hemoglobin>7){
                hemoglobindeger = "Dikkatli olunmalı. Yara iyileşmesi geç olabilir. Genel anestezi/Sedasyon riski artar."
            }else{
                hemoglobindeger = "Konsültasyon gerekli!"
            }

            if(ha1c===""){
                ha1cdeger = "Bir değer giriniz!"
            }else if (ha1c<7){
                ha1cdeger = "Her türlü dental tedavi yapılabilir."
            }else if (ha1c<9){
                ha1cdeger = "Enfeksiyon riski artar, yara iyileşmesi bozulur. Profilaktik (önleyici) antibiyotik gerekebilir."
            }else{
                ha1cdeger = "Konsültasyon gerekli!"
            }

            if(buyuk===""||kucuk===""){
                tansiyondeger = "Bir değer giriniz!"
            }
            else if (buyuk<90 && kucuk<60){
                tansiyondeger = "Hipotansiyon. Senkop riski!"
            }else if(buyuk<180 && kucuk<110){
                tansiyondeger="Normal değerlerde"
            }else{
                tansiyondeger = "Hipertansiyon, Kesinlikle işlem yapılmaz!"
            }
            this.hemasonuc = `
                    <strong>INR:</strong> ${inrdeger} <br>
                    <strong>Hemoglobin:</strong> ${hemoglobindeger} <br>
                    <strong>HbA1c:</strong> ${ha1cdeger} <br>
                    <strong>Tansiyon:</strong> ${tansiyondeger}
                `;
        },

        settingsfunc(){
            localStorage.setItem("username", this.user)
            this.status="Kaydedildi"
        },

        profilaksifunc() {
            const kilo = this.kilo;
            const { yolcheck, alergycheck } = this;
            let prohesap;
            let ilac;

            if(kilo===""){
                this.profilaksisonuc = "Çocuğun kilosunu giriniz!"
            }else{

            if (yolcheck) {
                if (alergycheck) {
                    prohesap = Math.min(kilo * 15, 500);
                    ilac = "Azitromisin";
                } else {
                    prohesap = Math.min(kilo * 50, 2000);
                    ilac = "Amoksisilin";
                }
            } else { 
                if (alergycheck) {
                    prohesap = Math.min(kilo * 20, 600);
                    ilac = "Klindamisin";
                } else {
                    prohesap = Math.min(kilo * 50, 2000);
                    ilac = "Ampisilin";
                }
            }

            this.profilaksisonuc = `Yapılacak işlemden 30-60 dakika önce ${prohesap} mg ${ilac} kullanılmalı!`;
        }
            }
        

    }))
 })
