import { PrismaClient } from "@prisma/client";

export const errorFormat = function (errorMessage) {
  const str =
    process.env.NODE_ENV == "production"
      ? " (try refreshing the page and trying again)"
      : errorMessage;
  console.log(str);
  return str;
};

let prisma;

const overrideLogging = false;

if (process.env.NODE_ENV === "production" || overrideLogging === true) {
  prisma = new PrismaClient({});
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ["query", "info", `warn`, `error`],
    });
  }
  prisma = global.prisma;

  // prisma.$on("query", (e) => {
  //   console.log("Query: " + e.query);
  //
  //   const DELAYMS = 1000;
  //   let now = Date.now();
  //   const end = now + DELAYMS;
  //   while (now < end) { now = Date.now(); }
  //
  //   console.log("Duration: " + e.duration + "ms");
  // });
}
export default prisma;
