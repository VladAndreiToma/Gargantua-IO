import { useMemo } from "react";
import NavigationBar from "../../navigation/NavigationBar";
import { Link } from "react-router-dom";
import { FaArrowDownShortWide, FaArrowUpWideShort, FaMagnifyingGlassArrowRight } from "react-icons/fa6";


const news = [
  {
    title: "A Tiny Detector Could Unveil Gravitational Waves We've Never Seen Before",
    shortStory: "Researchers have designed a new type of gravitational wave detector that operates in the molli-Hertz range, a region untouched by current observatories. Built with optical resonators and atomic clocks, the compact detectors can fit on a lab table...",
    date: new Date("Oct 3 2025"),
    linkTo: "https://www.sciencedaily.com/releases/2025/10/251003033920.htm"
  },
  {
    title: "A Star Torn Apart by a Black Hole Lit Up the Universe Twice",
    shortStory: "Astronomers using AI have captured a once-in-a-lifetime cosmic event: a massive star’s violent death triggered by its black hole companion. The explosion, known as SN 2023zkd, not only produced a brilliant supernova but also shocked scientists by ...",
    date: new Date("Aug 22 2025"),
    linkTo: "https://www.sciencedaily.com/releases/2025/08/250819072159.htm"
  },
  {
    title: "AI Reveals Milky Way’s Black Hole Spins Near Top Speed",
    shortStory: "AI has helped astronomers crack open some of the universe s best-kept secrets by analyzing massive datasets about black holes. Using over 12 million simulations powered by high-throughput computing, scientists discovered that the Milky Way's central ..."
    ,date: new Date("Jun 5 2025"),
    linkTo: 'https://www.sciencedaily.com/releases/2025/06/250603114637.htm'
  },
  {
    title:"Scientists Discover New Evidence of Intermediate-mass Black Holes",
    shortStory:"A series of studies sheds light on the origins and characteristics of intermediate-mass black ...",
    date: new Date("May 30 2025"),
    linkTo: 'https://www.sciencedaily.com/releases/2025/05/250530123810.htm'
  },
  {
    title:"'Cosmic Joust': Astronomers Observe Pair of Galaxies in Deep-space Battle",
    shortStory:"Astronomers have witnessed for the first time a violent cosmic collision in which one galaxy pierces another with intense radiation. Their results show that this radiation dampens the wounded galaxy's ability to form new ...",
    date: new Date("May 21 2025"),
    linkTo: 'https://www.sciencedaily.com/releases/2025/05/250521124254.htm'
  },
  {
    title:'Not One, but Two Massive Black Holes Are Eating Away at This Galaxy',
    shortStory:'Astronomers searching for massive black holes shredding stars found one in an unusual place -- 2,600 light years from the core of a galaxy. The roque black hole may be from an earlier merger with another galaxy, or have been tossed out of the core ...',
    date: new Date("May 19 2025"),
    linkTo:'https://www.sciencedaily.com/releases/2025/05/250519132018.htm'
  }
];

const additionalStyleForP = {
    display:"flex",
    flexDirection:'column',
    gap:'1.3rem',
    alignItems:"center",
    justifyContent:"center"
}

export default function ScienceNews() {
  // memoize the sorted news, runs only once unless `news` changes
  const sortedNews = useMemo(() => {
    return [...news].sort((a, b) => b.date - a.date);
  }, []); // empty dependency → sortăm o singură dată la mount

  return (
    <div className="page-container">
      <NavigationBar />
      <div className="about-scroller">
        {sortedNews.map((item, idx) => (
          <div key={idx}>
            <p style={additionalStyleForP}>
                <l className="quiz-subject">{item.title}</l>
              { item.date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                <l>{item.shortStory}</l>
                <Link to={item.linkTo} style={{textDecoration:"none", color:'#fff'}}><FaMagnifyingGlassArrowRight style={{width:'2rem', height:'2rem'}}/></Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
