import { queryDto } from '../QueryDto'

describe('queryDto', () => {
    it('should pass when all fields are correct', () => {
        const validQuery = {
            query: 'search term',
            category: 'category1',
            search: 'test search',
            start: '10',
            end: '20',
            limit: '5',
            page: '1',
        }

        const parsed = queryDto.parse(validQuery)
        expect(parsed).toEqual({
            query: 'search term',
            category: 'category1',
            search: 'test search',
            start: 10,
            end: 20,
            limit: 5,
            page: 1,
        })
    })

    it('should allow category to be a single string or array of strings', () => {
        const singleCategory = { category: 'singleCategory' }
        const arrayCategory = { category: ['category1', 'category2'] }

        expect(() => queryDto.parse(singleCategory)).not.toThrow()
        expect(() => queryDto.parse(arrayCategory)).not.toThrow()
    })

    it('should default start to 0 and end to Infinity if not provided', () => {
        const partialQuery = {
            category: 'category1',
        }

        const parsed = queryDto.parse(partialQuery)
        expect(parsed.start).toBe(0)
        expect(parsed.end).toBe(Infinity)
    })

    it('should transform start, end, limit, and page to numbers', () => {
        const queryWithNumbers = {
            start: '15',
            end: '30',
            limit: '10',
            page: '2',
        }

        const parsed = queryDto.parse(queryWithNumbers)
        expect(parsed.start).toBe(15)
        expect(parsed.end).toBe(30)
        expect(parsed.limit).toBe(10)
        expect(parsed.page).toBe(2)
    })

    it('should throw an error if limit or page is a non-numeric string', () => {
        const invalidQuery = {
            limit: 'non-numeric',
            page: 'text',
        }

        expect(() => queryDto.parse(invalidQuery)).toThrow()
    })
})
