import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { DropZone } from "../components/DropZone";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function Spinner() {
  return (
    <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
      <div className="h-12 w-12 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
    </div>
  );
}
async function urlToBase64(url) {
  const res = await fetch(url);
  const blob = await res.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.readAsDataURL(blob);
  });
}

export default function TryOn({ image }) {
  const [clothUrl] = useState(image); // fixed image (URL)
  const [human, setHuman] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleTryOn() {
    if (!human) return;

    setLoading(true);
    setResult(null);

    const clothBase64 = await urlToBase64(clothUrl);
    const humanBase64 = await fileToBase64(human);

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: [
        {
          inlineData: {
            mimeType: "image/png",
            data: clothBase64,
          },
        },
        {
          inlineData: {
            mimeType: human.type,
            data: humanBase64,
          },
        },
        {
          text: "Create a realistic e-commerce virtual try-on. Put the clothing from the first image onto the person in the second image. Preserve lighting, pose, and proportions.",
        },
      ],
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        setResult(`data:image/png;base64,${part.inlineData.data}`);
      }
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl grid grid-cols-2 gap-6 p-6">
        {/* LEFT */}
        <div className="space-y-4">
          <h1 className="text-xl font-semibold">AI Virtual Try-On</h1>

          {/* FIXED CLOTHING IMAGE */}
          <div className="border rounded-xl p-4 text-center">
            <p className="text-sm font-medium mb-2">Clothing Image</p>
            <img
              src={clothUrl}
              className="h-40 mx-auto object-contain rounded-lg"
            />
          </div>

          {/* HUMAN DROPZONE */}
          <DropZone label="Human Image" file={human} setFile={setHuman} />

          <button
            onClick={handleTryOn}
            disabled={loading || !human}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-40"
          >
            {loading ? "Generating…" : "Generate Try-On"}
          </button>
        </div>

        {/* RIGHT */}
        <div className="relative border rounded-xl flex items-center justify-center bg-gray-100">
          {loading && <Spinner />}

          {result ? (
            <img
              src={result}
              className="max-h-[520px] object-contain rounded-xl"
            />
          ) : (
            <p className="text-gray-400 text-sm">Result appears here</p>
          )}
        </div>
      </div>
    </div>
  );
}
