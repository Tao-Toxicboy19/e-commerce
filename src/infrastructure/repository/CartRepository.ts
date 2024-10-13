import { Types } from 'mongoose'
import {
    CartActionParams,
    ICartRepository,
} from '../../domain/interfaces/ICartRepository'
import { HttpError } from '../errors/HttpError'
import { CartModel } from '../schemas/CartSchema'
import { ProductModel } from '../schemas/ProductSchema'
import { CartEntities } from '../../domain/entities/CartEntities'
import { CartItemModel } from '../schemas/CartItemSchema'

export class CartRepository implements ICartRepository {
    async cart(userId: string): Promise<CartEntities> {
        try {
            const userCart = await CartModel.findOne({ userId })
                .populate('items.productId', 'name price')
                .exec()
            if (!userCart) throw new HttpError('Cart not found', 404)
            return userCart
        } catch (error) {
            throw new HttpError(`Error fetching cart`, 400)
        }
    }

    async increaseItem({
        id,
        userId,
        productId,
    }: CartActionParams): Promise<void> {
        try {
            // หา product ที่ต้องการเพิ่มใน cart
            const product = await ProductModel.findById(productId)
                .select('price')
                .exec()
            if (!product) throw new HttpError('Product not found', 404)

            // หา cart ของ user ถ้าไม่เจอจะสร้างใหม่
            let cart = await CartModel.findOne({ userId, _id: id })
                .select('items totalPrice totalQuantity')
                .exec()
            if (!cart) {
                // ถ้าไม่มี cart ก็สร้าง cart ใหม่
                cart = new CartModel({
                    userId: new Types.ObjectId(userId),
                    items: [],
                    totalPrice: 0,
                    totalQuantity: 0,
                })
            }

            // หา index ของสินค้าที่อยู่ใน cart (ถ้ามี)
            const itemIndex = cart.items.findIndex(
                (item) => item.productId.toString() === productId
            )

            if (itemIndex > -1) {
                // ถ้าพบสินค้านี้ใน cart แล้ว -> เพิ่มจำนวน
                cart.items[itemIndex].quantity += 1
                cart.items[itemIndex].subtotal =
                    cart.items[itemIndex].quantity * product.price
            } else {
                // ถ้าไม่พบสินค้า -> เพิ่มสินค้าใหม่เข้าไปใน items
                cart.items.push(
                    new CartItemModel({
                        productId: new Types.ObjectId(productId),
                        quantity: 1,
                        subtotal: product.price,
                    })
                )
            }

            // คำนวณยอดรวม (totalPrice และ totalQuantity) ใหม่
            cart.totalPrice = cart.items.reduce(
                (acc, item) => acc + item.subtotal,
                0
            )
            cart.totalQuantity = cart.items.reduce(
                (acc, item) => acc + item.quantity,
                0
            )

            // บันทึกการเปลี่ยนแปลงใน cart
            await cart.save()
        } catch (error) {
            throw new HttpError(`Error increasing item`, 400)
        }
    }

    async reduceItem({
        id,
        userId,
        productId,
    }: CartActionParams): Promise<void> {
        try {
            // หา product ที่ต้องการลดใน cart
            const product = await ProductModel.findById(productId).select(
                'price'
            )
            if (!product) throw new HttpError('Product not found', 404)

            // หา cart ของ user
            let cart = await CartModel.findOne({ userId, _id: id })
                .select('items totalPrice totalQuantity')
                .exec()
            if (!cart) throw new HttpError('Cart not found', 404)

            // หา index ของสินค้าที่อยู่ใน cart
            const itemIndex = cart.items.findIndex(
                (item) => item.productId.toString() === productId
            )

            if (itemIndex > -1) {
                // ลดจำนวนสินค้าใน cart
                cart.items[itemIndex].quantity -= 1

                if (cart.items[itemIndex].quantity <= 0) {
                    // ถ้าจำนวนสินค้าลดลงเหลือ 0 หรือน้อยกว่า -> ลบสินค้าออกจาก cart
                    cart.items.splice(itemIndex, 1)
                } else {
                    // คำนวณ subtotal ใหม่ถ้าจำนวนสินค้ามากกว่า 0
                    cart.items[itemIndex].subtotal =
                        cart.items[itemIndex].quantity * product.price
                }
            } else {
                throw new HttpError('Item not found in cart', 404)
            }

            // คำนวณยอดรวม (totalPrice และ totalQuantity) ใหม่
            cart.totalPrice = cart.items.reduce(
                (acc, item) => acc + item.subtotal,
                0
            )
            cart.totalQuantity = cart.items.reduce(
                (acc, item) => acc + item.quantity,
                0
            )

            await cart.save()
        } catch (error) {
            throw new HttpError(`Error reducing item`, 400)
        }
    }

    async deleteProductOnCart({
        id,
        userId,
        productId,
    }: CartActionParams): Promise<void> {
        try {
            const cart = await CartModel.findOneAndUpdate(
                { _id: id, userId },
                { $pull: { items: { productId: productId } } }, // ลบสินค้าที่มี productId ตรงกับที่ส่งมา
                { new: true }
            ).exec()

            if (!cart) throw new HttpError('Cart not found', 404)

            // ตรวจสอบว่าตะกร้าว่างเปล่าหรือไม่ ถ้าว่างให้ลบ cart นั้นไปเลย
            if (cart.items.length === 0)
                await CartModel.findByIdAndDelete(id).exec()
        } catch (error) {
            throw new HttpError('Error deleting product from cart', 400)
        }
    }
}
