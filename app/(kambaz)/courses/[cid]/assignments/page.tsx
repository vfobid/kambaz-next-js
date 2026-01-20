import Link from "next/link";
export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments"
             id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button> </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href="/courses/1234/assignments/123"
             className="wd-assignment-link" >
            A1 - ENV + HTML
          </Link>
            <br/>
                  Multiple Modules | <b>Not available until</b> May 6 at 12:00am |
              <b>Due</b> May 13 at 11:59pm | 100pts</li>
         <li className="wd-assignment-list-item">
          <Link href="/courses/1234/assignments/124"
             className="wd-assignment-link" >
            A2 - CSS + BOOTSTRAP
                  </Link>
          <br/>
                  Multiple Modules | <b>Not available until</b> May 13 at 12:00am |
                  <b>Due</b> May 20 at 11:59pm | 100pts</li>
               <li className="wd-assignment-list-item">
          <Link href="/courses/1234/assignments/125"
             className="wd-assignment-link" >
            A3 - JAVASCRIPT + REACT
          </Link>
          <br/>
                  Multiple Modules | <b>Not available until</b> May 20 at 12:00am |
              <b>Due</b> May 27 at 11:59pm | 100pts</li>
      </ul>

      <h3 id="wd-assignments-title">
        QUIZZES 20% of Total <button>+</button> </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href="/courses/1234/assignments/123"
             className="wd-assignment-link" >
            Quiz 1
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/courses/1234/assignments/124"
             className="wd-assignment-link" >
            Quiz 2
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/courses/1234/assignments/125"
             className="wd-assignment-link" >
            Quiz 3
          </Link>
        </li>
      </ul>
      
      <h3 id="wd-assignments-title">
        EXAMS 20% of Total <button>+</button> </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href="/courses/1234/assignments/123"
             className="wd-assignment-link" >
            Exam 1
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/courses/1234/assignments/124"
             className="wd-assignment-link" >
            Exam 2
          </Link>
        </li>
      </ul>
      
      <h3 id="wd-assignments-title">
        PROJECTS 20% of Total <button>+</button> </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href="/courses/1234/assignments/123"
             className="wd-assignment-link" >
            Project 1
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/courses/1234/assignments/124"
             className="wd-assignment-link" >
            Project 2
          </Link>
        </li>
          </ul>
    </div>
);}
