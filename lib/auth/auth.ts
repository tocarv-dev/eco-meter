import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

import bcrypt from 'bcrypt';

import { getUser } from "@/lib/utils/db"

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Credentials({
      // The name to display on the sign-in form (e.g. 'Sign in with...')
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Add your own logic here to find the user and verify their password
        const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com', password: '1234' }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(user)
        } else {
          // If you return null or false then the credentials will be rejected
          return Promise.resolve(null)
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject('/path/to/redirect')        // Redirect to a URL
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