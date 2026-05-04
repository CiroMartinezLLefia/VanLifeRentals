import { ContactRequest, Result } from "../types";
import { createContactRequestService } from "../services/contactService";
import { validateContactInput } from "../validators";

export function createContact(payload: unknown): Result<ContactRequest> {
  const validation = validateContactInput(payload);
  if (!validation.ok) {
    return {
      ok: false,
      status: 400,
      error: { message: "Validation failed", details: validation.errors },
    };
  }

  const contactRequest = createContactRequestService(validation.data);
  return { ok: true, data: contactRequest };
}
