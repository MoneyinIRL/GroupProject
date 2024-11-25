import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import { Movie } from "@/models/movieSchema";

export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();
        
        const body = await request.json();
        console.log("Received movie data:", body);

        const movie = await Movie.create(body);
        console.log("Created movie:", movie);

        return NextResponse.json(
            { message: "Movie saved successfully", movie },
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