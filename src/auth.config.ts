import type { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: '/loginpage',
    signUp: '/signuppage',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const protectedPaths = ['/profile', '/addmovie', '/api/movies']
      const isProtectedRoute = protectedPaths.some(path => 
        nextUrl.pathname.startsWith(path)
      )
      return isProtectedRoute ? isLoggedIn : true
    },
    jwt({ token, user }) {
      if (user) {
        token.username = user.username
        token.userId = user.id
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.username = token.username as string
        session.user.id = token.userId as string
      }
      return session
    }
  },
  providers: [],
}