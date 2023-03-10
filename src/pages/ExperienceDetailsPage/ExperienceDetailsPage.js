import React from "react";
import { useParams } from "react-router-dom";

const ExperienceDetailsPage = () => {
    const { experienceId } = useParams();
    return(
        <div>
            <h2>Detalles del producto con id: { experienceId }</h2>
        </div>
    );
};
export default ExperienceDetailsPage;