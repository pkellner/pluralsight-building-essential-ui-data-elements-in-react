# Module Title

## install prisma

npm i prisma

## create /prisma/schema.prisma

generator client {
provider        = "prisma-client-js"
}


datasource db {
provider = "sqlite"
url      = "file:./dev.db"
}

model Note {
id             String  @id
title          String
description    String
createDate     String
}

## initialize client and create tables

`npx prisma generate`

`prisma migrate dev --name init`

## after modifying /prisma/schema.prisma

`prisma migrate dev --name m1`

## then to seed

`npx prisma db seed`

## add code to /api/pages/notes/index.js





## all should work







