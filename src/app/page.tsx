import Head from "next/head";
import URLInput from "../components/URLInput";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Head>
            <title>URL Shortener</title>
            <meta name="description" content="A simple URL shortener app built with Next.js" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center p-4 w-full max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
            URL Shortener
            </h1>
            <p className="text-gray-600 mb-4">
            Enter a URL to shorten it quickly and easily!
            </p>
            <URLInput />
        </main>
        </div>
    );
}
