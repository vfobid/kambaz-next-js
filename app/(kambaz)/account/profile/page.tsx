import Link from "next/link";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <input defaultValue="vanessa"  placeholder="username" type="text" className="wd-username"/><br/>
      <input defaultValue="mypassword"   placeholder="password" type="password"
             className="wd-password" /><br/>
      <input defaultValue="Vanessa"  placeholder="First Name" type="text" id="wd-firstname" /><br/>
      <input defaultValue="Fobid"  placeholder="Last Name" type="text" id="wd-lastname" /><br/>
      <input defaultValue="2000-01-01" type="date" id="wd-dob" /><br/>
      <input defaultValue="vanessa@wonderland" type="email" id="wd-email" /><br/>
      <select defaultValue="STUDENT" id="wd-role">
        <option value="USER">User</option>       <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option> <option value="STUDENT">Student</option>
          </select><br />
          <form action="signin" method="get" target="_self">
              <button type="submit" formTarget="_self">Sign out</button>
            </form>
    </div>
);}