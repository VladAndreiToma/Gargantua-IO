import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import NavigationBar from '../../navigation/NavigationBar';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export default function BlackHolesMergers(){
    const navigate = useNavigate();
    return(
        <div className="page-container">
            <NavigationBar/>
            <div className="theory-scroller">
                <h1 className="chapter-title">Chapter 7 - Black Hole Mergers</h1>
                <p>
                    <h2>Introduction</h2>
                    Black hole mergers are among the most energetic events in the universe, where two black holes orbit each other, gradually spiral inward, and eventually coalesce into a single, more massive black hole.
                    These mergers emit gravitational waves — ripples in spacetime — predicted by Einstein’s General Relativity and first directly observed by LIGO in 2015.
                    <br/><br/>The study of such mergers provides insight into:
                    <ul>
                        <li>Stellar evolution and compact populations</li>
                        <li>The behavior of spacetime under extreme curvature</li>
                        <li>The nature of gravity itself</li>
                    </ul>
                </p>
                <p>
                    <h2>The Inspiral Phase</h2>
                    When two black holes are far apart, their motion can be described by post-Newtonian (PN) approximations — corrections to Newtonian gravity accounting for relativistic effects.
                    The loss of orbital energy via gravitational radiation causes the binary to inspiral gradually.
                    The rate of change of orbital separation <InlineMath math="a" /> is:
                    <div className='formula'>
                         <BlockMath math="\frac{da}{dt} = -\frac{64}{5} \frac{G^3 M_1 M_2 (M_1 + M_2)}{c^5 a^3}" />
                    </div>
                    where <InlineMath math="M_1" /> and <InlineMath math="M_2" /> are the component masses.
                    The corresponding gravitational wave frequency increases over time (“chirp”):
                    <div className='formula'>
                          <BlockMath math="f(t) = \frac{1}{\pi} \left( \frac{G M_c}{c^3} \right)^{-5/8} \left( \frac{5}{256} \frac{1}{t_c - t} \right)^{3/8}"/>
                    </div>
                    Here, <InlineMath math="M_c = \frac{(M_1 M_2)^{3/5}}{(M_1 + M_2)^{1/5}}" /> is the chirp mass, and <InlineMath math="t_c" /> is the coalescence time.
                </p>
                <p>
                    <h2>The Merger Phase</h2>
                    As the black holes approach each other, their separation becomes comparable to the gravitational radius:
                    <div className='formula'>
                        <BlockMath math="r_g = \frac{G M}{c^2}"/>
                    </div>
                    where <InlineMath math="M = M_1 + M_2" /> is the total mass.
                    At this stage:
                    The post-Newtonian approximation fails.
                    The dynamics must be computed using numerical relativity — full solutions of Einstein’s field equations.
                    The two horizons merge into a single, distorted event horizon.
                    A burst of gravitational waves is emitted, peaking in amplitude — the merger signal.
                </p>
                <p>
                    <h2>The Ringdown Phase</h2>
                    After coalescence, the resulting black hole is in an excited, non-stationary state.
                    It settles to a stable Kerr configuration by emitting quasi-normal modes (QNMs) — damped oscillations determined by its mass and spin.
                    The waveform in this phase can be approximated as:
                    <div className='formula'><BlockMath math="h(t) = A e^{-t / \tau} \cos(2 \pi f_{\text{ring}} t + \phi_0)"/></div>
                    where:
                    <InlineMath math="A" /> → amplitude<br/>
                    <InlineMath math="\tau" /> → damping time<br/>
                    <InlineMath math="f_{\text{ring}}" /> → ringdown frequency<br/>
                    <InlineMath math="\phi_0" /> → phase offset<br/>
                    Measuring <InlineMath math="f_{\text{ring}}" /> and <InlineMath math="\tau" /> allows one to test the no-hair theorem — the idea that a black hole is completely described by mass and spin.
                </p>
                <p>
                    <h2>Gravitational Wave Emission</h2>
                    <div className='formula'>
                        <BlockMath math="L_{\text{GW}} \sim 10^{49} \, \text{W}"/>
                    </div>
                    — briefly outshining all the stars in the observable universe combined.
                    The total energy radiated as gravitational waves is typically a few percent of the system’s rest mass:
                    <div className='formula'>
                        <BlockMath math="\Delta E \approx \epsilon M c^2, \quad \epsilon \sim 0.05"/>
                    </div>
                    This implies that for a binary of <InlineMath math="30 M_\odot" /> each, about <InlineMath math="3 M_\odot c^2" /> is emitted as gravitational radiation.
                </p>
                <p>
                    <h2>Recoil and Final Spin`</h2>
                    Due to asymmetries in mass or spin, the newly formed black hole can receive a recoil kick, ejecting it from its host galaxy if the velocity is high enough.
                    The final spin parameter <InlineMath math="a_f" /> depends on the mass ratio <InlineMath math="q = M_2 / M_1" /> and the initial spins:
                    <div className='formula'>
                        <BlockMath math="a_f \approx \frac{(M_1^2 a_1 + M_2^2 a_2 + l_{\text{orb}})}{(M_1 + M_2)^2}"/>
                    </div>
                    where <InlineMath math="l_{\text{orb}}" /> is the orbital angular momentum at merger.
                    Typical resulting spins are <InlineMath math="a_f \sim 0.6–0.9" />.
                </p>
                <p>
                    <h2>Numerical Realitivity and Waveform Modeling</h2>
                    Since analytic solutions are impossible for the full merger process, numerical relativity integrates Einstein’s equations on a supercomputer grid.
                    The generated waveforms are compared with LIGO/Virgo/KAGRA data to extract physical parameters like:<br/>
                    <InlineMath math="M_1, M_2" /> (component masses)<br/>
                    <InlineMath math="a_1, a_2" /> (spins)<br/>
                    Luminosity distance<br/>
                    Sky localization<br/>
                    Hybrid approaches like effective-one-body (EOB) and phenomenological waveform models combine analytic inspiral formulas with numerical merger data.
                </p>
                <p>
                    <h2>Astrophysical and Cosmological Implications</h2>
                    Black hole mergers reveal fundamental information about the cosmos:
                    <ul>
                        <li><b>Binary formation channels:</b> stellar binaries, dynamical capture, hierarchical mergers</li>
                        <li><b>Cosming Evolution:</b> tracking merger rates across redshift that helps constrain star formation and metallicity</li>
                        <li><b>Tests of general relativity:</b> deviations in waveforms could signal new physics</li>
                        <li><b>Standard sirens:</b> gravitational waves can independently measure the Hubble Constant</li>
                    </ul>
                </p>
                <p>
                    <h2>Observational Milestones</h2>
                    <br/>GW150914 (2015): first detected merger of two ~30 M<sub>⊙</sub> black holes
                    <br/>GW170817: binary neutron star merger (with electromagnetic counterpart)
                    <br/>Ongoing detections: by LIGO–Virgo–KAGRA and future missions like LISA, which will probe supermassive black hole mergers at cosmological distances.
                </p>
                <p>
                    <h2>Summary</h2>
                    Black hole mergers unite all aspects of relativistic astrophysics — from orbital dynamics and Kerr geometry to gravitational radiation and spacetime oscillations.
                    They are nature’s most spectacular laboratories for testing Einstein’s theory, offering a direct probe into the strong-field, dynamical regime of gravity.
                </p>
                <div className='next-prev-chapter-container'>
                    <button className='prev-button' onClick={()=>navigate('/learning/gravitational-lensing', {replace:true})}><FaArrowLeft/></button>
                    <button className='next-button' onClick={()=>navigate('/learning/time-dilation-and-relativistic-effects', {replace:true})}><FaArrowRight/></button>
                </div>
            </div>
        </div>
    )
}