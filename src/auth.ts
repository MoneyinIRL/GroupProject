import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { User } from '@/models/userSchema'
import connectMongoDB from '@/libs/mongodb'

const handler = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            throw new Error('Missing credentials')
          }

          await connectMongoDB()
          
          const user = await User.findOne({ 
            username: credentials.username 
          })

          if (!user) {
            throw new Error('User not found')
          }

          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!passwordsMatch) {
            throw new Error('Invalid password')
          }

          return {
            id: user._id.toString(),
            username: user.username,
            email: user.email
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.username = token.username
      }
      return session
    }
  },
  pages: {
    signIn: '/loginpage',
    error: '/loginpage'
  }
})

export const { auth, signIn, signOut } = handler
export const GET = handler.handlers.GET
export const POST = handler.handlers.POST
