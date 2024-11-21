import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import { User } from "@/models/userSchema";
import bcrypt from 'bcrypt';

interface RouteParams {
    params: { id:string};   
}

export async function POST(request: NextRequest){
    const {username,password,email} = await request.json();
    const hashedPassword = await bcrypt.hash(password,5);
    const newUser = {
        username,
        password:hashedPassword,
        email
    }
    await connectMongoDB();
    try {
        await User.create(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
    }
    return NextResponse.json({ message: "Item added successfully"}, {status: 201})
}









