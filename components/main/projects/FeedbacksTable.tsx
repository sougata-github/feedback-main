import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Feedback } from "@prisma/client";

const FeedbacksTable = ({ feedbacks }: { feedbacks: Feedback[] }) => {
  return (
    <Table className="mt-2">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Rating</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {feedbacks.map((feedback) => (
          <TableRow key={feedback.id}>
            <TableCell className="font-medium">{feedback.name}</TableCell>
            <TableCell>{feedback.email}</TableCell>
            <TableCell>{feedback.message}</TableCell>
            <TableCell>{feedback.rating}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FeedbacksTable;
