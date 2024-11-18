import { Loader } from "lucide-react";

const loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Loader className="size-5 text-black animate-spin transition-all" />
    </div>
  );
};

export default loading;
