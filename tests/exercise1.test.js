const { describe, expect, it } = require('@jest/globals');
const lib                      = require('../exercise1');

describe('fizzBuzz', () => {
    it('Should throw error if input is not a number', () => {
        const values = [null, undefined, '', false];

        values.forEach((value) => {
            expect(() => { lib.fizzBuzz(value) }).toThrowError();
        });
    });

    it('Should return FizzBuzz if input is divisible by 3 and 5', () => {
        const result = lib.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('Should return Fizz if input is only divisible by 3', () => {
        const result = lib.fizzBuzz(3);
        expect(result).toBe('Fizz');
    });

    it('Should return Buzz if input is only divisible by 5', () => {
        const result = lib.fizzBuzz(5);
        expect(result).toBe('Buzz');
    });

    it('Should return input if it is not divisible by 3 or 5', () => {
        const result = lib.fizzBuzz(7);
        expect(result).toBe(7);
    });
});
