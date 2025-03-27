## Getting Started

To run the development server,

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Settings
### ./data/settings.json
```json
{
    "sections": {
        "about": true,              // true to enable 'About Me' section
        "skills": true,             // true to enable 'Skills' section
        "journey": true,            // true to enable 'Journey' section
        "projects": true,           // true to enable 'Projects' section
        "certifications": true      // true to enable 'Certifications section'
    },
    "darkModeDefault": false        // true to default to dark mode, false to default to light mode
}
```

## Changing values
### ./data/general.json
```json
{
    "name": "your_name_here",                                               // Your name in About Me section
    "role": "your_role_here",                                               // Your job/specialisation in About Me section
    "introduction": "Hi, my name is your_name_here. I am happi.",           // Short description in About Me section
    "github": "https://github.com/your-github-username?tab=repositories",   // GitHub repositories
    "linkedin": "https://www.linkedin.com/in/your-linkedin-url",            // LinkedIn profile
    "email": "your_email@domain.com",                                       // email address for mailto:
    "resumeUrl": "/download/Resume.pdf",                                    // resume file. can be set to remote URL
    "profilePicture": {
        "url": "/images/profile-picture.png",                               // profile picture. can be set to remote URL
        "width": 1142                                                       // change to the image width size
    }
}
```

### ./data/navbar-items.json
```json
// NOTE: The "path" values are linked to ./data/general.json. Make sure the path matches the sections key value (e.g., "path": "#about" -> "sections.about")
[
    {
        "path": "#about",           // Must be unique. Used to scroll to section when clicked on the navbar item
        "name": "About Me"          // Label shown on navbar.
    },
    {
        "path": "#skills",
        "name": "Skills"
    },
    {
        "path": "#journey",
        "name": "Journey"
    },
    {
        "path": "#projects",
        "name": "Projects"
    },
    {
        "path": "#certifications",
        "name": "Certifications"
    }
]
```

### ./data/skills.json
```json
{
    "Frontend": [                       // This will create a new subheader in Skills section
        {
            "name": "Next.js",          // Name of skill
            "description": "Next.js",   // Description of skill (unused)
            "iconName": "nextjs",       // File name of skill's logo (stored in ./public/images/skills)
            "iconFormat": "png"         // File extension of image file
        }
    ],
    "Backend": [
        {
            "name": ".NET",
            "description": ".NET",
            "iconName": "dotnet",
            "iconFormat": "svg"
        }
    ],
    "Languages": [
        {
            "name": "TypeScript",
            "description": "TypeScript",
            "iconName": "typescript",
            "iconFormat": "svg"
        },                              // You can add multiple skills into 1 subheader.
        {
            "name": "HTML",
            "description": "HTML",
            "iconName": "html",
            "iconFormat": "svg"
        }
    ]
}
```

### ./data/journey.json
```json
[
    {
        "heading": "Company ABC",           // Company name/School name
        "subheading": "Software Engineer",  // Job title/Degree
        "duration": "Jun 2024 - Present",   // Duration
        "type": "work",                     // "work" or "education", determines the icon displayed
        "pointers": [                       // Bullet points for short description
            "Successfully developed 2 full SDLC products",
            "Maintained and enhanced web UI and backend API controllers for an eCommerce website."
        ]
    },
    {
        "heading": "University XYZ",
        "subheading": "Bachelor of Science in Computer Science",
        "duration": "Apr 2021 - Apr 2024",
        "type": "education",
        "pointers": [
            "GPA: 4.52/5.00",
            "Director's List for Academic Year 2021 to 2024",
        ]
    }
]
```

### ./data/projects.json
```json
[
    {
        "title": "Product Web App",             // Title of the project
        "shortDesc": "A web app show casing the use of motion effects, 3D rendering and integration of backend services.", // Short description displayed without clicking on modal
        // Long description, displayed when clicked on the project (use \n for new lines)
        "longDesc": "Software/Tools: Remix/React, Tailwind CSS, .NET, MongoDB, Netlify, GitHub Actions\n\nThe project demo is deployed to Netlify using a basic CI/CD configuration with GitHub Actions with the backend services deployed to Azure App Service.",
        "type": "software",                     // See ./data/project_types.json
        "url": "https://your_demo_url.com/",    // Demo for the project (can be left blank: "")
        "repo": "https://github.com/your-github-username/repo-for-this-project",    // Repository for the project (can be left blank: "")
        "img": "product-web-app.jpg",           // Image to display for the project
        "imgWidth": 1206,                       // Width of the image (recommend to crop to around 1206 for better centering)
        "imgHeight": 753                        // Height of the image (recommend to crop to around 753 for better centering
    },
    {
        "title": "This Portfolio!",
        "shortDesc": "A mobile friendly responsive design portfolio in NextJS with modular components.",
        "longDesc": "Software/Tools: NextJS/React, Tailwind CSS, Vercel, GitHub Actions\n\nThe project demo is deployed to Vercel using a basic CI/CD configuration with GitHub Actions.",
        "type": "software",
        "url": "",
        "repo": "",
        "img": "portfolio.jpg",
        "imgWidth": 1206,
        "imgHeight": 753
    }
]
```

### ./data/project_types.json
```json
[
    {
        "value": "",                            // Leave the first value blank to display all projects
        "label": "All projects"
    },
    {
        "value": "software",                    // Category (this value is used in ./data/projects.json)
        "label": "Software/Web projects only"   // Display label shown on the select drop down list
    },
    {
        "value": "game",
        "label": "Game Development projects only"
    }
]
```

### ./data/certifications.json
```json
[
    {
        "name": "Professional Scrum Developer I",                   // Name of certificate
        "url": "https://www.your_certification_verification.com",   // URL for certificate verification
        "iconName": "psd1",                                         // Image file name without file extension
        "iconFormat": "png"                                         // File extension for image file
    }
]
```