import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import NavigationBar from "../../navigation/NavigationBar";
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import { useNavigate } from "react-router-dom";

export default function AccretionDisksAndJets(){
    const navigate = useNavigate();
    return(
        <div className="page-container">
            <NavigationBar/>
            <div className="theory-scroller">
                <h1 className="chapter-title">Chapter 5 - Accretion Disks and Jets</h1>
                <p>
                    <h2>Overview</h2>
                    Accretion disks form around compact objects such as black holes and neutron stars when infalling matter possesses angular momentum.
                    The matter spirals inward, forming a flattened, rotating disk. Energy is released as gravitational potential energy is converted to heat, radiation, and kinetic energy.
                    Accretion disks are responsible for some of the most luminous astrophysical phenomena.
                </p>
                <p>
                    <h2>Disk Formation</h2>
                    Matter captured by the black hole possesses angular momentum <InlineMath math="L" />.
                    As it loses energy through viscous dissipation, it spirals inward while maintaining angular momentum:
                    <div className="formula"><BlockMath math="\frac{dL}{dt} = \dot{M} r^2 \Omega"/></div>
                    Here: <InlineMath math="\dot{M}" /> → mass accretion rate,<br/>
                    <InlineMath math="r" /> → radial coordinate in the disk,<br/>
                    <InlineMath math="\Omega" /> → orbital angular velocity
                    <br/>Viscosity in the disk transports angular momentum outward, allowing inner regions to move closer to the black hole.
                </p>
                <p>
                    <h2>Disk Structure</h2>
                    For a thin, optically thick disk (Shakura–Sunyaev disk):
                    Scale height <InlineMath math="H(r)" />
                    <div className="formula">
                        <BlockMath math="\displaystyle H(r) = \frac{c_s}{\Omega} = \frac{\sqrt{P/\rho}}{\Omega}"/>
                    </div>
                    <InlineMath math="c_s" /> → local sound speed<br/>
                    <InlineMath math="P" /> → pressure<br/>
                    <InlineMath math="\rho" /> → mass density<br/><br/>
                    <b>Surface density</b>
                    <div className="formula"><BlockMath math="\Sigma(r) = \int_{-H}^{H} \rho \, dz"/></div>
                    <b>Viscosity prescription (α-model):</b>
                    <div className="formula">
                        <BlockMath math="\nu = \alpha c_s H"/>
                    </div>
                    <InlineMath math="\nu" /> → kinematic viscosity<br/>
                    <InlineMath math="\alpha" /> → dimensionless viscosity parameter<br/>
                    <br/>
                    The viscous heating balances radiative cooling, leading to a quasi-steady temperature profile:
                    <div className="formula">
                        <BlockMath math="T(r) \propto \left(\frac{\dot{M} G M}{\sigma r^3}\right)^{1/4}" />
                    </div>
                </p>
                <p>
                    <h2>Radiation and Energy Transport</h2>
                    The accretion disk radiates as a multi-temperature blackbody.
                    Luminosity of the disk:
                    <div className="formula">
                         <BlockMath math="L_{\rm disk} = \eta \dot{M} c^2"/>
                    </div>
                    <InlineMath math="\eta" /> → efficiency (~0.06 for Schwarzschild, up to ~0.42 for extreme Kerr)
                    <br/><br/>
                    <b>Photon energy distribution:</b>
                    <div className="formula">
                        <BlockMath math="F_\nu \propto \int_{r_{\rm in}}^{r_{\rm out}} B_\nu(T(r)) 2 \pi r \, dr"/>
                    </div>
                    <InlineMath math="B_\nu(T)" /> → Planck function<br/>
                    <InlineMath math="r_{\rm in}" />, <InlineMath math="r_{\rm out}" /> → inner and outer disk radii
                </p>
                <p>
                    <h2>Relativistic Jets</h2>
                        Jets are launched along the black hole’s rotation axis, likely powered by:
                        Blandford–Znajek mechanism: extraction of rotational energy via magnetic fields
                        <div className="formula">
                            <BlockMath math="P_{\rm jet} \sim B^2 r_H^2 c \left(\frac{a}{M}\right)^2"/>
                        </div>
                        <InlineMath math="B" /> → magnetic field near horizon<br/>
                        <InlineMath math="r_H" /> → radius of the event horizon<br/>
                        <InlineMath math="a/M" /> → dimensionless spin parameter<br/>
                        Blandford–Payne mechanism: magnetocentrifugal acceleration of disk plasma
                        Jets are highly relativistic, with Lorentz factors <InlineMath math="\Gamma \sim 10 - 100" /> in AGN.
                </p>
                <div className="next-prev-chapter-container">
                    <button className='prev-button' onClick={()=>navigate('/learning/kerr-black-holes',{replace:true})}><FaArrowLeft/></button>
                    <button className='next-button' onClick={()=>navigate('/learning/gravitational-lensing', {replace:true})}><FaArrowRight/></button>
                </div>

            </div>
        </div>
    )
}