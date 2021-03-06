const { describe, expect, it } = require('@jest/globals');
const lib                      = require('../lib');
const db                       = require('../db');
const mail                     = require('../mail');

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

describe('registerUser', () => {
    it('Should throw if username is falsy', () => {
        const falsyValues = [null, undefined, NaN, '', 0, false];

        falsyValues.forEach((value) => {
            expect(() => { lib.registerUser(value) }).toThrow();
        });
    });

    it('Should return a user object if valid username is passed', () => {
        const result = lib.registerUser('maucodev');
        expect(result).toMatchObject({ username: 'maucodev' });
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('applyDiscount', () => {
    it('Should apply 10% discount if customer has more than 10 points', () => {
        db.getCustomerSync = function (customerId) {
            console.log('Fake reading customer...');
            return { id: customerId, points: 25 };
        }

        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

describe('notifyCustomer', () => {
    it('Should send and email to the customer', () => {
        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'hola@maucodev.com' });

        mail.send = jest.fn();

        lib.notifyCustomer({ customerId: 1 });

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('hola@maucodev.com');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});
