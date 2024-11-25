import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import { Movie } from '@/models/movieSchema';

export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();
        const data = await request.json();
        
        // Check if movie already exists
        const existingMovie = await Movie.findOne({ movieId: data.movieId });
        if (existingMovie) {
            return NextResponse.json(
                { message: 'Movie already exists' },
                { status: 200 }
            );
        }

        const movie = await Movie.create(data);
        return NextResponse.json({ message: 'Movie saved', movie }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error saving movie', error },
            { status: 500 }
        );
    }
}