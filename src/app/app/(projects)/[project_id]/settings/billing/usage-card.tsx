import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { InfinityIcon, UsersIcon } from "lucide-react";

export interface UsageCardProps {
  label: string;
  limit: number;
  usage: number | string;
}

export const UsageCard: React.FC<UsageCardProps> = (props) => {
  const { label, limit, usage } = props;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <UsersIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold flex items-center">
          <span>{usage}</span>
          <span className="text-slate-11">/</span>
          <span>{limit > 100000 ? <InfinityIcon /> : limit}</span>
        </div>
      </CardContent>
    </Card>
  );
};
