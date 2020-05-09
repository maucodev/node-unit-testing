const { describe, expect, it } = require('@jest/globals');
const lib                      = require('../lib');

describe('absolute', () => {
    it('Should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('Should return a positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('Should return 0 if input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('Should return the greeting message', () => {
        const result = lib.greet('maucodev');
        expect(result).toMatch(/maucodev/);
        expect(result).toContain('maucodev');
    });
});

describe('getCurrencies', () => {
    it('Should return supported currencies', () => {
        const result = lib.getCurrencies();
        expect(result).toEqual(expect.arrayContaining(['USD', 'AUD', 'EUR']));
    });
});

describe('getProduct', () => {
    it('Should return the product with the given id', () => {
        const result = lib.getProduct(1);
        expect(result).toMatchObject({id: 1, price: 10});
        expect(result).toHaveProperty('id', 1);
    });
});
