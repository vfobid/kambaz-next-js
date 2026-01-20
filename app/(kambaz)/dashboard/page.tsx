import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1235" className="wd-dashboard-course-link">
            <Image src="/images/english.jpg" width={200} height={150} alt="english" />
            <div>
              <h5> EN1235 English </h5>
              <p className="wd-dashboard-course-title">
                Writing in English
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1236" className="wd-dashboard-course-link">
            <Image src="/images/spanish.jpg" width={200} height={150} alt="spanish" />
            <div>
              <h5> SP1236 Spanish </h5>
              <p className="wd-dashboard-course-title">
                Writing in Spanish
              </p>
              <button> Go </button>
            </div>
          </Link>
              </div>
              <div className="wd-dashboard-course">
          <Link href="/courses/1237" className="wd-dashboard-course-link">
            <Image src="/images/math.jpg" width={200} height={150} alt="math" />
            <div>
              <h5> MA1237 Math </h5>
              <p className="wd-dashboard-course-title">
                Mathematics fundamentals
              </p>
              <button> Go </button>
            </div>
          </Link>
              </div>
              <div className="wd-dashboard-course">
          <Link href="/courses/1238" className="wd-dashboard-course-link">
            <Image src="/images/science.jpg" width={200} height={150} alt="science" />
            <div>
              <h5> SC1238 Science </h5>
              <p className="wd-dashboard-course-title">
                Science fundamentals
              </p>
              <button> Go </button>
            </div>
          </Link>
              </div>
              <div className="wd-dashboard-course">
          <Link href="/courses/1239" className="wd-dashboard-course-link">
            <Image src="/images/history.jpg" width={200} height={150} alt="history" />
            <div>
              <h5> HI1239 History </h5>
              <p className="wd-dashboard-course-title">
                History fundamentals
              </p>
              <button> Go </button>
            </div>
          </Link>
              </div>
              <div className="wd-dashboard-course">
          <Link href="/courses/1240" className="wd-dashboard-course-link">
            <Image src="/images/music.jpg" width={200} height={150} alt="music" />
            <div>
              <h5> MU1240 Music </h5>
              <p className="wd-dashboard-course-title">
                Music fundamentals
              </p>
              <button> Go </button>
            </div>
          </Link>
              </div>
              <div className="wd-dashboard-course">
          <Link href="/courses/1241" className="wd-dashboard-course-link">
            <Image src="/images/latin.jpg" width={200} height={150} alt="latin" />
            <div>
              <h5> LA1241 Latin </h5>
              <p className="wd-dashboard-course-title">
                Latin fundamentals
              </p>
              <button> Go </button>
            </div>
          </Link>
              </div>
              <div className="wd-dashboard-course">
          <Link href="/courses/1242" className="wd-dashboard-course-link">
            <Image src="/images/econ.jpg" width={200} height={150} alt="econ" />
            <div>
              <h5> EC1242 Economics </h5>
              <p className="wd-dashboard-course-title">
                Economics fundamentals
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}
