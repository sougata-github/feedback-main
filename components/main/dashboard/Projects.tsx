import ProjectCard from "./ProjectCard";
import { ProjectWithFeedbacks } from "@/types";

const Projects = ({ projects }: { projects: ProjectWithFeedbacks[] }) => {
  return (
    <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {projects.map((project: ProjectWithFeedbacks) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
};

export default Projects;
