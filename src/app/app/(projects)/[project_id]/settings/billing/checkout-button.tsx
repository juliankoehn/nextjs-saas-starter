"use client";

import { Button } from "#/components/ui/button";
import { toast } from "#/components/ui/use-toast";
import { CurrentPlan, PricingTableData } from "#/types";
import { useState } from "react";

export interface CheckoutButtonProps {
  projectId: string | number;
  plan: PricingTableData;
  currentPlan: CurrentPlan;
  className?: string;
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = (props) => {
  const { plan, currentPlan, className, projectId } = props;

  const [changePlan, setChangePlan] = useState(false);

  const subscribe = async (planId: string) => {
    try {
      setChangePlan(true);

      const result = await fetch(
        `/api/billing/change-plan?projectId=${projectId}&plan=${planId}`,
        {
          method: "GET",
        }
      );

      if (!result?.ok) {
        return toast({
          title: "Something went wrong.",
          description: "Please refresh the page and try again.",
          variant: "destructive",
        });
      }

      const body = await result.json();
      if (body) {
        window.location.href = body.url;
      }
    } catch {
    } finally {
      setChangePlan(false);
    }
  };

  return (
    <>
      <Button
        variant={
          plan.planId === currentPlan.planId
            ? "secondary"
            : plan.base < currentPlan.base
            ? "destructive"
            : "default"
        }
        disabled={plan.base === currentPlan.base || changePlan}
        isLoading={changePlan}
        name="planId"
        value={plan.planId}
        className={className}
        onClick={() => subscribe(plan.planId)}
      >
        {plan.base === currentPlan.base
          ? "Current Plan"
          : plan.base < currentPlan.base
          ? "Downgrade"
          : "Upgrade"}
      </Button>
    </>
  );
};
