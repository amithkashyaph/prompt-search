import { connectToDatabase } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (req, { params }) => {
    try {
        await connectToDatabase();
        const prompt = await Prompt.findById(params.id).populate("creator");
        if(!prompt) {
            return new Response("resource not found", {
                status: 404
            });
        }
        return new Response(JSON.stringify(prompt), {
            status: 200
        });
    } catch (error) {
        return new Response("Error fetching prompts from the DB", {
            status: 500
        });
    }
};


export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();

    try {
        await connectToDatabase();
        const existingPrompt = await Prompt.findById(params.id).populate("creator");
        if(!existingPrompt) {
            return new Response("resource not found", {
                status: 404
            });
        }
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {
            status: 200
        });
    } catch (error) {
        return new Response("Error updating prompt in the DB", {
            status: 500
        });
    }
};


export const DELETE = async (req, { params }) => {

    try {
        await connectToDatabase();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt successfully deleted!", {
            status: 200
        });
    } catch (error) {
        return new Response("Error fetching prompts from the DB", {
            status: 500
        });
    }
};