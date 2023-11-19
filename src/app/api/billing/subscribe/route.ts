import { auth } from "#/lib/auth/lucia";
import { CP_PREFIX, WEBAPP_URL } from "#/lib/const";
import { db } from "#/lib/db";
import { tier } from "#/lib/tier";
import * as context from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
import type { PlanName } from "tier";

export async function GET(request: NextRequest) {
  const authRequest = auth.handleRequest(request.method, context);
  // check if user is authenticated
  const session = await authRequest.validate();
  if (!session) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const { searchParams } = new URL(request.url);
  const plan = searchParams.get("plan") as PlanName;
  const projectId = searchParams.get("projectId") as string;

  if (!projectId || !plan) {
    return new Response("Bad Request", {
      status: 400,
    });
  }

  const paymentMethodResponse = await tier.lookupPaymentMethods(
    `org:${projectId}`
  );

  try {
    const result = await db.project.findFirst({
      where: {
        id: projectId,
        members: {
          some: {
            userId: session.userId,
            role: {
              in: ["OWNER", "ADMIN"],
            },
          },
        },
      },
    });

    if (!result) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
  } catch {
    return new Response("Internal Server Error", {
      status: 500,
    });
  }

  try {
    const paymentMethod = paymentMethodResponse
      .methods[0] as unknown as Stripe.PaymentMethod;
    await tier.subscribe(`org:${projectId}`, plan, {
      paymentMethodID: paymentMethod.id,
    });
    return NextResponse.redirect(
      new URL(`${CP_PREFIX}/${projectId}/settings/billing`, WEBAPP_URL)
    );
  } catch (error) {
    console.log(error);
  }

  return new Response(
    "Something really bad happened when trying to subscribe",
    { status: 500 }
  );
}
