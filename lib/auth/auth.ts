import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

var bcrypt = require('bcryptjs');

import { getUser } from "@/lib/utils/db"

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      return session
    },
  },
  providers: [
    // GitHub,
    Credentials({
      // The name to display on the sign-in form (e.g. 'Sign in with...')
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "exemplo@gmail.com" },
        password: {  label: "Password", type: "password" }
      },
      authorize: async (credentials: {email?: any, password?: any}) => {
        const check = await getUser(credentials.email)

        if(check) {
          console.log(credentials.password)
          console.log(check.password)

          const hashedPassword = bcrypt.compareSync(credentials.password, check.password);

          if(hashedPassword) {
            return Promise.resolve(check) as any;
          } else {
            return Promise.resolve(null) as any;
          }
        }
      }
    })
    /*
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null
 
        // logic to salt and hash password

        // const hashedPassword = await bcrypt.hash(credentials.password);
        
        // logic to verify if the user exists
        const userQuery = await getUser(credentials.email)
 
        if (!userQuery) {
          throw new Error("User not found.")
        }

        const hashedPassword = await bcrypt.hash(credentials.password, userQuery.salt);

        if(userQuery.password !== hashedPassword) {
          throw new Error("Wrong Password")
        }
        // return user object with their profile data
        return user
        
      },
      
    }),
    */
  ],
})