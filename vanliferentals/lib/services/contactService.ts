import { prisma } from "@/lib/prisma";
import { ContactInput, ContactRequest } from "../types";

function toContactRequest(record: {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  message: string;
  pickupDate: Date | null;
  returnDate: Date | null;
  createdAt: Date;
}): ContactRequest {
  return {
    id: record.id,
    fullName: record.fullName,
    email: record.email,
    phone: record.phone,
    message: record.message,
    pickupDate: record.pickupDate?.toISOString() ?? null,
    returnDate: record.returnDate?.toISOString() ?? null,
    createdAt: record.createdAt.toISOString(),
  };
}

function parseOptionalDate(value?: string): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function createContactRequestService(
  input: ContactInput
): Promise<ContactRequest> {
  const contactRequest = await prisma.contactRequest.create({
    data: {
      fullName: input.fullName,
      email: input.email,
      phone: input.phone ?? null,
      message: input.message,
      pickupDate: parseOptionalDate(input.pickupDate),
      returnDate: parseOptionalDate(input.returnDate),
    },
  });

  return toContactRequest(contactRequest);
}
