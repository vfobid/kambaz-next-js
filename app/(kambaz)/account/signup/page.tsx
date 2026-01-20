import Link from "next/link";
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <input defaultValue="vanessa" placeholder="username" type="text" className="wd-username" /><br/>
      <input defaultValue="mypassword" placeholder="password" type="password" className="wd-password" /><br/>
      <input defaultValue="mypassword" placeholder="verify password"
             type="password" className="wd-password-verify" /><br/>
      <form action="profile" method="get" target="_self">
              <button type="submit" formTarget="_self">Sign up</button>
            </form>
      <Link  href="signin" > Sign in </Link>
    </div>
);}
