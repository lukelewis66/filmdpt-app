This project is a React application designed to be a proof-of-concept web app aimed to be used by a school's film department and their students. It uses React for the frontend, and Node.js (express) and MySQL for the backend.

### `Why am I building it?`

One of my previous jobs was working in the office of a local college's TV & Film Department's office. One of the main functions of the office was lending out film gear and accessories from our catalogue for film students to use for their projects. <br /><br />

As part of the reservation workflow, students would use a third party service to request film gear, which the office would then approve, and print out a physical form created by this web service to help us keep track of the reservation. This form was clunky and confusing, and by boss, knowing that I was a Computer Science student, asked me if I could somehow change this output form to make it easier for us to do our job. <br /><br />

I did some research, and decided to scrape keywords from the web service's output using Python, which I then injected into a custom HTML template that I made using Kompozer (a 'what you see is what you get' drag and drop HTML generator) since I was still new to any sort of web design. This script is still being used by the office today, 2+ years after I left the position.<br /><br />

After some pondering on what to do for a project, I figured why don't I make my own version of the reservation service? Better yet, why not I make the film department its own website (theirs is a little bit outdated as well) which has this service implemented in it? With that in mind, I started on this project.

### `The script`

You can find this script in its <a href="https://github.com/lukelewis66/sbcc-reservation-simplifier">repository.</a> It's really quite simple, but I am proud of the problem I solved with it.

### `What's next`

Note that this is an unfinished, proof-of-concept application. Once I am finished, I am planning on contacting my old workplace to see if they would be willing to implement and use my service. If all goes well, who knows, maybe I can offer it to film departments at other colleges and universities. Only time will tell.
