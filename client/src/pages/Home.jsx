import HomeComponent from '../components/Home/Home';
import Navbar from '../components/Navbar/Navbar';
import PatientForm from '../components/PatientForm/PatientForm';
import Sede from './Sede';
/* import SedeComponent from '../components/Sede/Sede'; */

export default function Home() {


    
    return (
        <div>
        <Navbar/>

            <div>

        <HomeComponent/>
            </div>
    
        {/*         <div>
                    <PatientForm/>
                </div> */}

        </div>
    )
}