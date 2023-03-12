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
                        {/*Colocar card en un componente*/}
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
                                    <Link to={`/agencia/${experiences[agencyId].agency.key}`} >{experiences[agencyId].agency.name}</Link>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {experience.name}
                                    <Link to={`/${experiences[agencyId].agency.key}/${experience.key}`}>Reservar</Link>
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
        </div>
    )
}
export default Experiences;