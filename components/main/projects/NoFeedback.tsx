import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../../ui/button";

const NoFeedback = ({ id }: { id: string }) => {
  return (
    <Card className="py-4 min-h-32 flex items-center max-w-lg">
      <CardContent className="flex flex-col items-start gap-4 py-2">
        <p>
          Looks like there are no reviews for this project yet. Start by
          integrating the feedback widget into your app.
        </p>
        <Button asChild>
          <Link href={`/projects/${id}/new`}>Integrate</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoFeedback;
