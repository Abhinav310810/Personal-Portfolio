// Replace this URL with your backend URL once deployed
const BACKEND_URL = "https://personal-portfolio-moqm.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
    fetchProjects();
});

// Fetch projects from Backend API
async function fetchProjects() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/projects`);
        const projects = await response.json();
        
        const container = document.getElementById("projects-container");
        container.innerHTML = ""; // Clear the loading text

        if (projects.length === 0) {
            container.innerHTML = "<p>No projects found.</p>";
            return;
        }

        projects.forEach(project => {
            const card = document.createElement("div");
            card.className = "project-card";
            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank" style="color: #007bff; text-decoration: none; font-weight: bold;">View Project</a>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
        document.getElementById("projects-container").innerHTML = "<p>Failed to load projects.</p>";
    }
}
