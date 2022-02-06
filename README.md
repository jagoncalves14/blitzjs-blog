# Blitz.js Blog

Boilerplate for writing a blog using Blitz.js.

## Getting Started

1. Add this code to db/schema.prisma:

```
model Post {
  id      Int      @default(autoincrement()) @id
  name    String
}
```

2. DB migrate

```
blitz prisma migrate dev
```

3. Start the dev server

```
blitz dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
