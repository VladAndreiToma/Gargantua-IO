import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import NavigationBar from '../../navigation/NavigationBar';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export default function KerrBlackHoles(){
    const navigate = useNavigate();
    return(
        <div className='page-container'>
            <NavigationBar/>
            <div className='theory-scroller'>
                <h1 className='chapter-title'>Chapter 4 - Kerr Black Holes</h1>
                <p>
                    <h2>Overview</h2>
                    Kerr black holes describe the spacetime geometry around a rotating, uncharged mass.
                    Unlike the Schwarzschild case, which assumes spherical symmetry, the Kerr solution introduces axial symmetry and rotation, leading to effects such as frame dragging and the formation of an ergosphere.
                </p>
                <p>
                    <h2>The Kerr Metric</h2>
                    The line element of the Kerr spacetime in coordinates <InlineMath math="(t, r, \theta, \phi)" /> is:
                    <div className='formula'>
                        <BlockMath math={String.raw`
                            \begin{aligned}
                            ds^2 = 
                            & -\left(1 - \frac{2 G M r}{\Sigma c^2}\right)c^2 dt^2 
                            - \frac{4 G M a r \sin^2\theta}{\Sigma c} \, dt \, d\phi \\
                            & + \frac{\Sigma}{\Delta} \, dr^2 
                            + \Sigma \, d\theta^2 \\
                            & + \left(r^2 + a^2 + \frac{2 G M a^2 r \sin^2\theta}{\Sigma c^2}\right)
                            \sin^2\theta \, d\phi^2
                            \end{aligned}
                            `} />

                    </div>
                    The auxiliary quantities are:
                    <div className='formula'>
                        <BlockMath math="\Sigma = r^2 + a^2 \cos^2\theta, \quad \Delta = r^2 - \frac{2 G M r}{c^2} + a^2"/>
                    </div>
                    Here, <InlineMath math="a = \frac{J}{M c}" /> is the specific angular momentum of the black hole,
                    where <InlineMath math="J" /> is the total angular momentum and <InlineMath math="M" /> the mass.
                </p>
                <p>
                    <h2>Event Horizons</h2>
                    The horizons are determined by the condition <InlineMath math="\Delta = 0" />:
                    <div className='formula'>
                        <BlockMath math="r_{\pm} = \frac{G M}{c^2} \pm \sqrt{\left(\frac{G M}{c^2}\right)^2 - a^2}"/>
                    </div>
                    <InlineMath math="r_+"/> → outer event horizon<br/>
                    <InlineMath math="r_-"/> → inner (Cauchy) horizon<br/>
                    When <InlineMath math="a = 0"/>, the solution reduces to the Schwarzschild black hole.
                </p>
                <p>
                    <h2>The Ergosphere</h2>
                    Outside the outer horizon lies the ergosphere, a region where no observer can remain stationary due to spacetime being dragged by the black hole’s rotation.
                    The boundary of this region, called the static limit, satisfies:
                    <div className='formula'>
                        <BlockMath math="r_s(\theta) = \frac{G M}{c^2} + \sqrt{\left(\frac{G M}{c^2}\right)^2 - a^2 \cos^2\theta}"/>
                    </div>
                    Within the ergosphere, the time component of the metric changes sign, implying that all observers must co-rotate with the black hole.
                    This enables energy extraction mechanisms such as the Penrose process, in which a particle entering the ergosphere splits — one fragment falls into the hole, and the other escapes with increased energy.
                </p>
                <p>
                    <h2>Frame Dragging</h2>
                    Due to the black hole’s spin, spacetime itself is “dragged” in the direction of rotation — an effect known as frame dragging or the Lense–Thirring effect.
                    The angular velocity of a zero-angular-momentum observer (ZAMO) is:
                    <div className='formula'>
                        <BlockMath math="\omega = \frac{2 G M a r c}{(r^2 + a^2)^2 - a^2 \Delta \sin^2\theta}"/>
                    </div>
                    This causes nearby particles and photons to co-rotate with the black hole, leading to phenomena such as orbital precession and the alignment of accretion disks with the spin axis.
                </p>
                <p>
                    <h2>Limiting Cases</h2>
                    <InlineMath math="a = 0" /> → Schwarzschild black hole<br/>
                    <InlineMath math="a = \frac{G M}{c^2}" /> → extreme Kerr black hole<br/>
                    <InlineMath math="a > \frac{G M}{c^2}" /> → naked singularity (no event horizon)
                </p>
                <p>
                    <h2>Physical Significance</h2>
                    The Kerr solution generalizes General Relativity to include rotation — a key property of most astrophysical black holes.
                    It predicts rich physical structures such as ergospheres, frame dragging, and potential energy extraction processes.
                    These phenomena make Kerr black holes not only mathematically elegant but also crucial to modeling real black holes in the universe.
                </p>
                <div className="next-prev-chapter-container">
                    <button className='prev-button' onClick={()=>navigate('/learning/schwarzschild-geometry',{replace:true})}><FaArrowLeft/></button>
                    <button className='next-button' onClick={()=>navigate('/learning/accretion-disks-and-jets',{replace:true})}><FaArrowRight/></button>
                </div>
            </div>
        </div>
    )
}