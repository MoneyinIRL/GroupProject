import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import { Movie } from "@/models/movieSchema";

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    try {
        await connectMongoDB();
        const movieId = Number(params.id); // Convert to number without awaiting
        console.log("Attempting to delete movie with movieId:", movieId);

        const movie = await Movie.findOneAndDelete({ movieId });

        if (!movie) {
            return NextResponse.json(
                { message: "Movie not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Movie deleted successfully", movieId },
            { status: 200 }
        );
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json(
            { message: "Error deleting movie", error },
            { status: 500 }
        );
    }
}