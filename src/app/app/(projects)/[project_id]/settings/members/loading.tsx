import { Separator } from "#/components/ui/separator";
import { SubPageHeaderSkeleton } from "#/components/ui/subpage-header";

export default function loading() {
  return (
    <div className="flex flex-col gap-8">
      <SubPageHeaderSkeleton />
      <Separator />
    </div>
  );
}
