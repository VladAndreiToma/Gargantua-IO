import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import NavigationBar from '../../navigation/NavigationBar';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export default function InformationParadoxAndHawkingRadiation(){
    const navigate = useNavigate();

    return(
        <div className='page-container'>
            <NavigationBar/>
            <div className='theory-scroller'>
                <h1 className='chapter-title'>Chapter 9 - Information Paradox And Hawking Radiation</h1>
                <p>
                    <h2>Introduction</h2>
                    Hawking showed that black holes are not perfectly black: quantum effects make them emit a thermal spectrum with a temperature inversely proportional to their mass. That thermal emission implies loss of information (pure → mixed state) if the black hole evaporates completely — this is the black hole information paradox. Resolving the paradox requires reconciling quantum unitarity with semiclassical gravity.
                </p>
                <p>
                    <h2>Essentials</h2>
                    Quantum field theory on a black-hole background produces particle creation near the horizon: virtual particle pairs are separated, one falls in, the other escapes to infinity as real radiation.
                    The emission spectrum for each mode is thermal. The mean occupation number for a mode of frequency <InlineMath math="\omega" /> is
                    <div className='formula'>
                        <BlockMath math="\langle N_\omega\rangle = \frac{1}{e^{\hbar \omega/(k_B T_H)} - 1}"/>
                    </div>
                    (i.e. a Bose–Einstein thermal spectrum for bosonic fields; fermions get the Fermi factor).
                    The Hawking temperature for a Schwarzschild black hole of mass <InlineMath math="M" /> is
                    <div className='formula'>
                        <BlockMath math="T_H = \frac{\hbar c^3}{8 \pi G k_B M}" />
                    </div>
                    or equivalently using the surface gravity <InlineMath math="\kappa"/>
                    <div className='formula'><BlockMath math="T_H = \frac{\hbar \, \kappa}{2\pi k_B c}"/></div>
                    where for Schwarzschild <InlineMath math="\kappa = \frac{c^4}{4 G M}"/>.
                </p>
                <p>
                    <h2>Thermodynamics: Entropy & Area</h2>
                    The Bekenstein–Hawking entropy is proportional to the horizon area <InlineMath math="A"/>:
                    <div className='formula'>
                        <BlockMath math="S_{BH} = \frac{k_B c^3 A}{4 G \hbar} = \frac{k_B A}{4 \, l_P^2}" />
                    </div>
                    with Planck length squared <InlineMath math="l_P^2 = \frac{\hbar G}{c^3}"/>. For a Schwarzschild hole (<InlineMath math="r_s = 2GM/c^2" />, <InlineMath math="A = 4\pi r_s^2" />) one finds
                    <div className='formula'>
                        <BlockMath math="S_{BH} = \frac{4\pi k_B G M^2}{\hbar c}"/>
                    </div>
                    Hawking temperature and Bekenstein entropy make black holes thermodynamic objects: they radiate (like a blackbody modified by greybody factors) and obey laws analogous to thermodynamics.
                </p>
                <p>
                    <h2>Evaporation: Power & Lifetime (order of magnitude)</h2>
                    Stefan-Boltzmann style power (including greybody factors yields constants; here is the standard semiclassical estimate for a nonrotating hole):
                    <div className='formula'>
                        <BlockMath math="P_{\rm Hawking} \sim \frac{\hbar c^6}{15360 \pi G^2 M^2}"/>
                    </div>
                    Integrating that loss gives the evaporation timescale (Schwarzschild):
                    <div className='formula'>
                        <BlockMath math="\tau_{\rm evap} \sim \frac{5120\pi G^2 M^3}{\hbar c^4}"/>
                    </div>
                    So small black holes evaporate fast; astrophysical (stellar-mass) black holes evaporate far longer than the age of the Universe.
                </p>
                <p>
                    <h2>Where the paradox appears?(purity vs. thermality)</h2>
                    Hawking’s calculation (semiclassical QFT on a fixed background) shows outgoing radiation is essentially thermal (mixed), with mode pairs entangled across the horizon: exterior mode <InlineMath math="b" /> entangled with interior mode <InlineMath math="a" />.
                    If the black hole evaporates completely and the interior degrees of freedom are lost, the final state of radiation is mixed — evolution from an initial pure state to a mixed one — violating unitarity of quantum mechanics.
                    More formally: starting from an initial pure state, tracing over interior modes yields a reduced density matrix for radiation that is thermal:
                    <div className='formula'>
                        <BlockMath math="\rho_{\rm rad} \approx \prod_\omega \left(1 - e^{-\hbar\omega/(k_B T_H)}\right)\sum_{n} e^{-n\hbar\omega/(k_B T_H)} |n\rangle\langle n|"/>
                    </div>
                    which has von Neumann entropy <InlineMath math="S(\rho_{\rm rad}) > 0"/> and grows as radiation is emitted.
                </p>
                <p>
                    <h2>The Page curve and constraints from unitarity</h2>
                    If evaporation is unitary, the von Neumann entropy of the radiation should follow the Page curve: it rises initially (radiation entangled with residual black hole) but after the Page time it must decrease back to zero when evaporation completes, since final state is pure.
                    Semiclassical Hawking result gives a monotonically increasing radiation entropy (no decrease) — this is the paradox.
                    Page time roughly when roughly half the initial black hole entropy has been radiated:
                    <div className='formula'>
                        <BlockMath math="t_{\rm Page} \sim \mathcal{O}(\tau_{\rm evap})\times (\text{constant of order }1)" />
                    </div>
                    (precise factor depends on greybody factors and species.)
                </p>
                <p>
                    <h2>Quantum Fields in Curved Spacetime: Bogoliubov Transformations</h2>
                    Quantum fields in a curved background are expanded in mode functions. Each observer defines positive frequency differently; this leads to particle creation when comparing “in” and “out” vacua.
                    Let the field have mode expansions:
                    <div className='formula'>
                        <BlockMath math="\phi = \sum_k (a_k u_k + a_k^\dagger u_k^*) = \sum_{k'} (b_{k'} v_{k'} + b_{k'}^\dagger v_{k'}^*)" />
                    </div>
                    The two mode bases <InlineMath math="u_k"/> and <InlineMath math="v_{k'}"/> are related by the Bogoliubov transformation:
                    <div className='formula'>
                        <BlockMath math="v_{k'} = \sum_k (\alpha_{k'k} u_k + \beta_{k'k} u_k^*)" />
                    </div>
                    which implies the annihilation operators are mixed:
                    <div className='formula'>
                        <BlockMath math="b_{k'} = \sum_k (\alpha_{k'k}^* a_k - \beta_{k'k}^* a_k^\dagger)" />
                    </div>
                    The nonzero coefficients <InlineMath math="\beta_{k'k}"/> mean that the vacuum defined by one observer contains particles for another — the essence of Hawking and Unruh effects.
                    The expected number of particles in the “out” vacuum is:
                    <div className='formula'>
                        <BlockMath math="\langle 0_{\text{in}} | b_{k'}^\dagger b_{k'} | 0_{\text{in}} \rangle = \sum_k |\beta_{k'k}|^2" />
                    </div>
                    For a collapsing geometry, the near-horizon redshift produces an exponential relation between coordinates, yielding a Planckian spectrum with temperature <InlineMath math="T_H = \frac{\hbar \kappa}{2\pi k_B c}"/>.
                    </p>

                    <p>
                    <h2>Near-Horizon Peeling and Mode Mixing</h2>
                    Modes that escape to infinity originate near the horizon, where outgoing null coordinates behave exponentially with respect to Kruskal time:
                    <div className='formula'>
                        <BlockMath math="u = -\frac{1}{\kappa}\ln(-U)" />
                    </div>
                    (where <InlineMath math="U"/> is Kruskal coordinate and <InlineMath math="\kappa"/> is surface gravity).
                    This exponential relation leads directly to thermal mixing of positive and negative frequencies and hence particle creation.
                    Physically, near-horizon modes are highly redshifted, giving rise to the “peeling” behavior that creates the Planckian distribution of emitted quanta.
                    </p>

                    <p>
                    <h2>Tunneling Picture</h2>
                    Another way to see Hawking radiation is as a quantum tunneling process (Parikh–Wilczek picture).
                    Virtual particle pairs form just inside the horizon; the positive energy partner can tunnel out, reducing the mass of the black hole.
                    The tunneling probability is determined semiclassically by the imaginary part of the particle action:
                    <div className='formula'>
                        <BlockMath math="\Gamma \sim e^{-2\,\text{Im}\,S/\hbar}" />
                    </div>
                    For a Schwarzschild black hole:
                    <div className='formula'>
                        <BlockMath math="\text{Im}\,S = 4\pi G M E / c^3" />
                    </div>
                    giving
                    <div className='formula'>
                        <BlockMath math="\Gamma \sim e^{-E/(k_B T_H)}" />
                    </div>
                    This reproduces the Hawking temperature and shows that including energy conservation yields small deviations from perfect thermality — consistent with information-carrying correlations between emitted quanta.
                    </p>

                    <p>
                    <h2>Entanglement and Information Flow</h2>
                    Each emitted Hawking pair is entangled: one mode escapes (observable radiation), the other falls inside. The total state is pure, but the outside observer sees a mixed density matrix after tracing out interior modes:
                    <div className='formula'>
                        <BlockMath math="\rho_{\text{out}} = \text{Tr}_{\text{in}}(|\Psi\rangle\langle\Psi|)" />
                    </div>
                    Initially, radiation entropy increases as more pairs are emitted. If unitarity holds, correlations must develop between early and late quanta so that after the Page time, entropy decreases again.
                    Semiclassical theory misses those correlations — hence the paradox.
                    </p>

                    <p>
                    <h2>Breakdown of the Semiclassical Approximation</h2>
                    Hawking’s calculation assumes quantum fields propagate on a fixed background geometry, neglecting backreaction and quantum gravity effects.
                    However, near the end of evaporation:
                    <ul style={{gap:'1rem',display:'flex', flexDirection:'column', textAlign:'left'}}>
                        <li>Energy conservation and horizon fluctuations become significant.</li>
                        <li>The trans-Planckian problem appears: modes observed at infinity originate from exponentially blueshifted ones near the horizon, probing physics beyond the semiclassical regime.</li>
                        <li>Corrections to local quantum field theory may encode information transfer across the horizon.</li>
                    </ul>
                    </p>

                    <p>
                    <h2>Modern Resolutions</h2>
                    Contemporary quantum gravity suggests several consistent pictures for information recovery:
                    <ul style={{gap:'1rem',display:'flex', flexDirection:'column', textAlign:'left'}}>
                        <li><b><u>Black Hole Complementarity:</u></b> The information is both reflected at and passes through the horizon, but no single observer can verify both; no physical paradox arises.</li>
                        <li><b><u>Firewalls (AMPS paradox):</u></b> Late-time radiation entangled with early radiation violates entanglement monogamy unless the horizon becomes a high-energy surface (“firewall”).</li>
                        <li><b><u>ER = EPR conjecture:</u></b> Entangled systems are connected by microscopic wormholes. The entanglement between Hawking pairs may correspond to nontrivial spacetime geometry.</li>
                        <li><b><u>Islands and Replica Wormholes:</u></b> In recent semiclassical gravity path-integral calculations, new saddle points (“replica wormholes”) appear. The generalized entropy formula,
                        <div className='formula'><BlockMath math="S_{\text{gen}} = \frac{A(\partial \text{Island})}{4 G \hbar} + S_{\text{matter}}" /></div>
                        correctly reproduces the Page curve. Including these islands restores unitarity within semiclassical gravity and suggests information is recovered in the radiation.
                        </li>
                    </ul>
                    </p>
                    <p>
                        <h2>Formulas and principles</h2>
                        Hawking occupation number (thermal spectrum):
                        <div className='formula'><BlockMath math="\langle N_\omega\rangle = \frac{1}{e^{\hbar\omega/(k_B T_H)} - 1}" /></div>
                        Hawking temperature (Schwarzschild):
                        <div className='formula'><BlockMath math="T_H = \frac{\hbar c^3}{8 \pi G k_B M}"/></div>
                        Bekenstein–Hawking entropy:
                        <div className='formula'>
                            <BlockMath math="S_{BH} = \frac{k_B c^3 A}{4 G \hbar} = \frac{k_B A}{4 l_P^2}"/>
                        </div>
                        Evaporation time (order-of-magnitude):
                        <div className='formula'>
                            <BlockMath math="\tau_{\rm evap} \sim \frac{5120\pi G^2 M^3}{\hbar c^4}"/>
                        </div>
                        Energy spectrum for emitted power per frequency (rough form including greybody factor <InlineMath math="\Gamma_\omega" />):
                        <div className='formula'>
                            <BlockMath math="\frac{dE}{dt d\omega} = \sum_{\ell,m} \frac{\hbar \omega}{2\pi} \frac{\Gamma_{\omega,\ell,m}}{e^{\hbar\omega/(k_B T_H)} - 1}"/>
                        </div>
                        Greybody factors encode scattering off the potential outside the horizon and make the spectrum deviate from a perfect blackbody.
                    </p>
                    <p>
                        <h2>Conclusion</h2>
                        The information paradox remains one of the deepest questions in theoretical physics: how quantum mechanics and general relativity reconcile at the horizon scale.
                        Modern developments — holography, islands, and quantum information — suggest that black hole evaporation is indeed unitary, but the mechanism involves subtle nonlocal effects and new geometric contributions beyond the classical horizon.
                    </p>
                <div className='next-prev-chapter-container'>
                    <button className='prev-button' onClick={()=>navigate('/learning/time-dilation-and-relativistic-effects',{replace:true})}><FaArrowLeft/></button>
                    <button className='next-button' onClick={()=>navigate('/learning/numerical-relativity',{replace:true})}><FaArrowRight/></button>
                </div>
            </div>
        </div>
    )
}