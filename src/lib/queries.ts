import { groq } from "next-sanity";



export const twenty = groq`*[_type == "product"][0...20]`
