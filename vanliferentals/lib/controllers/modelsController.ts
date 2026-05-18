import { Model, Result } from "../types";
import {
  createModelService,
  getModelService,
  listModelsService,
  updateModelService,
} from "../services/modelsService";
import {
  validateModelInput,
  validateModelUpdateInput,
} from "../validators";

export async function listModels(): Promise<Result<Model[]>> {
  return { ok: true, data: await listModelsService() };
}

export async function getModel(modelId: string): Promise<Result<Model>> {
  const model = await getModelService(modelId);
  if (!model) {
    return { ok: false, status: 404, error: { message: "Model not found" } };
  }
  return { ok: true, data: model };
}

export async function createModel(payload: unknown): Promise<Result<Model>> {
  const validation = validateModelInput(payload);
  if (!validation.ok) {
    return {
      ok: false,
      status: 400,
      error: { message: "Validation failed", details: validation.errors },
    };
  }
  const model = await createModelService(validation.data);
  return { ok: true, data: model };
}

export async function updateModel(
  modelId: string,
  payload: unknown
): Promise<Result<Model>> {
  const validation = validateModelUpdateInput(payload);
  if (!validation.ok) {
    return {
      ok: false,
      status: 400,
      error: { message: "Validation failed", details: validation.errors },
    };
  }

  const model = await updateModelService(modelId, validation.data);
  if (!model) {
    return { ok: false, status: 404, error: { message: "Model not found" } };
  }
  return { ok: true, data: model };
}
