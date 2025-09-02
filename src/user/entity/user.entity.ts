import { $Enums, User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  role: $Enums.ROLE;
}
