// https://www.urssaf.fr/portail/home/taux-et-baremes/taux-de-cotisations/les-professions-liberales/bases-de-calcul-et-taux-des-coti.html
export default class CotisationsSociales {

    remuneration: number = 0;
    accre: boolean;
    PASS: number = 39732;

    _revenuPro() {
        return this.remuneration;
    }

    getMaladie(): number {
        if (this._revenuPro() > 1.10 * this.PASS / 100) {
            return this._revenuPro() * 6.5 / 100;
        }

        // Taux progressif : entre 1,50 % et 6,50 %
        let pc = this._revenuPro() / 1.10 * this.PASS / 100;
        let taux = 1.5 + pc * (6.5 - 1.5);

        return this._revenuPro() * taux / 100;
    }

    getAllocationsFamiliales() {
        if (this._revenuPro() < 1.10 * this.PASS / 100) {
            return 0;
        }

        if(this._revenuPro() > 56734) {
            return this._revenuPro() * 3.10 / 100;
        }

        //taux progressif : entre 0 % et 3,10 %
        let pc = this._revenuPro() / 1.10 * this.PASS / 100;
        let taux = pc * 3.10;
        return this._revenuPro() * taux / 100;
    }

    getFormationProfessionnelle(): number {
        return this.PASS * 0.25 / 100;
    }

    getRetraiteBase(): number {
        let montant = 0;

        // https://www.lecoindesentrepreneurs.fr/affiliation-et-cotisations-a-la-cipav/

        //< à 4 569€
        if (this._revenuPro() < 11.50 * this.PASS / 100) {
            montant = 461;
        }

        // entre 4 569€ et 39 732€
        if(this._revenuPro() >= 11.50 * this.PASS / 100 && this._revenuPro() < this.PASS) {
            montant = 8.23 * this._revenuPro() / 100;
        }

        // de 39 732€ à 198 660€
        if(this._revenuPro() >= this.PASS && this._revenuPro() < 5 * this.PASS) {
            montant = (8.23 * this.PASS + 1.87 * this._revenuPro()) / 100;
        }

        // > à 198 660€
        if(this._revenuPro() >= 5 * this.PASS) {
            montant = (8.23 * this.PASS + 1.87 * 5 * this.PASS) / 100;
        }

        return montant;
    }

    getRetraiteComplementaire(): number {
        //https://www.lecoindesentrepreneurs.fr/affiliation-et-cotisations-a-la-cipav/
        let assiette = this._revenuPro();

        let montant = 0;
        if (assiette <= 26580) {
            montant = 1315;
        }
        if (assiette > 26580 && assiette <= 49280) {
            montant = 2630;
        }
        if (assiette > 49280 && assiette <= 57850) {
            montant = 3945;
        }
        if (assiette > 57850 && assiette <= 66400) {
            montant = 6575;
        }
        if (assiette > 66400 && assiette <= 83060) {
            montant = 9205;
        }
        if (assiette > 83060 && assiette <= 103180) {
            montant = 14465;
        }
        if (assiette > 103180 && assiette <= 123300) {
            montant = 15780;
        }
        if (assiette > 123300) {
            montant = 17095;
        }
        return montant;
    }

    getInvaliditeDeces(classe = 'C'): number {
        let montant = 0;
        switch(classe) {
            case 'A':
                montant = 76;
            break;
            case 'B':
                montant = 228;
            break;
            case 'C':
                montant = 380;
            break;
        }

        return montant;
    }

    getCsgCrds(): number {
        // Totalité du revenu de l’activité non salariée + cotisations sociales obligatoires
        var assiette = this._revenuPro() +
            this.getMaladie() +
            this.getAllocationsFamiliales() +
            this.getRetraiteBase();

        return assiette * 9.7 / 100;
    }

    getCotisations(): number {
        return this.getMaladie()
            + this.getAllocationsFamiliales()
            + this.getFormationProfessionnelle()
            + this.getRetraiteBase()
            + this.getRetraiteComplementaire()
            + this.getInvaliditeDeces()
            + this.getCsgCrds();
    }
}

