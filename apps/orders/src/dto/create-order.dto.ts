import { CreateOrderDto } from '@app/interfaces';
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateOrderRequest implements CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  name;

  @IsPositive()
  price;

  @IsPhoneNumber()
  phoneNumber;
}
