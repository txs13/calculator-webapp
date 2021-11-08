<h1>Calculator web app</h1>

<p>The purpose of this app is to get real practice in the development of the complete web application based on MERN stack.</p>
<p>Functionally wise, the application is a simple calculator with the history of all the mathematical operations performed.</p>
<p>Mathematical operations are calculated according to the order you enter them and ignoring mathematical rules (i.e. if you enter something like "a+b*c", the calculator will first calculate a+b and then the result will be multiplied by c).</p>
<p>All the calculations are stored in the database and later on could be recalled. Currently there is no possibility to edit the expression, but it is possible to extend it (i.e. if you recalled something like "a+b", you can enter additional operations and make it "a+b*c").</p>
<p>Every time you recall the operation, its "likes count" is increased by 1. You can also "like" any operation manually.</p>
<p>Expressions list is sorted by the number of likes in the descending order.</p>
<h1></h1>
<p>The following components are used  in this web app:</p>
<p>Backend</p>
<ul>
<li>Node JS</li>
<li>Express</li>
<li>MongoDB</li>
</ul>
<p>Frontend</p>
<ul>
<li>React</li>
<li>React Redux</li>
<li>Axios</li>
<li>Pure CSS for styling</li>
</ul>
<h1></h1>
<p>What is going to be added somewhen:</p>
<ul>
<li>Slector expressions to be calculated ether according to the order of the operations entered (as it works now) or according to math rules.</li>
<li>Possibility to edit recalled expressions.</li>
<li>Expression optimizer: "a+(-b)" to automatically converted into "a-b"</li>
<li>Hotkeys to type directly using keyboard</li>
<li>If you run the dockerized verion of the app, frontend is accesible on a port 3000 and is linked to the react dev server. Later on it is going to be linked to the build version.</li>
</ul>