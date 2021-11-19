rm prisma/dev.db
npx prisma generate
npx prisma migrate dev --name init --skip-seed
npx prisma db seed

# npm i prisma --save-dev
# npm i @prisma/client