import CampgroundCard from "./components/CampgroundCard"
import { useEffect, useState } from "react"

export default function CampgroundIndex() {
    const [campgroundList, setCampgroundList] = useState([]);
    const fetchInfo = () => {
        fetch("http://localhost:3000/api/campgrounds")
            .then(res => res.json())
            .then(campgroundListData => setCampgroundList(campgroundListData.campgrounds));
    }
    useEffect(() => { fetchInfo() }, []);

    return (
        <>
            <h1>All campgrounds</h1>
            {/* <div>{response.description}</div> */}
            {
                campgroundList.map((campground, i) => {
                    return (
                        <CampgroundCard key={campground.id} campground={campground} />
                    )
                })
            }
            
        </>
    )
}

//fix data fetching