import React from "react";
import { PeopleInfo } from "../component/PeopleInfo";
import { PlanetInfo } from "../component/PlanetInfo";
import { NavsInfo } from "../component/NavsInfo";
import { useLocation, useParams } from "react-router-dom";

export const InfoItem = () => {
    const params = useParams()
    const path = useLocation()
    if (path.pathname.includes("people")) {
        return <PeopleInfo params={params} />
    } else if (path.pathname.includes("planets")) {
        return <PlanetInfo params={params} />
    } else if (path.pathname.includes("starships")) {
        return <NavsInfo params={params} />
    }
}