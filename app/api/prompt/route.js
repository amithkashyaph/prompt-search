import { connectToDatabase } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (request) => {
    let tag = request.nextUrl.searchParams.get("tag");

    const {searchParams} = new URL(request.url);
    const param = searchParams.get("tag");
    // console.log("Param : ",param);
    // console.log("Hello there : ", tag);
   
    
    const condition = tag ? { tag } : {}
    
        
    
    try {
        await connectToDatabase();
        console.log("condition : ",condition)

        const prompts = await Prompt.find(condition).populate("creator");
        return new Response(JSON.stringify(prompts), {
            status: 200
        })
    } catch (error) {
        return new Response("Error fetching prompts from the DB", {
            status: 500
        })
    }
};