import { Address } from '../../domain/entities/Address'
import { IAddressRepository } from '../../domain/interfaces/IAddressRepository'
import { UserModel } from '../schemas/UserSchema'

export class AddressRepository implements IAddressRepository {
    async address(sub: string, dto: Address): Promise<string> {
        const updatedUser = await UserModel.findByIdAndUpdate(
            { _id: sub },
            { address: dto }, // อัปเดตฟิลด์ address
            { new: true, runValidators: true } // ส่งกลับข้อมูลที่ถูกอัปเดตแล้ว และตรวจสอบการ validate
        )
        if (!updatedUser) {
            throw new Error('User not found')
        }
        return 'ok'
    }
}
