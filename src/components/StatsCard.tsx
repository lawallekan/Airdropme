import React from "react";
import { Link } from "../lib/storage";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Link2, Tag, Clock } from "lucide-react";

interface StatsCardProps {
  links: Link[];
}

const StatsCard = ({ links }: StatsCardProps) => {
  // Get all unique tags
  const uniqueTags = new Set(links.flatMap((link) => link.tags));

  // Get the most recent link
  const mostRecentLink =
    links.length > 0
      ? links.reduce((latest, current) => {
          return new Date(current.createdAt) > new Date(latest.createdAt)
            ? current
            : latest;
        }, links[0])
      : null;

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Links</CardTitle>
          <Link2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{links.length}</div>
          <p className="text-xs text-muted-foreground">
            Links in your collection
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Unique Tags</CardTitle>
          <Tag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueTags.size}</div>
          <p className="text-xs text-muted-foreground">
            Categories for organization
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Latest Addition</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {mostRecentLink ? (
            <>
              <div className="text-sm font-medium truncate">
                {mostRecentLink.title}
              </div>
              <p className="text-xs text-muted-foreground">
                Added on {formatDate(mostRecentLink.createdAt)}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No links added yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCard;
