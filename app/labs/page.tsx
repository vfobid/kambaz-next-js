import Link from "next/link";
export default function Labs() {
 return (
   <div id="wd-labs">
      <p> <b>Name: </b>Vanessa Fobid <b>Section: </b>02  <b>GitHub Repo: </b> <a href="https://github.com/vfobid/kambaz-next-js" target="_blank" id="wd-github"> https://github.com/vfobid/kambaz-next-js </a></p>
     <h1>Labs</h1>
     <ul>
       <li>
         <Link href="/labs/lab1" id="wd-lab1-link">
           Lab 1: HTML Examples </Link>
       </li>
       <li>
         <Link href="/labs/lab2" id="wd-lab2-link">
           Lab 2: CSS Basics </Link>
       </li>
       <li>
         <Link href="/labs/lab3" id="wd-lab3-link">
           Lab 3: JavaScript Fundamentals </Link>
       </li>
        <li>
       <Link href="/" id="wd-lab3-link">
         Kambaz </Link> </li>
     </ul>
   </div>
);}
