rm prisma/dev.db
npx prisma generate
#prisma migrate dev --name m1
npx prisma migrate dev --skip-seed
# npx prisma db seed
