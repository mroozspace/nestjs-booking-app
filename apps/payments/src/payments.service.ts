import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET'),
    {
      apiVersion: '2024-06-20',
    },
  );

  constructor(private readonly configService: ConfigService) {}

  async createCharge({ amount }: CreateChargeDto) {
    // card,
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card,
    // });
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      confirm: true,
      currency: 'usd',
      payment_method: 'pm_card_visa',
      // ERROR (48): A `return_url` must be specified because this Payment Intent
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
      // // ERROR (48): A `return_url` must be specified because this Payment Intent
    });
    return paymentIntent;
  }
}
