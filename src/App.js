import { db } from './firebase'
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { GetExperience } from './utils/helperFunctions'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ExperienceByAgencyPage from './pages/ExperienceByAgencyPage/ExperienceByAgencyPage';
import ExperienceDetailsPage from './pages/ExperienceDetailsPage/ExperienceDetailsPage';
import Inicio from './pages/Inicio/Inicio';
import Experiences from './components/Experiences';

const GetAgencys = () => {
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

function App() {
  //const agencysList = GetAgencys()
  //console.log(agencysList)

  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route index path='/' element={<Inicio />} />
            <Route exact path='/agencia/:agencyId' element={<ExperienceByAgencyPage />} />
            <Route exact path='/:agencyId/:experienceId' element={ <ExperienceDetailsPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
