import ImpotSociete from "./impot-societe";

describe('ImpotSociete', () => {
  describe('getImpot', () => {
    it('shoud be 15% of CA', () => {
      const impotSociete = new ImpotSociete();
      impotSociete.benefice = 10000;
      expect(impotSociete.getImpot()).toBeCloseTo(1500, 2);
    });

    it('should be 15% of CA until 38120E, and 28% then', () => {
      const impotSociete = new ImpotSociete();
      impotSociete.benefice = 100000;
      expect(impotSociete.getImpot()).toBeCloseTo(38119 * 0.15 + (100000 - 38120) * 0.28, 2);
    });

    it('should be 15% of CA until 38120E, 28% of CA until 500000E, and 33% then', () => {
      const impotSociete = new ImpotSociete();
      impotSociete.benefice = 1000000;
      expect(impotSociete.getImpot()).toBeCloseTo(38119 * 0.15 + (499999 - 38120) * 0.28 + (1000000 - 500000) / 3, 2);
    });
  });
});
