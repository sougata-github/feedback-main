"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Check, Clipboard } from "lucide-react";

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const onCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Button
      variant="ghost"
      onClick={onCopy}
      className="absolute top-1 right-2 hover:bg-black/5 transition-all"
    >
      {copied ? <Check className="size-5" /> : <Clipboard className="size-5" />}
    </Button>
  );
};

export default CopyButton;
