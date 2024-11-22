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
    <Link href={`/projects/${id}`}>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription className="max-w-xs line-clamp-1 text-xs">
            {url}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="min-h-20 max-w-md line-clamp-2 text-sm">
            {description}
          </p>
        </CardContent>
        <CardFooter>
          <p className="text-xs">{feedbacks.length} reviews</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
