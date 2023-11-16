import { Badge } from "#/components/ui/badge";
import { Separator } from "#/components/ui/separator";
import { TIER_SURVEY_FEATURE_ID, TIER_USERS_FEATURE_ID } from "#/lib/const";
import { getProject } from "#/lib/project/get-current-project";
import { getCurrentPlan, getPricingTable, tier } from "#/lib/tier";
import { cn } from "#/utils";
import { CheckIcon } from "lucide-react";
import { notFound } from "next/navigation";
import type Stripe from "stripe";
import { CheckoutButton } from "./checkout-button";
import { UsageCard } from "./usage-card";

interface Props {
  params: {
    project_id: string;
  };
}

const BillingPage: React.FC<Props> = async ({ params }) => {
  const project = await getProject(params.project_id);
  if (!project) {
    notFound();
  }

  let [pricing, userLimits, surveyLimits, phase, org, paymentMethodResponse] =
    await Promise.all([
      getPricingTable(),
      // fetch user limits
      tier.lookupLimit(`org:${project.id}`, TIER_USERS_FEATURE_ID),
      tier.lookupLimit(`org:${project.id}`, TIER_SURVEY_FEATURE_ID),
      // Fetch the phase data of the current subscription
      tier.lookupPhase(`org:${project.id}`),
      // Fetch organization/user details
      tier.lookupOrg(`org:${project.id}`),
      // Fetch the saved payment methods
      tier.lookupPaymentMethods(`org:${project?.id}`),
    ]);

  const paymentMethod = paymentMethodResponse
    .methods[0] as unknown as Stripe.PaymentMethod;

  const currentPlan = getCurrentPlan(phase, pricing);

  return (
    <>
      <div className="flex justify-between space-y-0.5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Billing</h2>
          <p className="text-muted-foreground">
            Manage your subscription and billing details.
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <UsageCard
          label="Users"
          limit={userLimits.limit}
          usage={userLimits.used}
        />
        <UsageCard
          label="Surveys"
          limit={surveyLimits.limit}
          usage={surveyLimits.used}
        />
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col gap-12 border-b pb-24 ">
        <div
          className={cn(
            "grid w-full md:grid-cols-3 py-8",
            "grid-cols-2 grid-rows-2 gap-y-4 gap-x-6"
          )}
        >
          {pricing.map((plan, planIndex) => (
            <div
              key={planIndex}
              className={cn(
                "flex flex-col gap-y-5 p-6",
                "rounded-3xl bg-background",
                currentPlan.planId === plan.planId
                  ? "ring-2 ring-foreground"
                  : "ring-1 ring-border"
              )}
            >
              <div className="flex flex-col gap-y-4">
                <div className="font-semibold inline-flex items-center gap-x-2">
                  <h3 className="text-xl font-semibold">
                    <span>{plan.name}</span>
                  </h3>
                  {currentPlan.planId === plan.planId && (
                    <Badge>Current Plan</Badge>
                  )}
                </div>
                <div>
                  <h4 className="text-3xl font-bold">
                    {plan.base === 0
                      ? "Free"
                      : new Intl.NumberFormat("de-DE", {
                          style: "currency",
                          currency: plan.currency,
                        }).format(plan.base / 100)}
                  </h4>
                  <p className="text-sm">
                    {plan.base === 0 ? "Lifetime" : "/ " + plan.interval}
                  </p>
                </div>
              </div>
              <CheckoutButton
                plan={plan}
                currentPlan={currentPlan}
                projectId={project.id}
              />
              <div className="flex flex-col gap-y-1">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-x-3">
                    <CheckIcon
                      className={cn(
                        "h-4 w-4 text-green-600 dark:text-green-300"
                      )}
                    />
                    <p className="text-sm text-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BillingPage;
