import { CP_PREFIX } from "#/lib/const";
import Link from "next/link";

const ProjectNotFound = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href={CP_PREFIX}>Return Home</Link>
    </div>
  );
};

export default ProjectNotFound;
