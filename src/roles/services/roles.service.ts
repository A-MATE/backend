import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesService {
  constructor() {}

  // async assignRole(userId: string, role: UserRole): Promise<User> {
  // const user = await this.usersRepository.findOneBy({ id: userId });
  // if (!user) {
  //   throw new NotFoundException('User not found');
  // }
  // user.role = role;
  // return this.usersRepository.save(user);
  // }

  // async removeRole(userId: string, role: UserRole): Promise<User> {
  // const user = await this.usersRepository.findOneBy({ id: userId });
  // if (!user) {
  //   throw new NotFoundException('User not found');
  // }
  // if (user.role === role) {
  //   user.role = UserRole.USER;
  // }
  // return this.usersRepository.save(user);
  // }

  // async getUsersByRole(role: UserRole): Promise<User[]> {
  // return this.usersRepository.find({ where: { role } });
  // }
}
