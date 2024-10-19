import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Questions from "./pages/Questions";

// Define the router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="questions" element={<Questions />} />
    </Route>
  )
);

// App component with Outlet to render child routes
function App() {
  return (
    <>
      <h1 className="text-5xl">Welcome to the Quiz App</h1>
      <Outlet /> {/* This renders the child routes */}
    </>
  );
}

export default function RootApp() {
  return <RouterProvider router={router} />;
}
