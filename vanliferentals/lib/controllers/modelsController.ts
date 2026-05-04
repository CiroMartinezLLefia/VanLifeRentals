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

export function listModels(): Result<Model[]> {
  return { ok: true, data: listModelsService() };
}

export function getModel(modelId: string): Result<Model> {
  const model = getModelService(modelId);
  if (!model) {
    return { ok: false, status: 404, error: { message: "Model not found" } };
  }
  return { ok: true, data: model };
}

export function createModel(payload: unknown): Result<Model> {
  const validation = validateModelInput(payload);
  if (!validation.ok) {
    return {
      ok: false,
      status: 400,
      error: { message: "Validation failed", details: validation.errors },
    };
  }
  const model = createModelService(validation.data);
  return { ok: true, data: model };
}

export function updateModel(modelId: string, payload: unknown): Result<Model> {
  const validation = validateModelUpdateInput(payload);
  if (!validation.ok) {
    return {
      ok: false,
      status: 400,
      error: { message: "Validation failed", details: validation.errors },
    };
  }

  const model = updateModelService(modelId, validation.data);
  if (!model) {
    return { ok: false, status: 404, error: { message: "Model not found" } };
  }
  return { ok: true, data: model };
}
