import { SaveProductUsecase } from '../SaveProductUsecase'
import { IProductsRepository } from '../../../interfaces/IProductsRepository'
import { UploadImagesUsecase } from '../../uploadImage/UploadImagesUsecase'
import { HttpError } from '../../../../infrastructure/errors/HttpError'
import { Types } from 'mongoose'

// Mock repository และ uploadImagesUsecase
const mockProductRepository: IProductsRepository = {
    saveProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
    products: jest.fn(),
}

const mockUploadImagesUsecase = {
    execute: jest.fn(),
}

describe('SaveProductUsecase', () => {
    let saveProductUsecase: SaveProductUsecase

    beforeEach(() => {
        saveProductUsecase = new SaveProductUsecase(
            mockProductRepository,
            mockUploadImagesUsecase as unknown as UploadImagesUsecase
        )
    })

    it('should throw an error if price is less than or equal to zero', async () => {
        const dto = {
            name: 'Product A',
            description: 'Description',
            price: 0, // Invalid price
            category: 'Category',
            brand: 'Brand',
            stock: 10,
            images: [],
            shop: {
                name: 'Shop A',
                address: {
                    street: '123 Main St',
                    city: 'Bangkok',
                    postalCode: '10100',
                    country: 'Thailand',
                },
            },
        }

        await expect(
            saveProductUsecase.execute({
                userId: 'userId123',
                dto,
                files: [],
            })
        ).rejects.toThrow(new HttpError('Price must be greater than 0.', 400))
    })

    it('should throw an error if stock is less than or equal to zero', async () => {
        const dto = {
            name: 'Product B',
            description: 'Description',
            price: 100,
            category: 'Category',
            brand: 'Brand',
            stock: 0, // Invalid stock
            images: [],
            shop: {
                name: 'Shop B',
                address: {
                    street: '456 Main St',
                    city: 'Bangkok',
                    postalCode: '10100',
                    country: 'Thailand',
                },
            },
        }

        await expect(
            saveProductUsecase.execute({
                userId: '6709f5d08427f814ff499a2c',
                dto,
                files: [],
            })
        ).rejects.toThrow(new HttpError('Stock must be greater than 0.', 400))
    })

    it('should upload images and save product successfully', async () => {
        const dto = {
            name: 'Product C',
            description: 'Description',
            price: 200,
            category: 'Category',
            brand: 'Brand',
            stock: 50,
            images: [],
            shop: {
                name: 'Shop C',
                address: {
                    street: '789 Main St',
                    city: 'Bangkok',
                    postalCode: '10120',
                    country: 'Thailand',
                },
            },
        }

        // Mock the return value for uploading images
        const mockUploadedImages = [
            {
                asset_id: 'asset1',
                public_id: 'public1',
                url: 'http://image1.jpg',
                secure_url: 'https://secure.image1.jpg',
            },
        ]
        mockUploadImagesUsecase.execute.mockResolvedValue(mockUploadedImages)

        // ใช้ Types.ObjectId เพื่อสร้าง userId ที่ถูกต้อง
        const userId = new Types.ObjectId().toHexString()

        await saveProductUsecase.execute({
            userId: userId,
            dto,
            files: [],
        })

        // ตรวจสอบว่า uploadImagesUsecase.execute ถูกเรียก
        expect(mockUploadImagesUsecase.execute).toHaveBeenCalledWith([])

        // ตรวจสอบว่า saveProduct ใน repository ถูกเรียก
        expect(mockProductRepository.saveProduct).toHaveBeenCalledWith(
            expect.objectContaining({
                name: dto.name,
                description: dto.description,
                price: dto.price,
                category: dto.category,
                brand: dto.brand,
                stock: dto.stock,
                images: mockUploadedImages,
                shopOwner: new Types.ObjectId(userId),
            })
        )
    })
})
