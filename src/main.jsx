import * as React from "react";
import * as ReactDOM from "react-dom/client";
// import App from './App.jsx'
import {
	createBrowserRouter,
	Outlet,
	RouterProvider,
} from "react-router-dom";
import './index.css'
import ErrorPage from "./scenes/ErrorPage.jsx";
import Home from "./scenes/home/home.jsx";
import Root from "./scenes/main/root.jsx";
import CampgroundOutlet from "./scenes/main/campgrounds/CampgroundOutlet.jsx";
import CampgroundIndex from "./scenes/main/campgrounds/CampgroundIndex.jsx";
import CampgroundCreateNew from "./scenes/main/campgrounds/CampgroundCreateNew.jsx";
import CampgroundShow from "./scenes/main/campgrounds/CampgroundShow.jsx";
import CampgroundEdit from "./scenes/main/campgrounds/CampgroundEdit.jsx";
import Register from "./scenes/main/Users/Register.jsx";
import Login from "./scenes/main/Users/Login.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
	{
		path: "/home",
		element: <Home />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/",
		element: <Root />,
		// errorElement: <ErrorPage />,
		children: [
			{
				// errorElement: <ErrorPage />,
				children: [
					{
						path: "campgrounds",
						// element: <CampgroundOutlet />,
						children: [
							{
								index: true,
								element: <CampgroundIndex />,
							},
							{
								path: "new",
								element: <CampgroundCreateNew />,
							},
							{
								path: ":id",
								element: <CampgroundShow />,
								children: [
									{
										path: "reviews",
										element: <Outlet />,
										children: [
											{
												index: true,
												element: <div>review post request</div>
											},
											{
												path: ":reviewid",
												element: <div>review delete request, redirect</div>
											}
										]
									},
									{
										path: ":edit",
										element: <CampgroundEdit />
									},
									{
										path: "delete",
										element: <div>campground delete request, redirect</div>
									},
								]
							},

						]
					},
					{
						path: "register",
						element: <Register />
					},
					{
						path: "login",
						element: <Login />
					},
					{
						path: "logout",
						element: <div>logout, redirect.</div>
					}
				]
			}	
		]
	},

]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		{/* <App /> */}
		<RouterProvider router={router} />
	</React.StrictMode>,
)
