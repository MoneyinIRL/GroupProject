import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "./libs/mongodb";
import bcrypt from 'bcrypt';
import { User } from "@/models/userSchema";
import { user } from "@/app/frontend/components/types";
import { users } from "@/app/frontend/components/types";

export const { 
  handlers: { GET, POST }, 
  auth, 
  signIn, 
  signOut 
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        
        if (!credentials) return null;
        try {
          const response = await connectMongoDB();
          console.log(response)
          const user = await User.findOne({ username: credentials.username }).lean<user>();
          console.log(user)
          if (user) {
            
            const isMatch = await bcrypt.compare( credentials.password as string,user.password );
            
            if (isMatch) {
              console.log("Matched")
              return user;
            }
             else {
              console.log("Username or Password not correct");
              return null;
            }
          } else {
            console.log("User not found");
            return null;
          }
        } catch (error: any) {
          console.log("An error occurred: ", error);
          return null;
        }
      }
    }),
  ]
});
