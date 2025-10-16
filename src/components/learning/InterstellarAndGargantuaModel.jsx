import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import NavigationBar from '../../navigation/NavigationBar';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export default function InterstellarAndGargantuaModel(){
    const navigate = useNavigate();
    return(
        <div className='page-container'>
            <NavigationBar/>
            <div className='theory-scroller'>
                <h1 className='chapter-title'>Chapter 11 - Interstellar and the Gargantua Model</h1>
                
                <p>
                    <h2>Introduction</h2>
                    The movie <b><i>Interstellar</i></b> (2014), directed by Christopher Nolan and developed in collaboration with physicist <b>Kip Thorne</b>, 
                    introduced one of the most realistic depictions of a rotating black hole ever rendered in cinema — <b>Gargantua</b>.  
                    Unlike the simplified Schwarzschild black hole, Gargantua is modeled as a rapidly spinning <b>Kerr black hole</b>, 
                    whose visual appearance is shaped by <u>gravitational lensing</u>, <u>frame dragging</u>, and <u>relativistic Doppler beaming</u>.
                </p>

                <p>
                    <h2>Theoretical Foundation — The Kerr Metric</h2>
                    A rotating (uncharged) black hole is described by the Kerr metric in Boyer–Lindquist coordinates:
                    <div className='formula'>
                        <BlockMath math={`ds^2 = -\\left(1 - \\\\
                        \\frac{2GM r}{\\Sigma c^2}\\right)c^2 dt^2 \\\\
                        - \\frac{4GMa r\\sin^2\\theta}{\\Sigma c^2} c dt d\\phi + \\\\
                        \\frac{\\Sigma}{\\Delta} dr^2 + \\Sigma d\\theta^2 + \\\\
                         \\left(r^2 + a^2 + \\frac{2GMa^2 r\\sin^2\\theta}{\\Sigma c^2}\\right)\sin^2\\theta \\, d\\phi^2`} />
                    </div>
                    where
                    <div className='formula'>
                        <BlockMath math="\\Sigma = r^2 + a^2 \cos^2\theta, \quad \Delta = r^2 - \frac{2GM}{c^2}r + a^2" />
                    </div>
                    and <InlineMath math="a = \frac{J}{M c}" /> is the black hole’s spin parameter.  
                    For <InlineMath math="a \to 0" />, the metric reduces to the Schwarzschild solution.
                </p>

                <p>
                    <h2>Frame Dragging and Ergosphere</h2>
                    In Kerr spacetime, rotation of the black hole causes spacetime itself to be dragged around — a phenomenon known as 
                    <b>frame dragging</b>.  
                    The region where no observer can remain stationary is called the <b>ergosphere</b>, bounded by:
                    <div className='formula'>
                        <BlockMath math="r_{\text{erg}}(\theta) = \frac{GM}{c^2} + \sqrt{\left(\frac{GM}{c^2}\right)^2 - a^2 \cos^2\theta}" />
                    </div>
                    Within the ergosphere, particles can have negative energy relative to infinity, enabling the <b>Penrose process</b> — extraction of rotational energy.
                </p>

                <p>
                    <h2>3. Ray Tracing and Visual Simulation</h2>
                    Gargantua’s iconic look was produced using full relativistic <b>ray tracing</b>.  
                    Light rays were integrated along null geodesics (<InlineMath math="ds^2 = 0" />) in the Kerr metric.
                    The geodesic equations are derived from the Hamilton–Jacobi formalism:
                    <div className='formula'>
                        <BlockMath math="g^{\mu\nu} p_\mu p_\nu = 0" />
                    </div>
                    Using conserved quantities (energy <InlineMath math="E"/>, angular momentum <InlineMath math="L_z"/>, and Carter constant <InlineMath math="Q"/>), the equations reduce to:
                    <div className='formula'>
                        <BlockMath math={String.raw`\Sigma^2 \left(\frac{dr}{d\lambda}\right)^2 = [E(r^2 + a^2) - a L_z]^2 -\\ \Delta \left[(L_z - aE)^2 + Q\right]`} />
                    </div>
                    <div className='formula'>
                        <BlockMath math={String.raw`
                        \Sigma^2 \left(\frac{d\theta}{d\lambda}\right)^2
                        = Q - \cos^2\theta\!\left[a^2(1 - E^2) + \frac{L_z^2}{\sin^2\theta}\right]
                        `} />

                    </div>
                    These equations govern the trajectories of light and determine how accretion disks and backgrounds are lensed.
                </p>

                <p>
                    <h2>4. Relativistic Accretion Disk Rendering</h2>
                    The bright disk around Gargantua appears distorted due to both gravitational bending and relativistic effects:
                    <ul style={{gap:'1rem',display:'flex',flexDirection:'column',textAlign:'left'}}>
                        <li><b>Gravitational lensing:</b> light paths are curved, allowing the far side of the disk to appear above and below the black hole.</li>
                        <li><b>Doppler beaming:</b> the part of the disk rotating toward the observer appears brighter due to relativistic boosting.</li>
                        <li><b>Gravitational redshift:</b> photons lose energy climbing out of the potential well, shifting light to redder wavelengths.</li>
                    </ul>
                    The rendered brightness is determined by integrating the redshift factor:
                    <div className='formula'>
                        <BlockMath math="g = \frac{\nu_{\text{obs}}}{\nu_{\text{em}}} = \frac{(p_\mu u^\mu)_{\text{obs}}}{(p_\mu u^\mu)_{\text{em}}}" />
                    </div>
                    The intensity observed follows <InlineMath math="I_{\nu,\text{obs}} = g^3 I_{\nu,\text{em}}" />, conserving phase-space density.
                </p>

                <p>
                    <h2>5. Parameters of Gargantua</h2>
                    Kip Thorne designed Gargantua to be <b>nearly extremal</b> — meaning it spins at almost the maximum allowed rate:
                    <div className='formula'>
                        <BlockMath math="a \approx 0.999 M" />
                    </div>
                    Such high spin stabilizes the disk and allows the innermost stable circular orbit (ISCO) to approach close to the horizon, producing higher luminosity and strong relativistic distortion.
                    Time dilation near the horizon for Miller’s planet scene is consistent with:
                    <div className='formula'>
                        <BlockMath math="\frac{t_{\text{far}}}{t_{\text{near}}} \approx \frac{1}{\sqrt{1 - \frac{3GM}{r c^2}}}" />
                    </div>
                    yielding an hour on the planet ≈ 7 years for far observers.
                </p>

                <p>
                    <h2>6. Numerical Simulation Framework</h2>
                    A numerical relativity renderer (as used by Double Negative and Thorne’s team) integrates null geodesics backwards from a virtual camera, 
                    solving the system:
                    <div className='formula'>
                        <BlockMath math="\\frac{d^2 x^\mu}{d\lambda^2} + \Gamma^\mu_{\nu\rho} \\frac{dx^\nu}{d\lambda}\\frac{dx^\rho}{d\lambda} = 0" />
                    </div>
                    using adaptive Runge–Kutta methods.  
                    The Kerr Christoffel symbols <InlineMath math="\Gamma^\mu_{\nu\rho}"/> are computed numerically for each pixel ray, producing the bending and multiple images seen in Gargantua.
                </p>

                <p>
                    <h2>7. Legacy and Realism</h2>
                    Gargantua’s depiction led to real scientific papers, including the 2015 <i>Classical and Quantum Gravity</i> paper by Thorne & James describing the visualization code <b>DNGR (Double Negative Gravitational Renderer)</b>.  
                    The simulation was so precise that it revealed new insights about caustic structures in accretion disks.
                    <br/><br/>
                    This connection between relativity, visualization, and cinema stands as an example of how accurate physics and art can merge to communicate the beauty of spacetime curvature.
                </p>

                <p>
                    <h2>Formulas Summary</h2>
                    <div className='formula'>
                        <BlockMath math="T_H = \frac{\hbar c^3}{8\pi G k_B M}" />
                    </div>
                    <div className='formula'>
                        <BlockMath math="r_{\text{erg}} = \frac{GM}{c^2} + \sqrt{(\frac{GM}{c^2})^2 - a^2 \cos^2\theta}" />
                    </div>
                    <div className='formula'>
                        <BlockMath math="\Sigma = r^2 + a^2 \cos^2\theta, \quad \Delta = r^2 - \frac{2GM}{c^2}r + a^2" />
                    </div>
                    <div className='formula'>
                        <BlockMath math="g = \frac{(p_\mu u^\mu)_{\text{obs}}}{(p_\mu u^\mu)_{\text{em}}}, \quad I_{\nu,\text{obs}} = g^3 I_{\nu,\text{em}}" />
                    </div>
                </p>
                <div className='next-prev-chapter-container'>
                    <button className='prev-button' onClick={()=>navigate('/learning/numerical-relativity',{replace:true})}><FaArrowLeft/></button>
                </div>
            </div>
        </div>
    )
}
