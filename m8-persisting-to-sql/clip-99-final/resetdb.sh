rm prisma/dev.db
npx prisma generate
prisma migrate dev --name m1
# npx prisma db seed