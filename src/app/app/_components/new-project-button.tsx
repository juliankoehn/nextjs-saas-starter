import { CP_PREFIX } from "#/lib/const";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export const NewProjectButton: React.FC = () => {
  return (
    <Link
      href={`${CP_PREFIX}/project/new`}
      className="grid items-center h-full justify-stretch p-4 leading-4 border-2 border-dashed rounded-md hover:bg-accent"
    >
      <span className="grid justify-center items-center gap-x-2 grid-flow-col">
        <PlusIcon />
        <span className="leading-7">New Project</span>
      </span>
    </Link>
  );
};
