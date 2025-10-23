import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import NavigationBar from '../../navigation/NavigationBar';
import { FaArrowRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import CheckerCourseCompleted from './Checker_CourseCompleted';

export default function Introduction() {
    const navigate = useNavigate();

  return (
    <div className='page-container'>
        <NavigationBar/>
        <div className='theory-scroller'>
            <h1 className='chapter-title'>Chapter 1 — Introduction to Black Holes</h1>
             <p>
                Black holes are among the most fascinating predictions of Einstein’s theory of General Relativity.
                They are regions of spacetime where gravity is so intense that nothing—not even light—can escape.
                The boundary beyond which escape becomes impossible is called the <b>event horizon</b>.
            </p>
            <p>
                The simplest type of black hole is described by the <b>Schwarzschild solution</b>, which assumes a
                non-rotating, spherically symmetric mass. The Schwarzschild radius, often denoted as
                <InlineMath math="r_s" />, defines the size of the event horizon:
                <div className='formula'><BlockMath math="r_s = \frac{2GM}{c^2}"/></div>
                Here, <InlineMath math="G" /> is the gravitational constant, <InlineMath math="M" /> is the mass of the object,
                and <InlineMath math="c" /> is the speed of light. Any mass compressed within its Schwarzschild radius becomes a black hole.
            </p>
            <p>
                The curvature of spacetime around such an object is determined by Einstein’s field equations:
                <div className='formula'><BlockMath math="R_{\mu\nu} - \frac{1}{2}R g_{\mu\nu} = \frac{8\pi G}{c^4} T_{\mu\nu}"/></div>
                These equations relate the geometry of spacetime, represented by the tensors
                <InlineMath math="R_{\mu\nu}" /> and <InlineMath math="g_{\mu\nu}" />, to the distribution of
                energy and momentum described by <InlineMath math="T_{\mu\nu}" />.
            </p>
            <p>
                For a vacuum solution where <InlineMath math="T_{\mu\nu} = 0" />, we obtain the Schwarzschild metric:
                <div className='formula'><div className='math-scroll'><BlockMath math="ds^2 = -\left(1 - \frac{2GM}{r c^2}\right)c^2 dt^2 + \left(1 - \frac{2GM}{r c^2}\right)^{-1} dr^2 + r^2 d\Omega^2"/></div></div>
                This describes the geometry of spacetime surrounding a static, spherically symmetric mass.
                As one approaches <InlineMath math="r = r_s" />, time dilation becomes infinite for an external observer,
                marking the boundary of no return.
            </p>
            <p>
                In essence, black holes are not just cosmic voids—they are the most extreme manifestations of gravity,
                where the geometry of spacetime itself becomes dynamic and warped beyond conventional understanding.
            </p>

            <CheckerCourseCompleted/>

            <div className='next-prev-chapter-container'>
                <button className='next-button' onClick={()=>navigate('/learning/spacetime-and-general-relativity', {replace:true})}><FaArrowRight/></button>
            </div>
        </div>
    </div>
  );
}
