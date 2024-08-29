import { NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from '../dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET'),
    {
      apiVersion: '2024-06-20',
    },
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  async createCharge({ email, amount }: PaymentsCreateChargeDto) {
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

    console.log('---------- paymentIntent -> sending email');

    this.notificationsService.emit('notify_email', {
      email,
    });

    console.log('---------- paymentIntent -> sending email -> done');

    return paymentIntent;
  }
}
