import Link from "next/link";
import { Card, CardBody, CardTitle, CardText, CardImg, Button, Row, Col } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (9)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/courses/1234/home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">CS1234 React JS</CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Full Stack software developer</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/courses/1235/home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/english.jpg" width="100%" height={160}/>
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">EN1235 English</CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Writing in English</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/courses/1236/home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/spanish.jpg" width="100%" height={160}/>
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">SP1236 Spanish</CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Writing in Spanish</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/courses/1237/home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/math.jpg" width="100%" height={160}/>
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">MA1237 Math</CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Mathematics fundamentals</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/courses/1238/home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/science.jpg" width="100%" height={160}/>
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">SC1238 Science</CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Science fundamentals</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/courses/1239/home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/history.jpg" width="100%" height={160}/>
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">HI1239 History</CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    History fundamentals</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/courses/1240/home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/music.jpg" width="100%" height={160}/>
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">MU1240 Music</CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Music fundamentals</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/courses/1241/home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/latin.jpg" width="100%" height={160}/>
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">LA1241 Latin</CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Latin fundamentals</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/courses/1242/home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/econ.jpg" width="100%" height={160}/>
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">EC1242 Economics</CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Economics fundamentals</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}