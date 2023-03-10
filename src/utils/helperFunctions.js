import { db } from '../firebase'
import { collection, getDocs} from 'firebase/firestore';
import { useState, useEffect } from 'react';

export const GetAgencys = () => {
    const [agencys, setAgencys] = useState([])
    const agencyCollection = collection(db, 'agency')
    useEffect(() => {
        const getAgencyList = async () => {
        try {
            const data = await getDocs(agencyCollection);
            const dataAgencys = data.docs
                .map((doc) => ({
                ...doc.data(),
                id: doc.id,
                }));
                setAgencys(dataAgencys)
        } catch(err){
            console.log(err);
        }
        }
        getAgencyList()
    }, [])
    return agencys
}