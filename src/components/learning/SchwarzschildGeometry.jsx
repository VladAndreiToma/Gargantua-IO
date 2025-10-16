import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import NavigationBar from '../../navigation/NavigationBar';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { useAnimations } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

export default function SchwarzshildGeometry(){
    const navigate = useNavigate();

    return(
        <div className='page-container'>
            <NavigationBar/>
            <div className='theory-scroller'>
                <h1 className='chapter-title'>Chapter 3 - Schwarzschild Geometry</h1>
                <p>
                    <h2>The Schwarzschild Solution</h2>
                    The Schwarzschild metric is the simplest exact solution to Einstein’s field equations in vacuum
                    (<InlineMath math="T_{\mu\nu} = 0" />),
                    representing the spacetime around a static, spherically symmetric mass.
                    The line element is given by:
                    <div className='formula'>
                        <BlockMath math={`ds^2 = -\\left(1 - \\frac{2GM}{r c^2}\\right)c^2 dt^2 + \\\\
                        \\left(1 - \\frac{2GM}{r c^2}\\right)^{-1} dr^2 + r^2 (d\\theta^2 + \\sin^2 \\theta \\, d\\phi^2)`}/>
                    </div>
                    where <InlineMath math="M" /> = mass of the central object
                    <br/><InlineMath math="G" /> = gravitational constant
                    <br/><InlineMath math="c" /> = speed of light
                    <br/><InlineMath math="(t, r, \theta, \phi)" /> = Schwarzschild coordinates
                    <br/>This describes the curved geometry of spacetime caused by a spherical mass such as a planet, star, or black hole.
                </p>
                <p>
                    <h2>Radius and Event Horizon</h2>
                    The quantity
                    <div className='formula'><BlockMath math="r_s = \frac{2GM}{c^2}"/></div>
                    is called the Schwarzschild radius.
                    At <InlineMath math="r = r_s" />, the metric coefficient <InlineMath math="g_{tt}" /> becomes zero and <InlineMath math="g_{rr}" /> diverges — indicating the event horizon.
                    However, this is not a physical singularity but a coordinate one, which can be removed by a better choice of coordinates.
                    The true singularity occurs at <InlineMath math="r = 0" />,
                    where curvature becomes infinite.
                </p>
                <p>
                    <h2>Proper Time and Gravitational Time Dilation</h2>
                    For a stationary observer at fixed <InlineMath math="r, \theta, \phi" />,
                    the proper time <InlineMath math="d\tau" /> is related to coordinate time <InlineMath math="dt" /> by:
                    <div className='formula'>
                        <BlockMath math="d\tau = \sqrt{1 - \frac{2GM}{r c^2}} \, dt"/>
                    </div>
                    Thus, clocks deeper in a gravitational field tick slower relative to those far away.
                    This is the phenomenon of gravitational time dilation.
                    Example:
                    For the Earth, <InlineMath math="r_s \approx 9 \text{ mm}" />,
                    so time dilation near the surface is minuscule,
                    but near a black hole it becomes extreme.
                </p>
                <p>
                    <h2>Gravitational Redshift</h2>
                    Light climbing out of a gravitational potential well loses energy and appears redshifted to a distant observer.
                    <div className='formula'>
                        <BlockMath math="\frac{\nu_{\text{observed}}}{\nu_{\text{emitted}}} = \sqrt{1 - \frac{2GM}{r c^2}}"/>
                    </div>
                    As <InlineMath math="r \to r_s" />, <InlineMath math="\nu_{\text{observed}} \to 0" />,
                    meaning light cannot escape the event horizon.
                </p>
                <p>
                    <h2>Radial Motion of Particles and Light</h2>
                    For purely radial motion (<InlineMath math="d\theta = d\phi = 0" />),
                    the metric simplifies to:
                    <div className='formula'>
                        <BlockMath math="ds^2 = -\left(1 - \frac{2GM}{r c^2}\right)c^2 dt^2 + \left(1 - \frac{2GM}{r c^2}\right)^{-1} dr^2"/>
                    </div>
                    For light, <InlineMath math="ds^2 = 0"/>,
                    so the trajectory satisfies:
                    <div className='formula'>
                        <BlockMath math="\frac{dr}{dt} = \pm c \left(1 - \frac{2GM}{r c^2}\right)"/>
                    </div>
                    This shows that even light slows down (in coordinate time) as it approaches the horizon.
                </p>
                <p>
                    <h2>Effective Potential for Orbits</h2>
                    Test particles moving in Schwarzschild spacetime experience an effective potential:
                    <div className='formula'>
                        <BlockMath math="V_{\text{eff}}(r) = -\frac{GM}{r} + \frac{L^2}{2r^2} - \frac{G M L^2}{c^2 r^3}"/>
                    </div>
                    where <InlineMath math="L" /> is the angular momentum per unit mass.
                    The first term is Newtonian gravity.
                    The second is the centrifugal barrier.
                    The third is a relativistic correction, responsible for phenomena like the precession of Mercury’s orbit.
                </p>
                <p>
                    <h2>The Photon Sphere and Stable Orbits</h2>
                    The photon sphere (unstable circular light orbit) occurs at
                    <div className='formula'>
                        <BlockMath math="r = \frac{3GM}{c^2}"/>
                    </div>
                    The innermost stable circular orbit (ISCO) for matter is at
                    <div className='formula'>
                        <BlockMath math="r = \frac{6GM}{c^2}"/>
                    </div>
                    Inside this, no stable orbits exist — matter spirals into the black hole.
                </p>
                <p>
                    <h2>The Kruskal Coordinates</h2>
                    To remove the coordinate singularity at the event horizon,
                    we define new coordinates (<InlineMath math="U, V" />) such that the metric becomes regular at <InlineMath math="r = r_s" />.
                    The transformation involves the tortoise coordinate <InlineMath math="r_*" />:
                    <div className='formula'>
                        <BlockMath math="r_* = r + \frac{2GM}{c^2} \ln\left|\frac{r}{r_s} - 1\right|"/>
                    </div>
                    Then
                    <div className='formula'>
                        <BlockMath math="U = -e^{-\frac{c t - r_*}{4GM / c^2}}, \quad V = e^{\frac{c t + r_*}{4GM / c^2}}"/>
                    </div>
                    In these coordinates, the Schwarzschild metric extends smoothly across the horizon — revealing two exterior regions and a black hole + white hole structure.
                </p>
                <p>
                    <h2>Summary</h2>
                    The Schwarzschild geometry captures the essence of spacetime curvature around a static spherical mass:
                    time slows down near massive bodies,
                    light bends and redshifts,
                    and a horizon forms beyond which escape is impossible.
                    It forms the foundation for understanding more complex black holes such as the Kerr (rotating) and Reissner–Nordström (charged) solutions.
                </p>
                <div className="next-prev-chapter-container">
                    <button className='prev-button' onClick={()=>navigate('/learning/spacetime-and-general-relativity',{replace:true})}><FaArrowLeft/></button>
                    <button className='next-button' onClick={()=>navigate('/learning/kerr-black-holes', {replace:true})}><FaArrowRight/></button>
                </div>
            </div>
        </div>
    )
}