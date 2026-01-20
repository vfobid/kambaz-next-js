import Link from "next/link";
export default function Signin() {
 return (
   <div id="wd-signin-screen">
     <h3>Sign in</h3>
     <input placeholder="username" defaultValue="vanessa" type="text" className="wd-username" /> <br />
     <input placeholder="password" defaultValue="mypassword" type="password" className="wd-password" /> <br />
     <form action="/dashboard" method="get" target="_self">
              <button type="submit" formTarget="_self">Sign in</button>
            </form>
     {/*<Link href="/dashboard" id="wd-signin-btn"> Sign in </Link> <br />*/}
     <Link href="signup" id="wd-signup-link"> Sign up </Link>
   </div>
);}
