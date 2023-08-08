import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        console.log('hitted get')
        return new NextResponse("hello world",{status: 200})
    } catch (error) {
        
    }
}

export async function POST(req: Request) {
    try {
        console.log('hitted POST')
        return new NextResponse("hello world",{status: 200})
    } catch (error) {
        
    }
}

