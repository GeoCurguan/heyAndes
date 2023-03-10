import { db } from '../firebase';
import { collection, getDocs} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Hidden } from '@mui/material';
import '../assets/experiences.css';
import imagen from '../assets/Naturaleza_camping_1.jpg';

function Experiences () {
    const [experiences, setExperiences] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const collectionAgencyRef = collection(db, 'agency');
            const querySnapshot = await getDocs(collectionAgencyRef);
            if (!querySnapshot.empty) {
                const promises = [];
                const experiencesByAgency = {};
                querySnapshot.forEach((agencyDoc) => {
                    const agencyId = agencyDoc.id;
                    const experiencesRef = collection(agencyDoc.ref, 'experiences');
                    const queryExperiencesPromise = getDocs(experiencesRef);
                    const promise = queryExperiencesPromise.then((queryExperiencesSnapshot) => {
                        if (!queryExperiencesSnapshot.empty) {
                            const experiences = queryExperiencesSnapshot.docs.map(doc => doc.data());
                            experiencesByAgency[agencyId] = { agency: agencyDoc.data(), experiences };
                        }
                    });
                    promises.push(promise);
                });
                await Promise.all(promises);
                setExperiences(experiencesByAgency);
            }
        }
        return () => fetchData();

    },[])
    return(
        <div className='cardParent'>
        {
            Object.keys(experiences).map(agencyId => (
                <>
                    {experiences[agencyId].experiences.map(experience => (
                        <div key={agencyId} className='cardContainer'>
                        <Card >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image= {imagen}
                                    alt="Camping al atardecer"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {experiences[agencyId].agency.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {experience.name}
                                    <Link to={`/experiencias/${experience.key}`}>Reservar</Link>
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        </div>
                    ))
                    }
                </>
            ))
        }

        {/*
            Object.keys(experiences).map(agencyId => (
                <div key={agencyId} className='cardContainer'>
                    <h2 key={agencyId}>{experiences[agencyId].agency.name}</h2>
                    <ul key={experiences[agencyId].agency.id}>
                    {experiences[agencyId].experiences.map(experience => (
                        <li key={experience.id}>{experience.name}</li>

                    ))}
                    </ul>
                </div>
            ))
        */}
        </div>
    )
}
export default Experiences;