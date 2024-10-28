import NavbarRelative from "../components/Navbar/NavbarRelative";
import RegisterDocotorComponent from "../components/RegisterDoctor/RegisterDoctor";

export default function RegisterDoctor() {
    return (
        <div>
            <NavbarRelative />
            <div>
                <RegisterDocotorComponent/>
            </div>
        </div>
    )
}