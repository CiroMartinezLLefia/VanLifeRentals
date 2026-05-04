import { ContactInput, ContactRequest } from "../types";
import { createContactRequest } from "../mockData";

export function createContactRequestService(
  input: ContactInput
): ContactRequest {
  return createContactRequest(input);
}
