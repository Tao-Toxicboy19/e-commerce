import { CategoriesEntities } from '../CategoriesEntities'

describe('CategoriesEntities', () => {
    it('should throw an error when name is missing', () => {
        expect(
            () => new CategoriesEntities({ name: null as any, productCount: 1 })
        ).toThrow('name is required')
    })

    it('should throw an error when productCount is missing', () => {
        expect(
            () =>
                new CategoriesEntities({
                    name: 'test',
                    productCount: null as any,
                })
        ).toThrow('productCount must be a positive number')
    })

    it('should throw an error if name is an empty string', () => {
        expect(
            () => new CategoriesEntities({ name: '', productCount: 1 })
        ).toThrow('name is required')
    })

    it('should throw an error if productCount is zero', () => {
        expect(
            () =>
                new CategoriesEntities({
                    name: 'test',
                    productCount: 0,
                })
        ).toThrow('productCount must be a positive number')
    })

    it('should throw an error if name is not a string', () => {
        expect(
            () =>
                new CategoriesEntities({
                    name: 123 as any,
                    productCount: 1,
                })
        ).toThrow('name is required')
    })

    it('should throw an error if productCount is not a number', () => {
        expect(
            () =>
                new CategoriesEntities({
                    name: 'test',
                    productCount: 'ABC' as any,
                })
        ).toThrow('productCount must be a positive number')
    })

    it('should throw an error if productCount is negative', () => {
        expect(
            () =>
                new CategoriesEntities({
                    name: 'test',
                    productCount: -1,
                })
        ).toThrow('productCount must be a positive number')
    })

    it('should create an instance with valid properties', () => {
        const category = new CategoriesEntities({
            name: 'Electronics',
            productCount: 10,
        })

        expect(category.name).toBe('Electronics')
        expect(category.productCount).toBe(10)
    })
})
