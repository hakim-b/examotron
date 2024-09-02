import { ReactNode } from "react";

export type ExamotronFile = {
  relativePath: string;
  fileName: string;
  year?: number;
  subject: string;
  type?: "assignment" | "midterm" | "final";
  courseCode: string;
};

export type LayoutProps = {
  children: ReactNode;
};

export type MessageProps = {
  content: string;
};
