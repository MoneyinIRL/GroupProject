import mongoose from "mongoose";
import { auth } from '@/auth';
import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import { Movie } from "@/models/movieSchema";
import { isValidObjectId } from 'mongoose';

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    try {
        // Get session
        const session = await auth();
        if (!session) {
            return NextResponse.json(
                { message: "Authentication required" },
                { status: 401 }
            );
        }

        await connectMongoDB();

        console.log("Delete request for ID:", params.id); // Debug log

        // Try both _id and movieId
        const movie = await Movie.findOneAndDelete({
            $or: [
                { movieId: parseInt(params.id), userId: session.user.id },
                { _id: params.id, userId: session.user.id }
            ]
        });

        console.log("Delete result:", movie); // Debug log

        if (!movie) {
            return NextResponse.json(
                { message: "Movie not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Movie deleted successfully",
            id: params.id
        });

    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json(
            { message: "Error deleting movie" },
            { status: 500 }
        );
    }
}