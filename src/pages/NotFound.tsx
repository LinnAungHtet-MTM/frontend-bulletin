import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-sky-600">404</h1>
        <div
          className="mt-4 text-3xl font-semibold bg-linear-to-r from-indigo-500 via-sky-400 to-emerald-500
                            bg-size-[200%_200%] bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(99,102,241,0.8)] 
                            animate-[gradient_2s_ease_infinite] truncate group-data-[collapsible=icon]:hidden"
        >
          Oops! Page not found.
        </div>

        {/* Back to Home Button */}
        <div className="mt-8">
          <Link
            to="/posts"
            className="px-6 py-3 text-white bg-sky-500 hover:bg-sky-600 rounded-lg
                      transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
