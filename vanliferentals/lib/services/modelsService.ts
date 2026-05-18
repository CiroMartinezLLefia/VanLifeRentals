import { prisma } from "@/lib/prisma";
import { Model, ModelInput, ModelUpdateInput } from "../types";

function toModel(record: {
  id: string;
  slug: string;
  name: string;
  description: string;
  pricePerDay: number;
  currency: string;
  seats: number | null;
  beds: number | null;
  transmission: string | null;
  fuel: string | null;
  features: string[];
  imageUrl: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}): Model {
  return {
    id: record.id,
    slug: record.slug,
    name: record.name,
    description: record.description,
    pricePerDay: record.pricePerDay,
    currency: record.currency,
    seats: record.seats,
    beds: record.beds,
    transmission: record.transmission,
    fuel: record.fuel,
    features: record.features,
    imageUrl: record.imageUrl,
    isFeatured: record.isFeatured,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function listModelsService(): Promise<Model[]> {
  const models = await prisma.vanModel.findMany({
    orderBy: { createdAt: "desc" },
  });
  return models.map((model) => toModel(model));
}

export async function getModelService(
  modelId: string
): Promise<Model | undefined> {
  const model = await prisma.vanModel.findFirst({
    where: {
      OR: [{ id: modelId }, { slug: modelId }],
    },
  });
  return model ? toModel(model) : undefined;
}

export async function createModelService(input: ModelInput): Promise<Model> {
  const slug = slugify(input.name);
  const model = await prisma.vanModel.create({
    data: {
      slug,
      name: input.name,
      description: input.description,
      pricePerDay: input.pricePerDay,
      currency: input.currency ?? "EUR",
      seats: input.seats ?? null,
      beds: input.beds ?? null,
      transmission: input.transmission ?? null,
      fuel: input.fuel ?? null,
      features: input.features,
      imageUrl: input.imageUrl,
      isFeatured: input.isFeatured ?? false,
    },
  });
  return toModel(model);
}

export async function updateModelService(
  modelId: string,
  input: ModelUpdateInput
): Promise<Model | undefined> {
  const existing = await prisma.vanModel.findFirst({
    where: {
      OR: [{ id: modelId }, { slug: modelId }],
    },
  });

  if (!existing) {
    return undefined;
  }

  const updated = await prisma.vanModel.update({
    where: { id: existing.id },
    data: {
      name: input.name,
      description: input.description,
      pricePerDay: input.pricePerDay,
      currency: input.currency,
      seats: input.seats,
      beds: input.beds,
      transmission: input.transmission,
      fuel: input.fuel,
      features: input.features,
      imageUrl: input.imageUrl,
      isFeatured: input.isFeatured,
    },
  });

  return toModel(updated);
}
