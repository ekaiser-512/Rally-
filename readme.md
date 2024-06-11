## README.md for New Moms Job Board Website

### Introduction
Welcome to the New Moms Job Board website, a platform dedicated to helping new mothers re-enter the workforce by connecting them with companies that offer supportive environments and benefits. This README.md file provides an overview of the core features, design specifications, and implementation guidelines for this website built using HTML, CSS, Vanilla JavaScript, and Git.

### Core Features
1. **Login/Signup Page:**
   - Users are required to log in with valid credentials to access the website.
   - Simulated authentication process with a username and password prompt.
   
2. **Fetch API Usage:**
   - Utilization of the Fetch API to retrieve data from an open API source.

3. **Comment and Like Functionality:**
   - Users can like and comment on posts.
   - Posts display like counts and have a comment section with a maximum of four comments.

### Login Page Specifications
- Header with website name and theme toggle switch (light/dark mode).
- Warning message for empty login fields.
- Placeholder buttons for Facebook and Google logins.

### Main Page Design
**Mobile View (≤ 768 px)**
- Display website name and personalized greeting in the header.
- Hamburger menu for navigation with links and user profile picture.

**Desktop View (> 768 px)**
- Aside element fetching relevant information via Fetch API.

**Common Requirements for Both Views**
- Consistent display of website name in the header.
- Section for posting new content with submission button.
- Display existing posts with sorting functionality (date ascending/descending).
- Search feature for filtering posts by text content.
- Like button and comment section for each post.

### Implementation Guidelines
1. **Mobile-First Design:**
   - Develop the application with a mobile-first approach for full responsiveness.
   
2. **Validation:**
   - Use semantic HTML5 elements for meaningful content structure.
   - Validate HTML and CSS using appropriate validators.

3. **Layout Design:**
   - Utilize CSS Flexbox or Grid for responsive layout designs.

4. **JavaScript Functionality:**
   - Handle DOM manipulation for dynamic content interaction, login process, data fetching, comments, and likes.
   - Enable deletable comments using JavaScript.
   
5. **Fetch API Integration:**
   - Dynamically populate parts of the site with external data using the Fetch API.

By following these guidelines, you can create a user-friendly and engaging job board platform tailored to support new mothers in their career journey. Happy coding!

Original readme draft below --

12 weeks, 84 days (all that is granted by FMLA after giving birth - and you aren't guaranteed pay)

women returning to their jobs after giving birth are already going through an insane amount of adjustment in order to manage their time and care for their new baby. The United States does not provide any form of guaranteed support during their transition. 

Many women find that upon their return to work, that as a parent they are not given the support they need by their companies, even if they were given a good maternity leave package. This is where we come in. 

_____ aims to provide new moms the opportunity to search for a new role with a company that wants to provide more support for their employees. This can be in the form of flexible hours, in office child care, or additional benefits. 