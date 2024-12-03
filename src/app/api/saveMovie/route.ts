import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import { Movie } from '@/models/movieSchema';

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json(
                { message: "Authentication required" },
                { status: 401 }
            );
        }

        await connectMongoDB();
        const data = await request.json();

        // Extract genre names from the genres array
        const genres = Array.isArray(data.genres) 
            ? data.genres.map((genre: any) => 
                typeof genre === 'object' ? genre.name : genre
              ).filter((name: string) => name && name.trim() !== '')
            : [];

        // Add userId to movie data and clean up genres
        const movieData = {
            ...data,
            userId: session.user.id,
            movieId: data.id || Date.now(),
            genres // This should now be an array of strings
        };

        const movie = new Movie(movieData);
        const savedMovie = await movie.save();

        // Convert to plain object and send response immediately
        return NextResponse.json(
            { 
                message: "Movie saved successfully", 
                movie: savedMovie.toObject() 
            },
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