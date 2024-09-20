import { Outlet } from "react-router-dom"

export default function CampgroundShow() {
    const campground = {
        name: "Misty Woods",
        location: "Texas",
        // id: "a1",
    }
    return (
        <>
            <div>
                <h1>{campground.name}</h1>
                <h2>{campground.location}</h2>
            </div>
            <div>
                <form>
                    Leave a Review (only show if logged in)
                    <br/>
                    <input type="text" />
                    <button>Submit</button>
                </form>
                <ul>
                    <li>Review 1</li>
                    <li>Review 2</li>
                </ul>
                <div>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}