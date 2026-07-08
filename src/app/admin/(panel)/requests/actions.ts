"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

// The proxy already gates /admin, but server actions are their own HTTP
// endpoints — each one re-checks the session.
async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
}

export async function toggleLeadStatus(id: string) {
  await requireSession();
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) return;
  await prisma.lead.update({
    where: { id },
    data: { status: lead.status === "NEW" ? "DONE" : "NEW" },
  });
  revalidatePath("/admin/requests");
}

export async function deleteLead(id: string) {
  await requireSession();
  await prisma.lead.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/requests");
}
