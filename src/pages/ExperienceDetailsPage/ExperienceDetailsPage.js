import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { getExperienceById } from "../../services/FirebaseServices/agencyServices";

const ExperienceDetailsPage = () => {
    const [experience, setExperience] = useState();
    const { agencyId, experienceId } = useParams();

    useEffect(() => {
        getExperienceById(agencyId, experienceId)
            .then((exp) => {
            setExperience(exp)
            console.log(exp);
        })
        .catch((error) => {
            console.log(error);
        });
    },[agencyId, experienceId]);
    return(
        <div>
            <h2>Agencia con id: {agencyId} con la exp de id: { experienceId }</h2>
            {
                experience ? (
                    <>
                        <p>{experience.name}</p>
                        <p>{experience.description}</p>
                    </>
                ):(
                    <p>Sin Datos que Mostrar</p>
                )
            }
        </div>
    );
};
export default ExperienceDetailsPage;