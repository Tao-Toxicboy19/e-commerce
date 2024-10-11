import { Effect } from 'effect'
import { Address } from '../../domain/entities/Address'
import { IAddressRepository } from '../../domain/interfaces/IAddressRepository'
import { UserModel } from '../schemas/UserSchema'
import { HttpError } from '../errors/HttpError'

export class AddressRepository implements IAddressRepository {
    address(sub: string, dto: Address): Effect.Effect<void, Error> {
        return Effect.tryPromise(async () => {
            const updatedUser = await UserModel.findByIdAndUpdate(
                { _id: sub },
                { address: dto }, // อัปเดตฟิลด์ address
                { new: true, runValidators: true } // ส่งกลับข้อมูลที่ถูกอัปเดตแล้ว และตรวจสอบการ validate
            )
            if (!updatedUser) throw new HttpError('User not found', 404)
        })
    }
}
