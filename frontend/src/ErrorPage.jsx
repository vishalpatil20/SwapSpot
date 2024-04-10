import { Link, useRouteError } from "react-router-dom";
import errorI from "./assets/error.png";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex flex-col items-center justify-center h-screen">
      <img src={errorI} alt="Error" className="mb-4 h-20" />
      <h1 className="text-4xl font-bold mb-2">Oops!</h1>
      <p className="text-lg text-center mb-4">Sorry, an unexpected error has occurred.</p>
      <p className="italic text-gray-700 mb-4">{error.statusText || error.message}</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
        <Link to="/">Go back to Home</Link>
      </button>
    </div>
  );
}
