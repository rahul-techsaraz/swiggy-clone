import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../App";

export const appRouter = createBrowserRouter(
    [
        {
            path: '/',
            element:<AppLayout />
    }
    ]
)