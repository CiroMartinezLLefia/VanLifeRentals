import { ContactRequest, Result } from "../types";
import { createContactRequestService } from "../services/contactService";
import { validateContactInput } from "../validators";

export async function createContact(
  payload: unknown
): Promise<Result<ContactRequest>> {
  const validation = validateContactInput(payload);
  if (!validation.ok) {
    return {
      ok: false,
      status: 400,
      error: { message: "Validation failed", details: validation.errors },
    };
  }

  const contactRequest = await createContactRequestService(validation.data);
  return { ok: true, data: contactRequest };
}
