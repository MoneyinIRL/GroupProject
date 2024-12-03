import { auth } from "@/auth";
import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import { Movie } from "@/models/movieSchema";

export async function GET() {
    try {
        await connectMongoDB();
        const movies = await Movie.find();
        return NextResponse.json(movies);
    } catch (error) {
        console.error("Error fetching movies:", error);
        return NextResponse.json(
            { message: "Error fetching movies", error },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectMongoDB();
        const movieData = await request.json();
        
        const movie = await Movie.create(movieData);
        
        return NextResponse.json(
            { message: "Movie created", movie },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving movie:", error);
        return NextResponse.json(
            { message: "Error saving movie", error },
            { status: 500 }
        );
    }
}
