'use client';
import { useState } from 'react';

function URLInput() {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    async function handleClick() {
        try {
            if (!url) {
                alert('Please enter a valid URL');
                return;
            }

            const response = await fetch(`${BASE_URL}/api/url`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();
            setShortUrl(`${BASE_URL}/${data.data.shortId}`);
            setUrl("");
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the short URL');
        }
    }

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
            onClick={handleClick}
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded w-full"
        >
            Create Short URL
        </button>

        {shortUrl && (
            <div className="mt-4 p-4 bg-green-100 rounded">
            <p className="text-green-700">Short URL created successfully:</p>
            <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline break-all"
            >
                {shortUrl}
            </a>
            </div>
        )}
        </div>
    );
}

export default URLInput;
