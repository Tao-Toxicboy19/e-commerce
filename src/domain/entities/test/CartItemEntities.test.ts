import { Types } from 'mongoose'
import { CartItemEntities } from '../CartItemEntities'

describe('CartItemEntities', () => {
    it('should throw an error when productId is missing', () => {
        expect(
            () =>
                new CartItemEntities({
                    productId: null as any,
                    quantity: 1,
                    subtotal: 1,
                })
        ).toThrow('productId is required and must be a valid ObjectId')
    })

    it('should throw an error when quantity is missing', () => {
        expect(
            () =>
                new CartItemEntities({
                    productId: new Types.ObjectId(),
                    quantity: undefined as any, // quantity is missing
                    subtotal: 1,
                })
        ).toThrow('quantity is required')
    })

    it('should throw an error if quantity is zero', () => {
        expect(
            () =>
                new CartItemEntities({
                    productId: new Types.ObjectId(),
                    quantity: 0,
                    subtotal: 1,
                })
        ).toThrow('quantity must be greater than zero')
    })

    it('should throw an error if quantity is negative', () => {
        expect(
            () =>
                new CartItemEntities({
                    productId: new Types.ObjectId(),
                    quantity: -1,
                    subtotal: 1,
                })
        ).toThrow('quantity must be greater than zero')
    })

    it('should throw an error if quantity is not a number', () => {
        expect(
            () =>
                new CartItemEntities({
                    productId: new Types.ObjectId(),
                    quantity: 'ABC' as any,
                    subtotal: 1,
                })
        ).toThrow('quantity must be a number')
    })

    it('should throw an error when subtotal is missing', () => {
        expect(
            () =>
                new CartItemEntities({
                    productId: new Types.ObjectId(),
                    quantity: 1,
                    subtotal: undefined as any, // subtotal is missing
                })
        ).toThrow('subtotal is required')
    })

    it('should throw an error if subtotal is negative', () => {
        expect(
            () =>
                new CartItemEntities({
                    productId: new Types.ObjectId(),
                    quantity: 1,
                    subtotal: -100,
                })
        ).toThrow('subtotal must be a positive number')
    })

    it('should throw an error if subtotal is not a number', () => {
        expect(
            () =>
                new CartItemEntities({
                    productId: new Types.ObjectId(),
                    quantity: 1,
                    subtotal: 'ABC' as any,
                })
        ).toThrow('subtotal must be a number')
    })

    it('should create an instance with valid properties', () => {
        const cartItem = new CartItemEntities({
            productId: new Types.ObjectId(),
            quantity: 5,
            subtotal: 100,
        })

        expect(cartItem.productId).toBeInstanceOf(Types.ObjectId)
        expect(cartItem.quantity).toBe(5)
        expect(cartItem.subtotal).toBe(100)
    })
})
