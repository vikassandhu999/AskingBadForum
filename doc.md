yarn init

#Typescript setup
yarn add @types/node typescript
yarn add -D ts-node

#Create tsconfig.json, required for tsc and ts-node, to compile TypeScript to JavaScript:
yarn tsc --init --rootDir src --outDir ./bin --esModuleInterop --lib ES2019 --module commonjs --noImplicitAny true

#
mkdir src

yarn add body-parser @types/body-parser multer @types/multer cookie-parser @types/cookie-parser bcrypt @types/bcrypt jsonwebtoken @types/jsonwebtoken

#random key
node -e console.log(require('crypto').randomBytes(48).toString('hex'))


# Forum API
## usecases
    * Create Thread
    * ReplyTo Comments
    * getReplies (paged)
    * edit() // may be there
    
## Refrencing in database
    decided to go with manual referencing rather than DRefs - it will be efficient for the app to make two queries rather than $lookup operation