"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function AssignmentEditor() {
  const { aid } = useParams();
  
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td style={{ textAlign: "right", verticalAlign: "top" }}>
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" type="number" defaultValue={100} />
          </td>
        </tr>

        <tr>
          <td style={{ textAlign: "right", verticalAlign: "top" }}>
            <label htmlFor="wd-assignment-group">Assignment Group </label>
          </td>
          <td>
            <select id="wd-select-one-genre">
   <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZES">QUIZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECTS">PROJECTS</option>
</select>
          </td>
        </tr>

        <tr>
          <td style={{ textAlign: "right", verticalAlign: "top" }}>
            <label htmlFor="wd-assignment-group">Display Grade as </label>
          </td>
          <td>
            <select id="wd-select-one-genre">
   <option value="Percentage">Percentage</option>
              <option value="Letter">Letter</option>
              <option value="Fraction">Fraction</option>
</select>
          </td>
        </tr>

        <tr>
          <td style={{ textAlign: "right", verticalAlign: "top" }}>
            <label htmlFor="wd-assignment-group">Submission Type</label>
          </td>
          <td>
            <select id="wd-select-one-genre">
   <option value="Online">Online</option>
              <option value="In-person">In-person</option>
</select>
          </td>
        </tr>

        <tr>
          <td style={{ textAlign: "right", verticalAlign: "top" }}>
            <label>Online Entry Options</label><br/>
      <div style={{ textAlign: "left" }}>
<input type="checkbox" name="check-genre" id="wd-chkbox-comedy"/>
<label htmlFor="wd-chkbox-comedy">Text Entry</label><br/>

<input type="checkbox" name="check-genre" id="wd-chkbox-drama"/>
<label htmlFor="wd-chkbox-drama">Website URL</label><br/>

<input type="checkbox" name="check-genre" id="wd-chkbox-scifi"/>
<label htmlFor="wd-chkbox-scifi">Media Recordings</label><br/>

<input type="checkbox" name="check-genre" id="wd-chkbox-anno"/>
<label htmlFor="wd-chkbox-anno">Student Annotation</label><br/>
            
<input type="checkbox" name="check-genre" id="wd-chkbox-fantasy"/>
<label htmlFor="wd-chkbox-fantasy">File Uploads</label>
             </div>
            </td>
        </tr>

        <tr>
          <td style={{ textAlign: "right", verticalAlign: "top" }}>
            <label htmlFor="wd-points">Assign to</label>
          </td>
          <td>
            <input id="wd-points" defaultValue="Everyone" />
          </td>
        </tr>

        <tr>
          <td>
            <label htmlFor="wd-text-fields-dob"> Due: </label>
<input type="date"
       defaultValue="2024-05-13"
       id="wd-text-fields-dob"/><br/>
          </td>
        </tr>

        <tr>
          <td>
            <label htmlFor="wd-text-fields-dob"> Available from: </label>
<input type="date"
       defaultValue="2024-05-06"
       id="wd-text-fields-dob"/>
          </td>
        </tr>

        <tr>
          <td>
            <label htmlFor="wd-text-fields-dob"> Until: </label>
<input type="date"
       defaultValue="2024-05-20"
       id="wd-text-fields-dob"/><br/>
          </td>
        </tr>
        
        
      </table>
    </div>
);}
