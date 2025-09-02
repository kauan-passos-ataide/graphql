import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @Length(3, 30)
  @IsNotEmpty()
  first_name: string;

  @Field()
  @Length(3, 50)
  @IsNotEmpty()
  last_name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @Length(8, 30)
  @IsNotEmpty()
  password: string;
}
