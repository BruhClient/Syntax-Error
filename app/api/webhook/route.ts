import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { prisma } from '@/lib/db';
import { getUserByEmail } from '@/lib/users';
import { redirect } from 'next/navigation';



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req : NextResponse) {
    
   
    const body = await req.text();
   

    const signature = (await headers()).get("stripe-signature")!

    let data;
    let eventType;
    let event : Stripe.Event;

    // verify Stripe event is legit
    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err : any) {
       
        return NextResponse.json({ error: err.message }, { status: 400 });
    }

   
    
   
    data = event.data.object as Stripe.Checkout.Session;
    eventType = event.type;



  

    
    try {
        switch (eventType) {

           
            case 'checkout.session.completed': {
                // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
                // ✅ Grant access to the product
                const session = await stripe.checkout.sessions.retrieve(
                    data.id,
                    {
                        expand: ['line_items']
                    }
                );
                
                const customerEmail = session.customer_details?.email
                console.log(customerEmail)
               
                if (customerEmail) { 

                    
                    

                    await prisma.user.update({
                        where : { 
                            email : customerEmail as string
                        }, 
                        data : { 
                            isPremium : true
                        }
                    })
                } else { 
                    
                    throw new Error('No user found');
                }
                


               
          

                
                break;
            }

            case 'customer.subscription.deleted': {
                // ❌ Revoke access to the product
                // The customer might have changed the plan (higher or lower plan, cancel soon etc...)

                const subscription = await stripe.subscriptions.retrieve(
                    data.id
                );
                
                const customer = await stripe.customers.retrieve(subscription.customer)
                const customerEmail = customer.email

                await prisma.user.update({ 
                    where : { 
                        email : customerEmail 
                    }, 
                    data : {
                        isPremium : false
                    }
                })
                

               

                break;
            }

            default:
            // Unhandled event type
        }
    } catch (e) {
        console.error(
            'stripe error: ' + e.message + ' | EVENT TYPE: ' + eventType
        );
    }

    return NextResponse.json({});
}