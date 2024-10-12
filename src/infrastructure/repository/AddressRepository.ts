import { Address } from '../../domain/entities/Address'
import { IAddressRepository } from '../../domain/interfaces/IAddressRepository'
import { HttpError } from '../errors/HttpError'
import { UserModel } from '../schemas/UserSchema'

export class AddressRepository implements IAddressRepository {
    async address(sub: string, dto: Address): Promise<void> {
        const updatedUser = await UserModel.findByIdAndUpdate(
            { _id: sub },
            { address: dto }, // อัปเดตฟิลด์ address
            { new: true, runValidators: true } // ส่งกลับข้อมูลที่ถูกอัปเดตแล้ว และตรวจสอบการ validate
        )
        if (!updatedUser) throw new HttpError('User not found', 404)
    }
}
