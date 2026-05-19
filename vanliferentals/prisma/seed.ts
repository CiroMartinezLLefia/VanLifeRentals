import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const models = [
  {
    slug: "sunlight-cliff-640",
    name: "Sunlight Cliff 640",
    description:
      "Camper versatil per escapades llargues amb cuina completa i espai de descans ampli.",
    pricePerDay: 120,
    currency: "EUR",
    seats: 4,
    beds: 3,
    transmission: "Manual",
    fuel: "Diesel",
    features: ["Cuina", "Dutxa", "WC", "Calefaccio", "Tendal"],
    imageUrl:
      "https://www.freytag-reisemobile.de/wp/wp-content/uploads/2022/11/SUNLIGHT_CLIFF_640_2022-2_web.jpg",
    isFeatured: true,
  },
  {
    slug: "volkswagen-california",
    name: "Volkswagen California",
    description:
      "La classica camper compacta amb acabats premium i un interior modular.",
    pricePerDay: 150,
    currency: "EUR",
    seats: 4,
    beds: 4,
    transmission: "Automatic",
    fuel: "Diesel",
    features: ["Dutxa", "GPS", "WC", "Portabicis", "Climatitzacio"],
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3MoqhPMlCq6DXLOGwXsEKZz8_jCH4YoNzbQ&s",
    isFeatured: true,
  },
  {
    slug: "ford-transit-custom",
    name: "Ford Transit Custom",
    description:
      "Model equilibrat amb espai per equipatge i comoditats essencials.",
    pricePerDay: 110,
    currency: "EUR",
    seats: 4,
    beds: 2,
    transmission: "Manual",
    fuel: "Diesel",
    features: ["Cuina", "Frigorific", "GPS", "Bancs modulars"],
    imageUrl:
      "https://camperplanet.es/wp-content/uploads/2024/11/ford-transit-custom-nugget5.jpg",
    isFeatured: true,
  },
  {
    slug: "hymer-grand-canyon",
    name: "Hymer Grand Canyon",
    description:
      "Camper premium amb bany complet i autonomia per viatges llargs.",
    pricePerDay: 145,
    currency: "EUR",
    seats: 4,
    beds: 2,
    transmission: "Automatic",
    fuel: "Diesel",
    features: ["Bany complet", "Bateria extra", "Placa solar", "Tendal"],
    imageUrl:
      "https://www.hymer.com/uk/en/sites/default/files/styles/model_teaser/public/2023-09/grand-canyon-s.jpg",
    isFeatured: false,
  },
  {
    slug: "burstner-lineo-c-590",
    name: "Burstner Lineo C 590",
    description:
      "Compacta pero espaiosa, ideal per parelles que volen comoditat.",
    pricePerDay: 125,
    currency: "EUR",
    seats: 4,
    beds: 2,
    transmission: "Manual",
    fuel: "Diesel",
    features: ["Cuina", "WC", "Calefaccio", "USB multiple"],
    imageUrl:
      "https://www.buerstner.com/fileadmin/user_upload/wohnmobile/lineo-c/lineo-c-590-hero.jpg",
    isFeatured: false,
  },
  {
    slug: "mercedes-marco-polo",
    name: "Mercedes Marco Polo",
    description:
      "Camper elegant amb tecnologia avancada i conduccio premium.",
    pricePerDay: 140,
    currency: "EUR",
    seats: 4,
    beds: 2,
    transmission: "Automatic",
    fuel: "Diesel",
    features: ["Climatitzacio", "Cuina compacta", "Sensors 360", "GPS"],
    imageUrl:
      "https://media.mercedes-benz.com/marsMediaSite/instance/picture?oid=46398944&attribute=Preview&thumbnail=true",
    isFeatured: false,
  },
];

const users = [
  {
    name: "VanLife Admin",
    email: "admin@vanlife.test",
    password: "Password123!",
    role: Role.ADMIN,
  },
  {
    name: "VanLife Editor",
    email: "editor@vanlife.test",
    password: "Password123!",
    role: Role.EDITOR,
  },
  {
    name: "VanLife User",
    email: "user@vanlife.test",
    password: "Password123!",
    role: Role.USER,
  },
];

async function main() {
  for (const model of models) {
    await prisma.vanModel.upsert({
      where: { slug: model.slug },
      update: model,
      create: model,
    });
  }

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        role: user.role,
        hashedPassword,
      },
      create: {
        name: user.name,
        email: user.email,
        role: user.role,
        hashedPassword,
      },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
