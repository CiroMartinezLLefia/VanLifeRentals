import { Model, ModelInput, ModelUpdateInput } from "../types";
import {
  createModel,
  findModelById,
  listModels,
  updateModel,
} from "../mockData";

export function listModelsService(): Model[] {
  return listModels();
}

export function getModelService(modelId: string): Model | undefined {
  return findModelById(modelId);
}

export function createModelService(input: ModelInput): Model {
  return createModel(input);
}

export function updateModelService(
  modelId: string,
  input: ModelUpdateInput
): Model | undefined {
  return updateModel(modelId, input);
}
