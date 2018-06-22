export default class ImpotSociete {

    public benefice: number;

    getImpot(): number {
        //En dessous de 38120, les bénéfices sont imposés à 15%
        if (this.benefice <= 38120) {
            return this.benefice * 0.15;
        }
        let is = 38120 * 0.15;

        //Entre 38120 et 500000, les bénéfices sont imposés à 28%
        if (this.benefice <= 500000) {
            is += (this.benefice - 38120) * 0.28;
            return is;
        }

        //Au delà de 500000, les bénéfices sont imposés à 33.33%
        is += (this.benefice - 500000) * 0.33;

        return is;
    }
}
