import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { getExperienceByAgency } from "../../services/FirebaseServices/agencyServices";

const ExperienceByAgencyPage = () => {
    const { agencyId } = useParams();
    const [experiences, setExperiences] = useState();
    useEffect(() => {
        getExperienceByAgency(agencyId)
            .then((exp) => {
            setExperiences(exp)
            console.log(exp);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [agencyId]);
    return(
        <div>
            <h2>Listado de experiencia de la agencia con id: { agencyId }</h2>
            {
                experiences ? (
                    <ul>
                    {experiences.map((info) => (
                        <li key={info.key}>{info.name}</li>
                ))}
                    </ul>
                ) : (
                    <p>Sin Datos que Mostrar</p>
                )
            }
        </div>
    );
};
export default ExperienceByAgencyPage;