import React from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  ExternalLink,
  Trash2,
  FolderOpen,
  Settings,
  Tag,
  Download,
  Upload,
} from "lucide-react";

interface ActionBarProps {
  selectedCount?: number;
  totalCount?: number;
  onOpenSelected?: () => void;
  onOpenAll?: () => void;
  onDeleteSelected?: () => void;
  onSettings?: () => void;
  onTagSelected?: () => void;
  onExport?: () => void;
  onImport?: (data?: any) => void;
}

const ActionBar = ({
  selectedCount = 3,
  totalCount = 10,
  onOpenSelected = () => console.log("Open selected links"),
  onOpenAll = () => console.log("Open all links"),
  onDeleteSelected = () => console.log("Delete selected links"),
  onSettings = () => console.log("Open settings"),
  onTagSelected = () => console.log("Tag selected links"),
  onExport = () => console.log("Export links"),
  onImport = () => console.log("Import links"),
}: ActionBarProps) => {
  return (
    <div className="w-full bg-background border-b p-3 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="sm"
                onClick={onOpenSelected}
                disabled={selectedCount === 0}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Selected ({selectedCount})
              </Button>
            </TooltipTrigger>
            <TooltipContent>Open selected links in new tabs</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="sm" onClick={onOpenAll}>
                <FolderOpen className="mr-2 h-4 w-4" />
                Open All ({totalCount})
              </Button>
            </TooltipTrigger>
            <TooltipContent>Open all links in new tabs</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                onClick={onDeleteSelected}
                disabled={selectedCount === 0}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete selected links</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onTagSelected}
                disabled={selectedCount === 0}
              >
                <Tag className="mr-2 h-4 w-4" />
                Tag
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add tags to selected links</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={onExport}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </TooltipTrigger>
            <TooltipContent>Export links as JSON</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={onImport}>
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
            </TooltipTrigger>
            <TooltipContent>Import links from JSON</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipContent>Open settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ActionBar;
