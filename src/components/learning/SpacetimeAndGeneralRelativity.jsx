import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import NavigationBar from "../../navigation/NavigationBar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function SpacetimeAndGeneralRelativity(){
    return(
        <div className="page-container">
            <NavigationBar/>
            <div className="theory-scroller">
                <h1 className='chapter-title'>Chapter 2 - Space-Time and General Relativity</h1>
                <p>
                    In Einstein’s theory, gravity is not a force acting at a distance. Instead,
                    massive objects cause spacetime to curve, and this curvature guides the
                    motion of matter and light.
                </p>
                <p>
                    <h2>The Nature of Space-time</h2>
                    In classical mechanics, space and time were treated as separate, absolute entities.
                    Einstein’s Special Theory of Relativity (1905) unified them into a single four-dimensional continuum called spacetime.
                    Every event can be represented by coordinates: <InlineMath math="(x, y, z, t)" />,
                    and different observers moving relative to one another measure different coordinates — but the same spacetime interval:
                    <div className="formula"><BlockMath math="s^2 = c^2 t^2 - x^2 - y^2 - z^2" /></div>
                    The interval <InlineMath math="s^2" /> remains invariant under transformations between inertial frames.
                    If <InlineMath math="s^2 > 0" />, the interval is timelike;
                    if <InlineMath math="s^2 = 0" />, lightlike;
                    if <InlineMath math="s^2 < 0" />, spacelike.
                </p>
                <p>
                    <h2>Lorentz Transformations</h2>
                    To preserve this invariant interval, the coordinates between two inertial frames moving at velocity
                    <InlineMath math="v" />
                    relative to one another are related by the Lorentz transformations:
                    <div className="formula">
                        <BlockMath math="x' = \gamma (x - v t)"/>
                        <BlockMath math="t' = \gamma \left(t - \frac{v x}{c^2}\right)"/>
                        <BlockMath math="y' = y" /> <BlockMath math="z' = z" />
                    </div>
                    where
                    <div className="formula">
                        <BlockMath math="\gamma = \frac{1}{\sqrt{1 - \frac{v^2}{c^2}}}" />
                    </div>
                    is the Lorentz factor.<br/>
                    These transformations ensure that the speed of light <InlineMath math="c" />
                    is constant in all inertial frames — a key postulate of relativity.
                </p>
                <p>
                    <h2>Consequences of Lorentz Transformations</h2>
                    Time Dilation:
                    A moving clock ticks slower relative to a stationary observer:
                    <div className="formula"><BlockMath math="\Delta t = \gamma \, \Delta t_0"/></div>
                    Length Contraction:
                    An object moving with speed <InlineMath math="v" /> along the x-axis appears shorter:
                    <div className="formula"><BlockMath math="L = \frac{L_0}{\gamma}"/></div>
                    Relativity of Simultaneity:
                    Events that are simultaneous in one frame may not be in another.
                </p>
                <p>
                    <h2>From Special to General Relativity</h2>
                    Special relativity assumes flat spacetime (Minkowski metric):
                    <div className="formula">
                        <BlockMath math="ds^2 = c^2 dt^2 - dx^2 - dy^2 - dz^2" />
                    </div>
                    However, when gravity is present, spacetime becomes curved.
                    Einstein’s General Theory of Relativity (1915) describes this curvature through the metric tensor <InlineMath math="g_{\mu\nu}" />,
                    which generalizes the flat metric above.<br/>
                    The Einstein Field Equations relate curvature to energy and momentum:
                    <div className="formula">
                        <BlockMath math="R_{\mu\nu} - \tfrac{1}{2} R g_{\mu\nu} = \tfrac{8 \pi G}{c^4} T_{\mu\nu}" />
                    </div>
                    Here:<br/>
                    <InlineMath math="R_{\mu\nu}"/> = Ricci curvature tensor<br/>
                    <InlineMath math="R" /> = scalar curvature<br/>
                    <InlineMath math="T_{\mu\nu}" /> = stress-energy tensor<br/>
                    These equations say: mass and energy tell spacetime how to curve, and curved spacetime tells matter how to move.
                </p>
                <p>
                    <h2>The Geodezic Equation</h2>
                    A freely falling object in curved spacetime follows a path that extremizes the spacetime interval — a geodesic:
                    <div className="formula"><BlockMath math="\frac{d^2 x^\mu}{d \tau^2} + \Gamma^\mu_{\nu\rho} \frac{d x^\nu}{d \tau} \frac{d x^\rho}{d \tau} = 0"/></div>
                    where <InlineMath math="\Gamma^\mu_{\nu\rho}" /> are the Christoffel symbols, representing the connection (curvature) of spacetime.
                </p>
                <p>
                    <h2>The Weak-Field Limit(Newtonian Approximation)</h2>
                    In weak gravitational fields, where spacetime curvature is small,
                    General Relativity reduces to Newton’s law of gravitation.
                    The metric can be approximated as:
                    <div className="formula"><BlockMath math="g_{00} \approx 1 + \frac{2 \phi}{c^2}" /></div>
                    where <InlineMath math="\phi" /> is the Newtonian gravitational potential.
                    This shows how Einstein’s equations generalize Newtonian gravity rather than replacing it entirely.
                </p>
                <p>
                    Einstein’s key insight:
                    “There is no local experiment that can distinguish between uniform acceleration and a gravitational field.”
                    Thus, an observer in free fall experiences no gravity locally — a fundamental idea leading directly to curved spacetime.
                </p>
                <div className="next-prev-chapter-container">
                    <button className="prev-button"><FaArrowLeft/></button>
                    <button className="next-button"><FaArrowRight/></button>
                </div>
            </div>
        </div>
    )
}