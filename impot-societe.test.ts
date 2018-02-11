import ImpotSociete from "./impot-societe";

describe('ImpotSociete', () => {
  describe('getImpot', () => {
    it('should compute correctly', () => {
      const impotSociete = new ImpotSociete();
      impotSociete.benefice = 95000;
      expect(impotSociete.getImpot()).toBeCloseTo(22644.4, 2);
    });
  });
});
