export default class CotisationsSociales {

    remuneration: number = 0;
    accre: boolean;
    PASS: number = 39228; // 2018 = 39732  

    _revenuPro() {
        return this.remuneration;
    }

    _tauxProgressif(montantMin, tauxMin, montantMax, tauxMax, montant) {
        let pc = montant / montantMax;
        return tauxMin + ((tauxMax - tauxMin) * (montant - montantMin) / (montantMax - montantMin));
    }

    getMaladie(): number {
        let revenus = Math.max(40 * this.PASS / 100, this._revenuPro());

        // https://www.secu-independants.fr/baremes/cotisations-et-contributions/?reg=agence-professions-liberales
        if (revenus > 110 * this.PASS / 100) {
            return revenus * 6.5 / 100;
        }

        // Taux progressif : entre 1,50 % et 6,50 %
        let tauxMin = 1.5;
        let tauxMax = 6.5;
        let montantMin = 0;
        let montantMax = 110 * this.PASS / 100;

        let taux = this._tauxProgressif(montantMin, tauxMin, montantMax, tauxMax, revenus);
        return revenus * taux / 100;    
    }

    getAllocationsFamiliales() {
        let revenus = Math.max(19 * this.PASS / 100, this._revenuPro());

        // https://www.secu-independants.fr/baremes/cotisations-et-contributions/?reg=agence-professions-liberales
        if (revenus < 110 * this.PASS / 100) {
            return 0;
        }

        if(revenus > 140 * this.PASS / 100) {
            return revenus * 3.10 / 100;
        }

        //taux progressif : entre 0 % et 3,10 %
        let tauxMin = 0;
        let tauxMax = 3.10;
        let montantMin = 110 * this.PASS / 100;
        let montantMax = 140 * this.PASS / 100;

        let taux = this._tauxProgressif(montantMin, tauxMin, montantMax, tauxMax, revenus);
        return revenus * taux / 100;
    }

    getAllocationsFamiliales() {
        if (this._revenuPro() < 43705) {
            return 0;
        }
        if (this._revenuPro() > 55625) {
            return this._revenuPro() * 0.0310;
        }
        let pc = (this._revenuPro() - 43705) / (55625 - 43705);
        let taux = pc * 3.1;
        return this._revenuPro() * taux;
    }

    getFormationProfessionnelle(): number {
        return 38616 * 0.0025;
    }

    getRetraiteBase(): number {
        // https://www.secu-independants.fr/baremes/cotisations-et-contributions/?reg=agence-professions-liberales
        let montant = 0;

        // https://www.lecoindesentrepreneurs.fr/affiliation-et-cotisations-a-la-cipav/

        //< à 4 569€
        if (this._revenuPro() < 11.50 * this.PASS / 100) {
            montant = 461;
        }
        if (this._revenuPro() < 4441) {
            return 448;
        }
        let assiette = this._revenuPro();
        if (assiette < this.PASS) {
            return assiette * 0.0823 + assiette * 0.0187;
        }
        return this.PASS * 0.0823 + assiette * 0.0187;
    }

    getRetraiteComplementaire(): number {
        if (this.accre && this._revenuPro() < 28962) {
            return 0;
        }
        let assiette = this._revenuPro();
        let montant;
        if (assiette <= 26580) {
            montant = 1277;
        }
        if (assiette > 26580 && assiette <= 49280) {
            montant = 2553;
        }
        if (assiette > 49280 && assiette <= 57850) {
            montant = 3830;
        }
        if (assiette > 57850 && assiette <= 66400) {
            montant = 6384;
        }
        if (assiette > 66400 && assiette <= 83060) {
            montant = 8937;
        }
        if (assiette > 83060 && assiette <= 103180) {
            montant = 14044;
        }
        if (assiette > 103180 && assiette <= 123300) {
            montant = 15320;
        }
        if (assiette > 123300) {
            montant = 16597;
        }
        return montant;
    }

    getInvaliditeDeces(classe = 'C'): number {
        if (this.accre && this._revenuPro() < 28962) {
            return 0;
        }
        return 380;
    }

    getCsgCrds(): number {
        // Totalité du revenu de l’activité non salariée + cotisations sociales obligatoires
        var assiette = Math.max(19 * this.PASS / 100, 
            this._revenuPro() +
            this.getMaladie() +
            this.getAllocationsFamiliales() +
            this.getRetraiteBase()
        );

        return assiette * 9.7 / 100;
    }

    getCotisations(): number {
        var total = 0;
        total += this.getMaladie();
        total += this.getAllocationsFamiliales();
        total += this.getFormationProfessionnelle();
        total += this.getRetraiteBase();
        total += this.getRetraiteComplementaire();
        total += this.getInvaliditeDeces();
        total += this.getCsgCrds();
        return total;
    }
}

