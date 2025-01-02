'use client'
import { useState } from "react";

function URLInput() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async () => {
    if (!url) {
      alert("Please enter a URL");
      return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ redirectURL: url }),
      });

      if (!response.ok) {
        throw new Error("Failed to create short URL");
      }

      const data = await response.json();
      setShortUrl(`${window.location.origin}/${data.shortId}`);
      setUrl(""); // Clear input field after submission
    } catch (error: any) {
      console.error("Error creating short URL:", error.message);
      alert("Something went wrong. Please try again!");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Enter a URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 rounded w-full text-black"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded w-full"
      >
        Create Short URL
      </button>
      {shortUrl && (
        <div className="mt-4 p-2 bg-gray-100 border rounded">
          <p>Short URL created:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default URLInput;
