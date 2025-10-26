'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  badge: 'Simple Pricing',
  mainTitle: 'Transparent Pricing for',
  mainTitleHighlight: 'Every Business Size',
  mainDescription:
    'Start free and scale as you grow. No hidden fees, no setup costs. Switch plans anytime to match your business needs.',
  billingMonthly: 'Monthly',
  billingAnnual: 'Annual',
  billingAnnualBadge: 'Save 25%',
  plan1Name: 'Starter',
  plan1Description: 'Perfect for freelancers and solo entrepreneurs',
  plan1Price: 'Free',
  plan1CTA: 'Start Free',
  plan1CTAHref: '/signup',
  plan2Name: 'Professional',
  plan2Description: 'Ideal for growing businesses and small teams',
  plan2Price: '$19',
  plan2Period: '/month',
  plan2Badge: 'Most Popular',
  plan2CTA: 'Start 30-Day Trial',
  plan2CTAHref: '/signup',
  plan2Trial: '30-day free trial • No credit card required',
  plan3Name: 'Enterprise',
  plan3Description: 'Advanced features for established businesses',
  plan3Price: '$49',
  plan3Period: '/month',
  plan3Badge: 'Advanced',
  plan3CTA: 'Start Trial',
  plan3CTAHref: '/signup',
  bottomTitle: 'Need custom accounting solutions?',
  bottomDescription:
    'Our enterprise team can create tailored invoicing and accounting workflows for large organizations with complex requirements.',
  bottomCTA: 'Contact Sales Team',
  bottomCTAHref: '/contact',
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: config.plan1Name,
      description: config.plan1Description,
      price: config.plan1Price,
      period: '',
      badge: null,
      features: [
        'Up to 5 invoices per month',
        'Basic expense tracking',
        'Payment reminders',
        'PDF invoice generation',
        'Basic reporting',
        'Email support',
      ],
      cta: config.plan1CTA,
      ctaHref: config.plan1CTAHref,
      popular: false,
    },
    {
      name: config.plan2Name,
      description: config.plan2Description,
      price: billingCycle === 'annual' ? '$15' : config.plan2Price,
      period: config.plan2Period,
      badge: config.plan2Badge,
      features: [
        'Unlimited invoices & estimates',
        'Advanced expense management',
        'Automated payment reminders',
        'Multi-currency support',
        'Tax calculation & reporting',
        'Client portal access',
        'Bank account integration',
        'Priority support',
      ],
      cta: config.plan2CTA,
      ctaHref: config.plan2CTAHref,
      popular: true,
    },
    {
      name: config.plan3Name,
      description: config.plan3Description,
      price: billingCycle === 'annual' ? '$39' : config.plan3Price,
      period: config.plan3Period,
      badge: config.plan3Badge,
      features: [
        'Everything in Professional',
        'Advanced financial reporting',
        'Custom invoice branding',
        'Inventory management',
        'Project time tracking',
        'Team collaboration tools',
        'API access & integrations',
        'Dedicated account manager',
      ],
      cta: config.plan3CTA,
      ctaHref: config.plan3CTAHref,
      popular: false,
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <span data-editable="badge">{config.badge}</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="mainTitle">{config.mainTitle}</span>
            <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              <span data-editable="mainTitleHighlight">{config.mainTitleHighlight}</span>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            <span data-editable="mainDescription">{config.mainDescription}</span>
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1 bg-muted rounded-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md transition-all',
                billingCycle === 'monthly'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <span data-editable="billingMonthly">{config.billingMonthly}</span>
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2',
                billingCycle === 'annual'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <span data-editable="billingAnnual">{config.billingAnnual}</span>
              <Badge variant="secondary" className="text-xs">
                <span data-editable="billingAnnualBadge">{config.billingAnnualBadge}</span>
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={cn(
                'relative overflow-hidden transition-all duration-300 hover:shadow-lg',
                plan.popular
                  ? 'border-primary/50 shadow-lg shadow-primary/10 lg:scale-105'
                  : 'border-border/50 hover:border-primary/20'
              )}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 shadow-lg">
                    <Star className="size-3 mr-1 fill-current" />
                    <span data-editable="plan2Badge">{plan.badge}</span>
                  </Badge>
                </div>
              )}

              {/* Background Gradient */}
              {plan.popular && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
              )}

              <CardHeader className={cn('relative text-center pb-8', plan.popular && 'pt-10')}>
                {plan.badge && !plan.popular && (
                  <Badge variant="outline" className="mb-4 mx-auto w-fit">
                    <span data-editable="plan3Badge">{plan.badge}</span>
                  </Badge>
                )}

                <CardTitle className="text-2xl mb-2">
                  <span data-editable={`plan${index + 1}Name`}>{plan.name}</span>
                </CardTitle>
                <CardDescription className="text-base mb-6">
                  <span data-editable={`plan${index + 1}Description`}>{plan.description}</span>
                </CardDescription>

                <div className="flex items-end justify-center gap-1">
                  <span className="text-4xl font-bold">
                    <span data-editable={`plan${index + 1}Price`}>{plan.price}</span>
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground mb-1">
                      <span data-editable={index === 1 ? 'plan2Period' : 'plan3Period'}>
                        {plan.period}
                      </span>
                    </span>
                  )}
                </div>
                {billingCycle === 'annual' && plan.period && (
                  <p className="text-sm text-primary mt-2">Billed annually • Save 25%</p>
                )}
              </CardHeader>

              <CardContent className="relative space-y-6">
                {/* Features List */}
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="size-3 text-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={cn(
                    'w-full text-base py-6',
                    plan.popular && 'bg-primary hover:bg-primary/90'
                  )}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => navigate(plan.ctaHref)}
                  data-editable-href={`plan${index + 1}CTAHref`}
                  data-href={plan.ctaHref}
                >
                  {plan.popular && <Zap className="size-4 mr-2" />}
                  <span data-editable={`plan${index + 1}CTA`}>{plan.cta}</span>
                </Button>

                {plan.name === config.plan2Name && (
                  <p className="text-center text-sm text-muted-foreground">
                    <span data-editable="plan2Trial">{config.plan2Trial}</span>
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">
            <span data-editable="bottomTitle">{config.bottomTitle}</span>
          </h3>
          <p className="text-muted-foreground mb-6">
            <span data-editable="bottomDescription">{config.bottomDescription}</span>
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate(config.bottomCTAHref)}
            data-editable-href="bottomCTAHref"
            data-href={config.bottomCTAHref}
          >
            <span data-editable="bottomCTA">{config.bottomCTA}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
