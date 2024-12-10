import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectWithFeedbacks } from "@/types";
import Link from "next/link";

const ProjectCard = ({ project }: { project: ProjectWithFeedbacks }) => {
  const { id, name, url, description, feedbacks } = project;

  return (
    <Link href={`/projects/${id}`} className="block h-full">
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className="text-base line-clamp-1">{name}</CardTitle>
          <CardDescription>
            <p className="text-sm text-muted-foreground line-clamp-1">{url}</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm line-clamp-3">{description}</p>
        </CardContent>
        <CardFooter>
          <span className="text-xs">{feedbacks?.length} reviews</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
