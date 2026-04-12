"use client";
import * as client from "../courses/client";
import * as enrollmentsClient from "../enrollments/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../courses/reducer";
import { enroll, unenroll, setEnrollments } from "../enrollmentsReducer";
import { RootState } from "../store";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer,
  );
  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const isAdmin =
    currentUser?.role === "ADMIN" || currentUser?.role === "FACULTY";

  const fetchCourses = async () => {
    try {
      if (showAllCourses) {
        const allCourses = await client.fetchAllCourses();
        dispatch(setCourses(allCourses));
      } else {
        const myCourses = await client.findMyCourses();
        dispatch(setCourses(myCourses));
      }
      if (currentUser) {
        const userEnrollments = await enrollmentsClient.getMyEnrollments();
        dispatch(setEnrollments(userEnrollments));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(courses.map((c: any) => (c._id === course._id ? course : c))),
    );
  };

  const onEnroll = async (courseId: string) => {
    const enrollment = await enrollmentsClient.enrollInCourse(courseId);
    dispatch(enroll(enrollment));
    await fetchCourses();
  };

  const onUnenroll = async (courseId: string) => {
    await enrollmentsClient.unenrollFromCourse(courseId);
    dispatch(unenroll({ userId: (currentUser as any)._id, courseId }));
    await fetchCourses();
  };

  const isEnrolled = (courseId: string) => {
    return enrollments.some((e: any) => {
      const enrolledCourseId =
        typeof e.course === "object" ? e.course?._id : e.course;
      return enrolledCourseId === courseId;
    });
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser, showAllCourses]);

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        {currentUser && (
          <button
            className="btn btn-primary float-end"
            onClick={() => setShowAllCourses(!showAllCourses)}
          >
            Enrollments
          </button>
        )}
      </h1>
      <hr />
      {isAdmin && (
        <>
          <h5>
            New Course
            <button
              onClick={onAddNewCourse}
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={onUpdateCourse}
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            className="mb-2"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.filter((c: any) => c && c._id).length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
            .filter((c: any) => c && c._id)
            .map((c: any) => (
              <Col
                key={c._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <Link
                    href={
                      !currentUser || isAdmin || isEnrolled(c._id)
                        ? `/courses/${c._id}/home`
                        : `/dashboard`
                    }
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      src="/images/reactjs.jpg"
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {c.name}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {c.description}
                      </CardText>

                      {currentUser &&
                        showAllCourses &&
                        !isAdmin &&
                        (isEnrolled(c._id) ? (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              onUnenroll(c._id);
                            }}
                            className="btn btn-danger float-end"
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              onEnroll(c._id);
                            }}
                            className="btn btn-success float-end"
                          >
                            Enroll
                          </button>
                        ))}

                      <Button variant="primary">Go</Button>

                      {isAdmin && (
                        <>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setCourse(c);
                            }}
                            className="btn btn-warning me-2 float-end"
                            id="wd-edit-course-click"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              onDeleteCourse(c._id);
                            }}
                            className="btn btn-danger float-end me-2"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}
