import { Types } from 'mongoose'
import { CartEntities } from '../CartEntities'
import { CartItemEntities } from '../CartItemEntities'

describe('CartEntities', () => {
    it('should create an instance with valid properties', () => {
        const userId = new Types.ObjectId()
        const cart = new CartEntities({
            userId,
            totalQuantity: 123,
            totalPrice: 1231,
            items: [],
        })

        expect(cart.userId).toBe(userId)
        expect(cart.totalQuantity).toBe(123)
        expect(cart.totalPrice).toBe(1231)
        expect(cart.items).toEqual([])
    })

    it('should throw an error if userId is missing', () => {
        const items: CartItemEntities[] = []
        const totalPrice = 100
        const totalQuantity = 5

        expect(
            () =>
                new CartEntities({
                    userId: null as any,
                    items,
                    totalPrice,
                    totalQuantity,
                })
        ).toThrow()
    })

    it('should throw an error if items is not an array', () => {
        const userId = new Types.ObjectId()
        const totalPrice = 100
        const totalQuantity = 5

        expect(
            () =>
                new CartEntities({
                    userId,
                    items: 'not-an-array' as any, // Invalid type for items
                    totalPrice,
                    totalQuantity,
                })
        ).toThrow('items must be an array')
    })

    it('should throw an error if totalPrice is not a number', () => {
        const userId = new Types.ObjectId()
        const items: CartItemEntities[] = []
        const totalQuantity = 5

        expect(
            () =>
                new CartEntities({
                    userId,
                    items,
                    totalPrice: 'not-a-number' as any, // Invalid type for totalPrice
                    totalQuantity,
                })
        ).toThrow('totalPrice must be a number')
    })

    it('should throw an error if totalQuantity is not a number', () => {
        const userId = new Types.ObjectId()
        const items: CartItemEntities[] = []
        const totalPrice = 100

        expect(
            () =>
                new CartEntities({
                    userId,
                    items,
                    totalPrice,
                    totalQuantity: 'not-a-number' as any, // Invalid type for totalQuantity
                })
        ).toThrow('totalQuantity must be a number')
    })
})
