import {query, doc, collection, where, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../firebase"

//Agrega a una lista las experiencias de una agencia con el agencyId
function getExperienceByAgency(agencyId){
    return new Promise(async (resolve, reject) => {
        const experienceByAgencyRef = query(collection(db, 'agency'), where('key', '==', agencyId));
        try {
            const querySnapshot = await getDocs(experienceByAgencyRef);
            if(!querySnapshot.empty){
                const agencyDoc = querySnapshot.docs[0];
                const experienceRef = collection(agencyDoc.ref, 'experiences');
                const experiencesSnapshot = await getDocs(experienceRef);
                const experiences = [];
                experiencesSnapshot.forEach((experienceDoc) => {
                    experiences.push(experienceDoc.data());
                });
                resolve(experiences);
            }else{
                reject ('EMPTY_AGENCY');
            }
        } catch (error){
            reject(error);
        }
    });
}

//Obtiene las experiencia a partir del agencyId y el experienceId
function getExperienceById(agencyId, experienceId){
    return new Promise(async (resolve, reject) => {
        const experienceRef = doc(collection(doc(db, 'agency', agencyId), 'experiences'), experienceId);
        try {
            const docSnapshot = await getDoc(experienceRef);
            if(docSnapshot.exists()){
                resolve(docSnapshot.data());
            }else{
                reject(false);
            }
        } catch (error){
            reject (error);
        }
    });
}

export {
    getExperienceByAgency,
    getExperienceById
}