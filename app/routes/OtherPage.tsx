import { useSearchParams } from "@remix-run/react";

export default function OtherPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <b>The Other Page</b>
          </h1>
          <div className="p-4 bg-gray-100 shadow-inner rounded">
            <p className="text-lg text-gray-700">ID: {id}</p>
          </div>
        </header>
      </div>
    </div>
  );
}
