// ---------------- JOBS DATA ----------------
// ---------------- JOBS DATA ----------------
let jobs = JSON.parse(localStorage.getItem("jobs")) || [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    location: "Bangalore",
    type: "Full-Time",
    category: "Web Development",
    description: "Develop responsive web applications using HTML, CSS, JavaScript and React."
  },
  {
    id: 2,
    title: "Frontend Intern",
    company: "Infosys",
    location: "Remote",
    type: "Internship",
    category: "Web Development",
    description: "Assist in developing company websites and user interfaces."
  },
  {
    id: 3,
    title: "Backend Developer",
    company: "Amazon",
    location: "Hyderabad",
    type: "Full-Time",
    category: "Backend Development",
    description: "Build REST APIs using Java, Spring Boot and MySQL."
  },
  {
    id: 4,
    title: "Java Developer",
    company: "TCS",
    location: "Chennai",
    type: "Full-Time",
    category: "Java Development",
    description: "Develop enterprise Java applications and maintain backend services."
  },
  {
    id: 5,
    title: "Python Developer",
    company: "Capgemini",
    location: "Pune",
    type: "Full-Time",
    category: "Python Development",
    description: "Develop automation tools and web applications using Python."
  },
  {
    id: 6,
    title: "Data Science Intern",
    company: "Wipro",
    location: "Remote",
    type: "Internship",
    category: "Data Science",
    description: "Analyze datasets and build machine learning models."
  },
  {
    id: 7,
    title: "AI/ML Engineer",
    company: "Microsoft",
    location: "Hyderabad",
    type: "Full-Time",
    category: "Artificial Intelligence",
    description: "Design and deploy AI-powered applications using Python and TensorFlow."
  },
  {
    id: 8,
    title: "Cyber Security Analyst",
    company: "IBM",
    location: "Bangalore",
    type: "Full-Time",
    category: "Cyber Security",
    description: "Monitor network security and investigate security incidents."
  },
  {
    id: 9,
    title: "Cloud Engineer",
    company: "Oracle",
    location: "Noida",
    type: "Full-Time",
    category: "Cloud Computing",
    description: "Deploy and manage cloud infrastructure using AWS and Azure."
  },
  {
    id: 10,
    title: "UI/UX Designer",
    company: "Adobe",
    location: "Remote",
    type: "Full-Time",
    category: "UI/UX Design",
    description: "Create user-friendly interfaces and interactive prototypes."
  },
  {
    id: 11,
    title: "DevOps Engineer",
    company: "Accenture",
    location: "Hyderabad",
    type: "Full-Time",
    category: "DevOps",
    description: "Automate deployment pipelines using Docker, Kubernetes and Jenkins."
  },
  {
    id: 12,
    title: "Software Testing Intern",
    company: "Tech Mahindra",
    location: "Pune",
    type: "Internship",
    category: "Software Testing",
    description: "Perform manual and automated testing for web applications."
  }
];
// ---------------- DISPLAY JOBS ----------------
function displayJobs(list = jobs) {

    const container = document.getElementById("jobList");

    if (!container) return;

    container.innerHTML = "";

    list.forEach(job => {

        container.innerHTML += `
        <div class="card">
            <h2>${job.title}</h2>

            <p><strong>Company:</strong> ${job.company}</p>

            <p><strong>Location:</strong> ${job.location}</p>

            <p><strong>Category:</strong> ${job.category}</p>

            <p><strong>Type:</strong> ${job.type}</p>

            <p>${job.description}</p>

            <button onclick="viewJob(${job.id})">
                View Details
            </button>
        </div>
        `;
    });

}
function addJob() {

    const title = document.getElementById("title").value;
    const company = document.getElementById("company").value;
    const location = document.getElementById("location").value;
    const category = document.getElementById("category").value;
    const type = document.getElementById("type").value;
    const description = document.getElementById("desc").value;

    if (
        title === "" ||
        company === "" ||
        location === "" ||
        category === "" ||
        description === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    const job = {
        id: Date.now(),
        title,
        company,
        location,
        category,
        type,
        description
    };

    // Add to the GLOBAL jobs array
    jobs.push(job);

    // Save all jobs
    save();

    alert("Job Posted Successfully ✅");

    window.location.href = "jobs.html";
}
// ---------------- SEARCH JOBS ----------------
function searchJobs() {

    const text = document.getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();

    let filtered = jobs;

    if (text !== "") {

        filtered = jobs.filter(job =>

            job.category.toLowerCase() === text ||

            job.title.toLowerCase().includes(text) ||

            job.company.toLowerCase().includes(text) ||

            job.location.toLowerCase().includes(text)

        );
    }

    displayJobs(filtered);

    const suggestions = document.getElementById("suggestions");

    if (suggestions) {

        suggestions.style.display =
            filtered.length ? "none" : "block";

    }
}

// ---------------- VIEW JOB ----------------
function viewJob(id){
    window.location.href="job-detail.html?id="+id;
}

// ---------------- LOGIN ----------------
function login() {

    const name = document.getElementById("name").value.trim();
    const role = document.getElementById("role").value;

    if(name===""){
        alert("Please enter your name");
        return;
    }

    localStorage.setItem("user",JSON.stringify({
        name:name,
        role:role
    }));

    window.location.href="index.html";
}
function loadUser(){

    const user=JSON.parse(localStorage.getItem("user"));

    if(!user) return;

    document.getElementById("userName").textContent =
        "👤 " + user.name;
}

function logout(){
    localStorage.removeItem("user");
    window.location.href="login.html";
}
function save(){

    localStorage.setItem("jobs",JSON.stringify(jobs));

}
function displayApplications() {

    const container = document.getElementById("appList");

    if (!container) return;

    const applications = JSON.parse(localStorage.getItem("applications")) || [];

    if (applications.length === 0) {

        container.innerHTML = `
            <div class="card">
                <h3>No Applications Yet 😔</h3>
                <p>Start applying for jobs to see them here.</p>
                <button onclick="window.location.href='jobs.html'">
                    Browse Jobs
                </button>
            </div>
        `;

        return;
    }

    container.innerHTML = "";

    applications.forEach(app => {

        container.innerHTML += `
            <div class="card">

                <h2>${app.jobTitle}</h2>

                <p><strong>Applicant:</strong> ${app.name}</p>

                <p><strong>Email:</strong> ${app.email}</p>

                <p>
                    <strong>Resume:</strong>
                    <a href="${app.resume}" target="_blank">
                        View Resume
                    </a>
                </p>

                <p style="color:green;">
                    ✅ Application Submitted
                </p>

            </div>
        `;
    });
}
function goToJobs() {

    const search = document.getElementById("searchInput").value.trim();

    window.location.href =
        "jobs.html?search=" + encodeURIComponent(search);
}
function goToDomain(domain) {

    window.location.href =
        "jobs.html?search=" + encodeURIComponent(domain);

}
function goToJob(title) {

    window.location.href =
        "jobs.html?search=" + encodeURIComponent(title);
}
// ---------------- APPLICATIONS ----------------
let applications =
  JSON.parse(localStorage.getItem("applications")) || [];

function openApplyForm() {
  const form = document.getElementById("applyForm");

  if (form) {
    form.style.display = "block";
  }
}
function searchByDomain(domain){

    document.getElementById("searchInput").value = domain;

    searchJobs();

}
function submitApplication() {
  const id =
    new URLSearchParams(window.location.search)
      .get("id");

  const job =
    jobs.find(j => j.id == id);

  if (!job) {
    alert("Job not found");
    return;
  }

  const application = {
    id: Date.now(),
    jobId: job.id,
    jobTitle: job.title,
    name: document.getElementById("appName").value,
    email: document.getElementById("appEmail").value,
    resume: document.getElementById("appResume").value
  };

  applications.push(application);

  localStorage.setItem(
    "applications",
    JSON.stringify(applications)
  );

  alert("Application Submitted Successfully ✅");

  document.getElementById("applyForm").style.display = "none";
}

// ---------------- INIT ----------------
document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("appList")) {
        displayApplications();
    }

});