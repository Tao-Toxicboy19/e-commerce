import { IProductsRepository } from "../../interfaces/IProductsRepository";

export class DeleteProductUsecase {
    constructor(private productsRepository:IProductsRepository){}

    async execute(id:string):Promise<void>{
        return this.productsRepository.deleteProduct(id)
    }
}