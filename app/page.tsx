"use client";
import { useState } from "react";
import Image from "next/image";
import { PropagateLoader } from "react-spinners";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [model, setModel] = useState<string>("dall-e-3");
  const [size, setSize] = useState<string>("1024x1024");
  const [quality, setQuality] = useState<string>("standard");
  const [image, setImage] = useState<string | undefined>();
  const [isloading, setIsloading] = useState<boolean>(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setImage("");
    setIsloading(true)
    try {
      const response = await fetch("/api/dallee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          model,
          size,
          quality,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const data = await response.json();
      setIsloading(false)
      setImage(data.image_url.url);
    } catch (error) {
      console.error("Error fetching image:", error);
      setImage(undefined);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-black text-center">
      <form
        onSubmit={handleFormSubmit}
        className="space-y-2 flex items-center flex-col bg-white p-4 rounded mb-10"
      >
        <h1 className="text-2xl font-bold">Type your prompt for the AI</h1>
        <input
          className="bg-slate-300 rounded p-2 min-w-full"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your input here"
        />
        <select
          className="bg-slate-300 rounded p-2 min-w-full text-center cursor-pointer"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="dall-e-3">dalle-3</option>
          <option value="dall-e-2">dalle-2</option>
        </select>
        <select
          className="bg-slate-300 rounded p-2 min-w-full text-center cursor-pointer"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="256x256">256x256</option>
          <option value="512x512">512x512</option>
          <option value="1024x1024">1024x1024</option>
          <option value="1024x1792">1024x1792</option>
          <option value="1792x1024">1792x1024</option>
        </select>
        <select
          className="bg-slate-300 rounded p-2 min-w-full text-center cursor-pointer"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
        >
          <option value="standard">standard</option>
          {model === "dall-e-3" && (
            <option value="hd">hd - more realistic photos</option>
          )}
        </select>

        <button className="bg-emerald-200 min-w-full rounded p-1 hover:bg-emerald-100 transition-colors" type="submit">
          Send
        </button>
      </form>
      {image ? (
        <Image
          src={image}
          width={Number(size.split("x")[0])}
          height={Number(size.split("x")[1])}
          alt="generated image"
          priority
        />
      ) : isloading ? (
        <PropagateLoader
          color="#fff"
          loading={isloading}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <h1 className="text-white">No image to display</h1>
      )}
    </main>
  );
}
