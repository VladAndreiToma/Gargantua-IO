import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import NavigationBar from '../../navigation/NavigationBar';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6';
import { replace, useNavigate } from 'react-router-dom';
import { useAnimations } from '@react-three/drei';

export default function TimeDilationAndRelativisticEffects(){
    const navigate = useNavigate();
    return(
        <div className="page-container">
            <NavigationBar/>
            <div className='theory-scroller'>
                <h1 className='chapter-title'> Chapter 8 - Time Dilation and Relativistic Effects</h1>
                <p>
                    <h2>Introduction</h2>
                    Time dilation is one of the most profound predictions of Einstein’s relativity.
                    It describes how time passes at different rates depending on relative motion or gravitational potential.
                    <br/><br/>
                    There are two main types:<br/>
                    <br/><b>Special relativistic time dilation</b> — due to motion at relativistic speeds.<br/>
                    <br/><b>Gravitational time dilation</b> — due to differences in gravitational potential.<br/>
                    <br/>These effects are experimentally verified and essential for modern technology (e.g., GPS, particle accelerators, astronomical clocks).
                </p>
                <p>
                    <h2>Special Relativistic Time Dilation</h2>
                    In Special Relativity, time depends on the observer’s reference frame.
                    Consider two observers:
                    One at rest (frame <InlineMath math="S" />),
                    One moving at velocity <InlineMath math="v" /> (frame <InlineMath math="S'" />).
                    The relationship between proper time <InlineMath math="\tau" /> (time measured in the moving frame) and coordinate time <InlineMath math="t" /> (measured in the rest frame) is:
                    <div className='formula'><BlockMath math="\Delta t = \gamma \, \Delta \tau"/></div>
                    where:
                    <div className='formula'> <BlockMath math="\gamma = \frac{1}{\sqrt{1 - \frac{v^2}{c^2}}}"/></div>
                    is the Lorentz factor.
                    As <InlineMath math="v \to c" />, <InlineMath math="\gamma \to \infty" />, meaning time nearly stops for the moving observer relative to the stationary one.
                </p>
                <p>
                    <h2>The Twin Paradox</h2>
                    A classic illustration:
                    One twin stays on Earth, while the other travels at relativistic speed to a distant star and returns.
                    The traveling twin experiences less proper time <InlineMath math="\tau" /> than the one who stayed.
                    Upon reunion, the traveler is younger:
                    <div className='formula'>
                        <BlockMath math="\Delta \tau = \int \sqrt{1 - \frac{v(t)^2}{c^2}} \, dt"/>
                    </div>
                    This asymmetry arises because the traveling twin undergoes acceleration (changing frames), breaking the symmetry.
                </p>
                <p>
                    <h2>Gravitational Time Dilation(GR)</h2>
                    In curved spacetime, clocks tick differently depending on the gravitational potential.
                    From the Schwarzschild metric:
                    <div className='formula'>
                        <BlockMath math="ds^2 = -\left(1 - \frac{2GM}{r c^2}\right)c^2 dt^2 + \\\\ \left(1 - \frac{2GM}{r c^2}\right)^{-1} dr^2 + r^2 d\Omega^2"/>
                    </div>
                    For a stationary observer (<InlineMath math="dr = d\Omega = 0" />), the proper time is:
                    <div className='formula'>
                        <BlockMath math="d\tau = \sqrt{1 - \frac{2GM}{r c^2}} \, dt" />
                    </div>     
                    Thus, clocks run slower deeper in a gravitational well.
                    Example — comparing a clock near a planet’s surface and one far away:
                    <div className='formula'>
                        <BlockMath math="\frac{d\tau_r}{dt_\infty} = \sqrt{1 - \frac{2GM}{r c^2}}" />
                    </div>
                    At <InlineMath math="r = R_\oplus" /> (Earth’s radius), the difference is tiny but measurable — critical for GPS satellite synchronization.
                </p>
                <p>
                    <h2>Combined Effect Motion + Gravity</h2>
                    In realistic astrophysical settings (e.g., near neutron stars or black holes), both velocity and gravity contribute:
                    <div className='formula'>
                        <BlockMath math="d\tau = \sqrt{\left(1 - \frac{2GM}{r c^2}\right) - \frac{v^2}{c^2}} \, dt" />
                    </div>
                    This expression shows how extreme gravity and high speed amplify time dilation.
                </p>
                <p>
                    <h2>Redshift and Blueshift</h2>
                    Time dilation directly leads to frequency shifts in emitted light:
                    Gravitational redshift: light escaping a gravitational well loses energy.
                    Transverse Doppler effect: due to time dilation in motion.
                    Gravitational redshift:
                    <div className='formula'>
                        <BlockMath math="\frac{f_{\text{observed}}}{f_{\text{emitted}}} = \sqrt{1 - \frac{2GM}{r c^2}}" />
                    </div>
                    If <InlineMath math="r \to r_s = \frac{2GM}{c^2}" />, the observed frequency approaches zero — photons are infinitely redshifted near the event horizon. 
                </p>
                <p>
                    <h2>Time Dilation Near Black Holes</h2>
                    For an observer hovering near the Schwarzschild radius:
                    <div className='formula'>
                        <BlockMath math="\frac{d\tau}{dt} = \sqrt{1 - \frac{r_s}{r}}" />
                    </div>
                    As <InlineMath math="r \to r_s" />, <InlineMath math="d\tau/dt \to 0" /> —
                    time freezes from the perspective of a distant observer.
                    However, for the infalling observer, proper time remains finite — they cross the horizon without noticing any “freezing” of time.
                    This leads to one of the most fascinating paradoxes in relativity — time appearing infinitely stretched to outsiders but normal to the falling traveler.
                </p>
                <p>
                    <h2>Experimental Verification</h2>
                    Hafele–Keating experiment (1971):
                    Atomic clocks flown on aircraft ran slower, matching predictions of special and gravitational time dilation.
                    GPS satellites:
                    On orbit, clocks run faster due to weaker gravity but slower due to motion — net correction ~38 μs/day is applied.
                    Pound–Rebka experiment (1959):
                    Measured gravitational redshift of gamma rays in Earth’s gravity.
                    Muon decay:
                    Cosmic-ray muons live longer when moving near light speed — a direct proof of special-relativistic time dilation.
                </p>
                <p>
                    <h2>Visualizing Time Dilation</h2>
                    Spacetime diagrams show worldlines tilting under Lorentz transformations.
                    Proper time is the invariant length of a worldline segment:
                    <div className='formula'>
                         <BlockMath math="d\tau^2 = dt^2 - \frac{1}{c^2}(dx^2 + dy^2 + dz^2)"/>
                    </div>
                    The more an object moves through space, the less it moves through time — a deep geometric interpretation of relativity.
                </p>
                <p>
                    <h2>Summary</h2>
                    Time dilation reveals that space and time are not absolute, but part of a unified spacetime fabric.
                    Both motion and gravity distort how clocks tick and how observers perceive reality.
                    From orbiting satellites to falling into a black hole, time itself becomes relative — a dynamic entity shaped by energy, motion, and curvature.
                </p>
                <div className='next-prev-chapter-container'>
                    <button className='prev-button' onClick={()=>navigate('/learning/black-hole-mergers',{replace:true})}><FaArrowLeft/></button>
                    <button className='next-button' onClick={()=>navigate('/learning/information-paradox-and-hawking-radiation', {replace:true})}><FaArrowRight/></button>
                </div>
            </div>
        </div>
    )
}