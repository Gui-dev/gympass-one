import { CheckIn, Prisma } from '@prisma/client'

export interface ICheckInsRepository {
  findByUserIdOnDate(user_id: string, date: Date): Promise<CheckIn | null>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
