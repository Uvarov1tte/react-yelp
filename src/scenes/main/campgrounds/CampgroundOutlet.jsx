import { Outlet } from "react-router-dom"

export default function CampgroundOutlet() {
    return (
        <>
            <div>campgrounds parent, only outlet</div>
            <div>
                <Outlet />
            </div>
        </>
    )
}