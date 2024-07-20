import { CheckIn, Prisma } from '@prisma/client'

export interface ICheckInsRepository {
  findById(check_in_id: string): Promise<CheckIn | null>
  findByUserIdOnDate(user_id: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(user_id: string, page: number): Promise<CheckIn[]>
  countByUserId(user_id: string): Promise<number>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  save(check_in: CheckIn): Promise<CheckIn>
}
