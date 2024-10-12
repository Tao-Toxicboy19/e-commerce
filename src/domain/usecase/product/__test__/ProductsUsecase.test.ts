import { HttpError } from '../../../../infrastructure/errors/HttpError'
import { IProductsRepository } from '../../../interfaces/IProductsRepository'
import { ProductsUsecase } from '../ProductsUsecase'

// Mock repository
const mockProductRepository: IProductsRepository = {
    products: jest.fn(),
    saveProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
}

describe('ProductsUsecase', () => {
    let productsUsecase: ProductsUsecase

    beforeEach(() => {
        productsUsecase = new ProductsUsecase(mockProductRepository)
    })

    it('should throw an error if range start is less than 0', async () => {
        const query = {
            query: 'test',
            category: 'electronics',
            range: { start: -1, end: 10 },
        }

        await expect(productsUsecase.execute(query)).rejects.toThrow(
            new HttpError('start must be greater than or equal to 0.', 400)
        )
    })

    it('should throw an error if range end is less than or equal to 0', async () => {
        const query = {
            query: 'test',
            category: 'electronics',
            range: { start: 0, end: 0 },
        }

        await expect(productsUsecase.execute(query)).rejects.toThrow(
            new HttpError('end must be greater than 0.', 400)
        )
    })

    it('should call products repository with correct parameters', async () => {
        const query = {
            query: 'test',
            category: 'electronics',
            range: { start: 0, end: 10 },
        }

        // Mock response from the repository
        const mockProducts = [
            { name: 'Product 1', price: 100 },
            { name: 'Product 2', price: 200 },
        ]
        ;(mockProductRepository.products as jest.Mock).mockResolvedValue(
            mockProducts
        )

        const result = await productsUsecase.execute(query)

        // ตรวจสอบว่าฟังก์ชัน products ใน repository ถูกเรียกด้วยพารามิเตอร์ที่ถูกต้อง
        expect(mockProductRepository.products).toHaveBeenCalledWith(query)
        // ตรวจสอบว่าผลลัพธ์จาก usecase คือข้อมูลที่ถูกต้อง
        expect(result).toEqual(mockProducts)
    })
})
