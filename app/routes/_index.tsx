import { Form } from '@remix-run/react';
import { redirect, ActionFunctionArgs } from '@remix-run/node';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  // do some stuff with the form data
  // e.g send data to your external API - We want MSW to intercept this request in our Cypress test
  const response = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    return redirect("/errorPage");
  }

  const data = await response.json();
  const id = data.id;

  return redirect(`/success?id=${id}`);
}

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Create a new product
          </h1>
          <Form method="post" className="flex flex-col space-y-6">
            <input type="text" placeholder="title" name="title" className="bg-white text-black" required />
            <input
              value="Create a new product"
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300 cursor-pointer"
            />
          </Form>
        </header>
      </div>
    </div>
  );
}
