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
                console.error("File could not be read:", hata)
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
                this.gingsonuc = "The number of surfaces cannot be zero.";
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
                } gingvar = `The patient has stage ${evre} grade ${drc} periodontitis.`;
            }else if (gingind>10){
                gingvar = "Gingivitis is present!"
            }else if (probe <= 3){
                gingvar = "Healthy!"
            }else if (probe === 4){
                gingvar = "Health on a reduced periodontium!"
            }else{
                gingvar = ""
            }

            this.gingsonuc = `Bleeding percentage ${gingind}%  ${gingvar}`
        },

        loes(){
            let loedeger
            let loecikti
            const hafifg = Number(this.hafifging);
            const ortag = Number(this.ortaging);
            const siddetlig = Number(this.siddetliging);
            const loesyuz = Number(this.loesy);
            if (this.hafifging === "" || this.ortaging === "" || this.siddetliging === "" || this.loesy === "") {
                this.loessonuc = "Incomplete entry!";
                return;
            }
            loedeger = (hafifg+2*ortag+3*siddetlig)/loesyuz
            if(loedeger<=1){
                loecikti = loedeger + " Mild"
            }else if(loedeger<=2){
                loecikti = loedeger + " Moderate"
            }else if (loedeger<=3){
                loecikti = loedeger + " Severe"
            }else{
                this.loessonuc = "Calculation error!"
            }
            this.loessonuc = `The person's gingival index is ${loecikti}`
        },

        kons(){
            const girdi = this.hastalik;
            const islem = this.islem;
            const ilac = this.ilac;
            const lathas = this.lathassozluk
            const lagir = lathas[girdi]||girdi
            const check = this.check1;

            if (check){
                this.konssonuc = `According to the verbal anamnesis, it was learned that the patient has a history of ${lagir} and does not use any medication. ${islem} will be applied to the patient. Your evaluation is requested.`  ;
            } else if (ilac === ""){
                this.konssonuc = `According to the verbal anamnesis, it was learned that the patient has a history of ${lagir}, uses medication, but does not know the name of the medication used. ${islem} will be applied to the patient. Your evaluation is requested.`  ;   
            }
            else{
                this.konssonuc = `According to the verbal anamnesis, it was learned that the patient has a history of ${lagir} and uses a medication named ${ilac}. ${islem} will be applied to the patient. Your evaluation is requested.`  ;
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
                inrdeger = "Enter a value!"
            }else if (inr>3){
                inrdeger = "Consultation required!"
            }else if (inr<=3){
                inrdeger = "Low risk for bleeding, no contraindication for surgical extraction"
            }

            if(hemoglobin===""){
                hemoglobindeger = "Enter a value!"
            }else if (hemoglobin>18){
                hemoglobindeger = "Consultation required!"
            }else if(hemoglobin>10){
                hemoglobindeger = "All types of dental treatment can be performed."
            }else if(hemoglobin>7){
                hemoglobindeger = "Caution is required. Delayed wound healing possible. Increased risk for general anesthesia/sedation."
            }else{
                hemoglobindeger = "Consultation required!"
            }

            if(ha1c===""){
                ha1cdeger = "Enter a value!"
            }else if (ha1c<7){
                ha1cdeger = "All types of dental treatment can be performed."
            }else if (ha1c<9){
                ha1cdeger = "Increased risk of infection, impaired wound healing. Prophylactic (preventive) antibiotics may be required."
            }else{
                ha1cdeger = "Consultation required!"
            }

            if(buyuk===""||kucuk===""){
                tansiyondeger = "Enter a value!"
            }
            else if (buyuk<90 && kucuk<60){
                tansiyondeger = "Hypotension. Risk of syncope!"
            }else if(buyuk<180 && kucuk<110){
                tansiyondeger="Within normal values"
            }else{
                tansiyondeger = "Hypertension. Absolutely no procedures should be performed!"
            }
            this.hemasonuc = `
                    <strong>INR:</strong> ${inrdeger} <br>
                    <strong>Hemoglobin:</strong> ${hemoglobindeger} <br>
                    <strong>HbA1c:</strong> ${ha1cdeger} <br>
                    <strong>Blood Pressure:</strong> ${tansiyondeger}
                `;
        },

        settingsfunc(){
            localStorage.setItem("username", this.user)
            this.status="Saved"
        },

        profilaksifunc() {
            const kilo = this.kilo;
            const { yolcheck, alergycheck } = this;
            let prohesap;
            let ilac;

            if(kilo===""){
                this.profilaksisonuc = "Please enter the child's weight!"
            }else{

            if (yolcheck) {
                if (alergycheck) {
                    prohesap = Math.min(kilo * 15, 500);
                    ilac = "Azithromycin";
                } else {
                    prohesap = Math.min(kilo * 50, 2000);
                    ilac = "Amoxicillin";
                }
            } else { 
                if (alergycheck) {
                    prohesap = Math.min(kilo * 20, 600);
                    ilac = "Clindamycin";
                } else {
                    prohesap = Math.min(kilo * 50, 2000);
                    ilac = "Ampicillin";
                }
            }

            this.profilaksisonuc = `${prohesap} mg of ${ilac} should be used 30-60 minutes before the procedure!`;
        }
            }
        

    }))
 })