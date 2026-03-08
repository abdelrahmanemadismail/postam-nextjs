"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface ArticleFeedbackProps {
  helpfulCount: number;
  helpfulQuestion: string;
  helpfulYes: string;
  helpfulNo: string;
}

export function ArticleFeedback({
  helpfulCount,
  helpfulQuestion,
  helpfulYes,
  helpfulNo,
}: ArticleFeedbackProps) {
  const [vote, setVote] = useState<"yes" | "no" | null>(null);

  return (
    <div className="flex flex-col items-center justify-between gap-6 border-y border-border py-10 sm:flex-row">
      <div>
        <p className="font-bold text-foreground">{helpfulQuestion}</p>
        <p className="text-sm text-muted-foreground">
          {helpfulCount.toLocaleString()} people found this helpful
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setVote("yes")}
          className={`flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-all ${
            vote === "yes"
              ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400"
              : "border-border hover:bg-muted"
          }`}
        >
          <ThumbsUp className="h-4 w-4 text-green-500" />
          {helpfulYes}
        </button>
        <button
          onClick={() => setVote("no")}
          className={`flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-all ${
            vote === "no"
              ? "border-destructive bg-destructive/5 text-destructive"
              : "border-border hover:bg-muted"
          }`}
        >
          <ThumbsDown className="h-4 w-4 text-destructive" />
          {helpfulNo}
        </button>
      </div>
    </div>
  );
}
