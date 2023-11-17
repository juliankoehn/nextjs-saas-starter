import { Skeleton } from "./skeleton";

export interface SubPageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const SubPageHeader: React.FC<SubPageHeaderProps> = (props) => {
  const { children, title, description } = props;

  return (
    <div className="flex justify-between space-y-0.5">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {children && <div className="flex flex-row gap-2">{children}</div>}
    </div>
  );
};

export const SubPageHeaderSkeleton: React.FC = () => {
  return (
    <div className="flex justify-between space-y-0.5">
      <div className="flex flex-col gap-y-1">
        <Skeleton className="w-[150px] h-[32px]" />
        <Skeleton className="w-[330px] h-[24px]" />
      </div>
      <div>
        <Skeleton className="h-[40px] w-[150px]" />
      </div>
    </div>
  );
};
