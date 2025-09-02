import { Field, ObjectType } from '@nestjs/graphql';
import { $Enums } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';

@ObjectType()
export class UserDto {
  @Exclude()
  id: string;
  @Exclude()
  role: $Enums.ROLE;
  @Exclude()
  password: string;

  @Field()
  @Length(3, 30)
  first_name: string;

  @Field()
  @Length(3, 50)
  last_name: string;

  @Field()
  @IsEmail()
  email: string;
}
