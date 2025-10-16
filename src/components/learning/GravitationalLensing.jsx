import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import NavigationBar from '../../navigation/NavigationBar';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
export default function GravitationalLensing(){
    const navigate = useNavigate();
    return(
        <div className="page-container">
            <NavigationBar/>
            <div className="theory-scroller">
                <h1 className="chapter-title">Chapter 6 - Graviational Lensing</h1>
                <p>
                    <h2>Introduction</h2>
                    Gravitational lensing is a direct consequence of Einstein’s General Theory of Relativity.
                    Massive bodies such as stars, galaxies, or clusters of galaxies curve spacetime, and this curvature deflects the path of light passing nearby.
                    Thus, mass acts as a gravitational lens, bending light from distant sources and producing magnification, distortion, or multiple images of background objects.
                    In the weak-field limit, light follows a curved trajectory described by the deflection angle.
                </p>
                <p>
                    <h2>Deflection of Light by a Point Mass</h2>
                    For a light ray passing at an impact parameter <InlineMath math="b" /> from a mass <InlineMath math="M" />, the deflection angle is:
                    <div className="formula">
                        <BlockMath math="\hat{\alpha} = \frac{4 G M}{c^2 b}"/>
                    </div>
                    This is twice the deflection predicted by Newtonian gravity and was first confirmed by the 1919 Eddington expedition, which observed the bending of starlight by the Sun during a solar eclipse.
                </p>
                <p>
                    <h2>Lens Equation</h2>
                    Let: <InlineMath math="D_S" /> → distance to the source<br/>
                    <InlineMath math="D_L" /> → distance to the lens<br/>
                    <InlineMath math="D_{LS}" /> → distance from the lens to the source<br/>
                    <InlineMath math="\beta" /> → true angular position of the source<br/>
                    <InlineMath math="\theta" /> → observed angular position of the image<br/>
                    <br/>
                    Then the lens equation is given by:
                    <div className='formula'>
                        <BlockMath math="\beta = \theta - \frac{D_{LS}}{D_S} \, \hat{\alpha}(\theta)" />
                    </div>
                    This equation relates the true and apparent positions of the source through the deflection angle.
                </p>
                <p>
                    <h2>Einstein Radius</h2>
                    For perfect alignment between observer, lens, and source (<InlineMath math="\beta = 0" />), the image forms a ring (the Einstein ring).
                    The Einstein radius is defined by:
                    <div className='formula'><BlockMath math="\theta_E = \sqrt{\frac{4 G M}{c^2} \, \frac{D_{LS}}{D_L D_S}}"/></div>
                    Typical Einstein radii are microarcseconds for stellar lenses and arcseconds for galaxy-scale lenses.
                </p>

                <p>
                    <h2>Magnification</h2>
                    Gravitational lensing conserves surface brightness but increases the apparent solid angle, leading to magnification.
                    For an axisymmetric lens:
                    <div className='formula'>
                        <BlockMath math="\mu = \left| \frac{\theta}{\beta} \frac{d\theta}{d\beta} \right|" />
                    </div>
                    Multiple images occur when <InlineMath math="|\beta| < \theta_E" /> — a hallmark of strong lensing.
                </p>
                <p>
                    <h2>Types of Gravitational Lensing</h2>
                    <b>a. Strong Lensing:</b><br/>
                    Occurs when light passes close to a massive object, producing:
                    <br/>Multiple images, Einstein rings, Arcs
                    <br/>Examples: galaxy–galaxy lensing or cluster–quasar systems.
                    <br/><br/>
                    <b>b. Weak Lensing:</b><br/>
                    A subtle distortion in the shapes of background galaxies.
                    Statistical analysis of weak lensing helps map dark matter distributions in the Universe.
                    The distortion (shear) is characterized by:
                    <div className='formula'>
                        <BlockMath math="\gamma = \frac{1}{2} \left( \frac{\partial^2 \psi}{\partial x^2} - \frac{\partial^2 \psi}{\partial y^2} \right) + i \frac{\partial^2 \psi}{\partial x \partial y}"/>
                    </div>
                    where <InlineMath math="\psi" /> is the lensing potential.
                    <br/><br/>
                    <b>c. Microlensing</b><br/>
                    Occurs when the lensing object is of stellar mass or smaller.
                    No image separation is resolved, but total brightness changes over time as the source, lens, and observer move relative to each other.
                </p>
                <p>
                    <h2>Time Delays and Relativistic Effects</h2>
                    Each light path has a different travel time due to:
                    Geometrical delay (path length difference)
                    Shapiro delay (time dilation in curved spacetime)
                    The total time delay between two images is:
                    <div className='formula'>
                        <BlockMath math="\Delta t = \frac{(1 + z_L)}{c} \frac{D_L D_S}{D_{LS}} \left[ \frac{1}{2} (\boldsymbol{\theta} - \boldsymbol{\beta})^2 - \psi(\boldsymbol{\theta}) \right]"/>
                    </div>
                    where <InlineMath math="z_L" /> is the redshift of the lens.
                    Measuring <InlineMath math="\Delta t" /> allows estimation of the Hubble constant.
                </p>
                <p>
                    <h2>Cosmological Applications</h2>
                    Gravitational lensing has become a cornerstone in observational cosmology:
                    Mapping dark matter through weak lensing surveys
                    Detecting exoplanets via microlensing
                    Measuring cosmological parameters (e.g., <InlineMath math="H_0" /> from time-delay lenses)
                    Testing General Relativity on cosmic scales
                </p>
                <p>
                    <h2>Summary</h2>
                    Gravitational lensing elegantly demonstrates the curvature of spacetime.
                    It links relativity, optics, and cosmology, and remains one of the most powerful tools in astrophysics for probing invisible mass and the structure of the Universe.
                </p>
                <div className='next-prev-chapter-container'>
                    <button className='prev-button' onClick={()=>navigate('/learning/accretion-disks-and-jets', {replace:true})}><FaArrowLeft/></button>
                    <button className='next-button' onClick={()=>navigate('/learning/black-hole-mergers',{replace:true})}><FaArrowRight/></button>
                </div>
            </div>
        </div>
    )
}