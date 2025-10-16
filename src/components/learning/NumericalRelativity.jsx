import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import NavigationBar from '../../navigation/NavigationBar';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

export default function NumericalRelativity(){
    const navigate = useNavigate();
    return(
        <div className='page-container'>
            <NavigationBar/>
            <div className='theory-scroller'>
                <h1 className='chapter-title'>Chapter 10 - Numerical Relativity</h1>

                <p>
                    <h2>Introduction</h2>
                    Numerical relativity is the field that studies the dynamics of spacetime and gravity by directly solving Einstein’s field equations on a computer.  
                    It is essential for understanding complex phenomena such as black hole mergers, neutron star collisions, and gravitational wave emission.
                    Because Einstein’s equations are highly nonlinear partial differential equations, analytical solutions are rare; numerical techniques allow us to explore fully dynamical regimes of general relativity.
                </p>

                <p>
                    <h2>Einstein Field Equations in 3+1 Form</h2>
                    The Einstein field equations are:
                    <div className='formula'>
                        <BlockMath math="G_{\mu\nu} = \frac{8\pi G}{c^4} T_{\mu\nu}" />
                    </div>
                    where <InlineMath math="G_{\mu\nu}"/> is the Einstein tensor encoding spacetime curvature, and <InlineMath math="T_{\mu\nu}"/> is the stress-energy tensor.
                    To simulate evolution in time, spacetime is decomposed into space and time — a (3+1) decomposition known as the *Arnowitt–Deser–Misner (ADM)* formalism.
                </p>

                <p>
                    <h2>3+1 Decomposition (ADM Formalism)</h2>
                    The spacetime metric is written as:
                    <div className='formula'>
                        <BlockMath math="ds^2 = -(\alpha^2 - \beta_i \beta^i) c^2 dt^2 + 2 \beta_i \, dx^i dt + \gamma_{ij} dx^i dx^j" />
                    </div>
                    where:
                    <ul style={{gap:'0.5rem',display:'flex',flexDirection:'column',textAlign:'left'}}>
                        <li><b><u>α</u></b> is the lapse function (controls rate of advance of proper time).</li>
                        <li><b><u>βᵢ</u></b> is the shift vector (describes how spatial coordinates move between hypersurfaces).</li>
                        <li><b><u>γᵢⱼ</u></b> is the 3-metric on spatial hypersurfaces.</li>
                    </ul>
                    The extrinsic curvature <InlineMath math="K_{ij}"/> describes how each spatial slice bends in spacetime:
                    <div className='formula'>
                        <BlockMath math="K_{ij} = -\frac{1}{2\alpha}(\partial_t \gamma_{ij} - D_i \beta_j - D_j \beta_i)" />
                    </div>
                </p>

                <p>
                    <h2>ADM Evolution and Constraint Equations</h2>
                    Einstein’s equations split into evolution equations and constraints:
                    <div className='formula'>
                    <BlockMath math="\partial_t \gamma_{ij} = -2\alpha K_{ij} + \mathcal{L}_\beta \gamma_{ij}" />
                    </div>

                    <div className='formula'>
                    <BlockMath math="\partial_t K_{ij} = -D_i D_j \alpha + \alpha (R_{ij} - 2K_{ik}K^k{}_j + K K_{ij}) + \\ \mathcal{L}_\beta K_{ij} - 8\pi \alpha (S_{ij} - \tfrac{1}{2}\gamma_{ij}(S - \rho))" />
                    </div>

                    The Hamiltonian and momentum constraints must be satisfied on each hypersurface:
                    <div className='formula'>
                        <BlockMath math="\begin{aligned}
                        R + K^2 - K_{ij}K^{ij} &= 16\pi \rho,\\
                        D_j(K^{ij} - \gamma^{ij} K) &= 8\pi S^i.
                        \end{aligned}" />
                    </div>
                </p>

                <p>
                    <h2>Gauge Freedom and Coordinate Conditions</h2>
                    The lapse <InlineMath math="\alpha"/> and shift <InlineMath math="\beta^i"/> are not fixed by the equations — they represent gauge freedoms (choice of coordinates).
                    Common choices to maintain numerical stability include:
                    <ul style={{gap:'0.5rem',display:'flex',flexDirection:'column',textAlign:'left'}}>
                        <li><b><u>1+log slicing:</u></b> <InlineMath math="\partial_t \alpha = -2\alpha K"/> keeps slices from collapsing.</li>
                        <li><b><u>Gamma-driver shift condition:</u></b> drives the shift vector to damp coordinate distortions.</li>
                    </ul>
                    Proper gauge conditions are crucial to avoid coordinate singularities (e.g., at black hole centers).
                </p>

                <p>
                    <h2>BSSN Formalism</h2>
                    The *Baumgarte–Shapiro–Shibata–Nakamura (BSSN)* formulation rewrites the ADM equations in terms of conformally rescaled variables to improve numerical stability.
                    The spatial metric is decomposed as:
                    <div className='formula'>
                        <BlockMath math="\gamma_{ij} = e^{4\phi} \tilde{\gamma}_{ij}, \quad \text{with } \det(\tilde{\gamma}_{ij}) = 1" />
                    </div>
                    and the extrinsic curvature as:
                    <div className='formula'>
                        <BlockMath math="K_{ij} = e^{4\phi}(\tilde{A}_{ij} + \frac{1}{3}\tilde{\gamma}_{ij} K)" />
                    </div>
                    The evolution equations then propagate <InlineMath math="\phi, \tilde{\gamma}_{ij}, K, \tilde{A}_{ij}"/> and auxiliary variables <InlineMath math="\tilde{\Gamma}^i"/> representing contracted Christoffel symbols.
                    The BSSN formulation is the standard for black hole merger simulations.
                </p>

                <p>
                    <h2>Black Hole Evolution Techniques</h2>
                    To evolve black holes numerically, special techniques are needed to handle the singularity:
                    <ul style={{gap:'0.5rem',display:'flex',flexDirection:'column',textAlign:'left'}}>
                        <li><b><u>Puncture Method:</u></b> Represent each black hole as a “puncture” in the grid where the singular part of the metric is factored out analytically. The remaining regular fields are evolved numerically.</li>
                        <li><b><u>Excision Method:</u></b> The region inside the event horizon (causally disconnected) is removed from the grid; boundary conditions are applied just inside the horizon surface.</li>
                    </ul>
                </p>

                <p>
                    <h2>Gravitational Wave Extraction</h2>
                    Numerical relativity allows us to compute the outgoing gravitational radiation using the Newman–Penrose scalar <InlineMath math="\Psi_4"/>:
                    <div className='formula'>
                        <BlockMath math="\Psi_4 = -C_{\alpha\beta\gamma\delta} n^\alpha \bar{m}^\beta n^\gamma \bar{m}^\delta" />
                    </div>
                    where <InlineMath math="C_{\alpha\beta\gamma\delta}"/> is the Weyl tensor.  
                    The two polarizations of the gravitational wave are related to <InlineMath math="\Psi_4"/> by:
                    <div className='formula'>
                        <BlockMath math="\Psi_4 = \ddot{h}_+ - i \ddot{h}_\times" />
                    </div>
                    Integrating twice in time gives the observable strain <InlineMath math="h(t)"/> measured by detectors like LIGO and Virgo.
                </p>

                <p>
                    <h2>Numerical Techniques</h2>
                    Numerical relativity simulations rely on:
                    <ul style={{gap:'0.5rem',display:'flex',flexDirection:'column',textAlign:'left'}}>
                        <li>Finite difference or spectral methods for spatial derivatives.</li>
                        <li>Method of lines for time integration (Runge–Kutta schemes).</li>
                        <li>Adaptive mesh refinement (AMR) to capture strong curvature near horizons while maintaining efficiency far away.</li>
                        <li>Constraint damping techniques to ensure constraint equations remain satisfied during evolution.</li>
                    </ul>
                    Stability and convergence tests are critical: small numerical errors can amplify due to the nonlinear nature of Einstein’s equations.
                </p>

                <p>
                    <h2>Applications</h2>
                    Numerical relativity underlies many modern discoveries:
                    <ul style={{gap:'0.5rem',display:'flex',flexDirection:'column',textAlign:'left'}}>
                        <li><b><u>Gravitational Wave Modeling:</u></b> Simulations of black hole mergers provide waveform templates for detectors (e.g. GW150914).</li>
                        <li><b><u>Accretion and Jet Dynamics:</u></b> Coupling with magnetohydrodynamics (GRMHD) reveals jet launching mechanisms around Kerr black holes.</li>
                        <li><b><u>Testing General Relativity:</u></b> Comparing numerical waveforms with observed signals constrains deviations from GR.</li>
                    </ul>
                </p>

                <p>
                    <h2>Key Quantities</h2>
                    <ul style={{gap:'1rem',display:'flex',flexDirection:'column',textAlign:'left'}}>
                        <li>ADM mass:
                            <div className='formula'>
                                <InlineMath math="M_{\text{ADM}} = \frac{1}{16\pi G}\int_\infty (\partial_j \gamma_{ij} - \partial_i \gamma_{jj})\,dS^i"/>
                            </div>
                        </li>
                        <li>Angular momentum: 
                            <div className='formula'>
                                <InlineMath math="J_i = \frac{1}{8\pi G}\epsilon_{ijk}\int_\infty (x^j K^k{}_l - x^k K^j{}_l) dS^l"/>
                            </div>
                        </li>
                        <li>Gravitational wave luminosity: 
                            <div className='formula'>
                                <InlineMath math="\frac{dE}{dt} = \frac{r^2}{16\pi G} \int (\dot{h}_+^2 + \dot{h}_\times^2) d\Omega"/>
                            </div>
                        </li>
                    </ul>
                </p>

                <p>
                    <h2>Conclusion</h2>
                    Numerical relativity transforms Einstein’s equations into a computational laboratory.  
                    From black hole mergers to gravitational waves, it connects abstract geometry to observable astrophysics.  
                    In your simulation, you can visualize how spacetime curvature evolves, how horizons move, and how gravitational waves propagate through the computational grid — the digital echo of relativity itself.
                </p>
                <div className='next-prev-chapter-container'>
                    <button className='prev-button' onClick={()=>navigate('/learning/information-paradox-and-hawking-radiation',{replace:true})}><FaArrowLeft/></button>
                    <button className='next-button' onClick={()=>navigate('/learning/interstellar-and-gargantua-model',{replace:true})}><FaArrowRight/></button>
                </div>
            </div>
        </div>
    )
}
