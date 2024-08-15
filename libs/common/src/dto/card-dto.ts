import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import Stripe from 'stripe';

export class CardDto implements Stripe.PaymentMethodCreateParams.Card {
  @IsCreditCard()
  @IsNotEmpty()
  number: string;

  @IsNumber()
  @IsNotEmpty()
  exp_month: number;

  @IsNumber()
  @IsNotEmpty()
  exp_year: number;

  @IsString()
  @IsNotEmpty()
  cvc: string;
}
