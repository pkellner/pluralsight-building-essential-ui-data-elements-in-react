rm prisma/dev.db
npx prisma generate
prisma migrate dev --name init --skip-seed
#npx prisma db seed
npx prisma db seed  --preview-feature