import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { Image } from "openai/resources/images.mjs";

type ResponseData = {
  message: string;
  image_test: Image[];
  image_url: any
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log(req.body)

  const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"],
  });
  const image = await openai.images.generate({
    prompt: req.body.prompt,
    size: req.body.size,
    model: req.body.model,
    quality: req.body.quality
  });
  console.log(image.data[0])
  res.status(200).json({
    message: "Hello from Next.js!",
    image_test: image.data,
    image_url: image.data[0]
  });
}
