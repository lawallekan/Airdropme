import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash, Tag } from "lucide-react";

interface Link {
  id: string;
  title: string;
  url: string;
  tags: string[];
  createdAt: string;
}

interface LinksListProps {
  links?: Link[];
  onSelectLink?: (id: string, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
  onEditLink?: (link: Link) => void;
  onDeleteLink?: (id: string) => void;
  onTagLink?: (id: string, tag: string) => void;
}

const LinksList = ({
  links = [
    {
      id: "1",
      title: "Crypto Airdrop Opportunity",
      url: "https://example.com/airdrop1",
      tags: ["crypto", "high-priority"],
      createdAt: "2023-05-15T10:30:00Z",
    },
    {
      id: "2",
      title: "NFT Project Whitelist",
      url: "https://example.com/nft-whitelist",
      tags: ["nft"],
      createdAt: "2023-05-16T14:20:00Z",
    },
    {
      id: "3",
      title: "DeFi Staking Rewards",
      url: "https://example.com/defi-staking",
      tags: ["defi", "finance"],
      createdAt: "2023-05-17T09:15:00Z",
    },
    {
      id: "4",
      title: "Web3 Gaming Token",
      url: "https://example.com/web3-gaming",
      tags: ["gaming", "web3"],
      createdAt: "2023-05-18T16:45:00Z",
    },
    {
      id: "5",
      title: "Metaverse Land Sale",
      url: "https://example.com/metaverse-land",
      tags: ["metaverse", "nft"],
      createdAt: "2023-05-19T11:10:00Z",
    },
  ],
  onSelectLink = () => {},
  onSelectAll = () => {},
  onEditLink = () => {},
  onDeleteLink = () => {},
  onTagLink = () => {},
}: LinksListProps) => {
  const [selectedLinks, setSelectedLinks] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectLink = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedLinks);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedLinks(newSelected);
    onSelectLink(id, checked);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedLinks(new Set(links.map((link) => link.id)));
    } else {
      setSelectedLinks(new Set());
    }
    onSelectAll(checked);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="w-full bg-white rounded-md shadow-sm border border-gray-200">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="select-all"
              checked={selectAll}
              onCheckedChange={(checked) => handleSelectAll(!!checked)}
            />
            <label htmlFor="select-all" className="text-sm font-medium">
              Select All
            </label>
          </div>
          <div className="text-sm text-gray-500">
            {selectedLinks.size} of {links.length} selected
          </div>
        </div>

        <div className="space-y-2">
          {links.map((link) => (
            <div
              key={link.id}
              className="flex items-center justify-between p-3 rounded-md border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3 flex-1">
                <Checkbox
                  id={`link-${link.id}`}
                  checked={selectedLinks.has(link.id)}
                  onCheckedChange={(checked) =>
                    handleSelectLink(link.id, !!checked)
                  }
                />
                <div className="flex flex-col">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {link.title}
                  </a>
                  <span className="text-xs text-gray-500 truncate max-w-md">
                    {link.url}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {link.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {formatDate(link.createdAt)}
                </span>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditLink(link)}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onTagLink(link.id, "new-tag")}
                    >
                      <Tag className="mr-2 h-4 w-4" />
                      <span>Add Tag</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDeleteLink(link.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
        <div className="flex flex-1 justify-between sm:hidden">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{links.length}</span> of{" "}
              <span className="font-medium">{links.length}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <Button variant="outline" size="sm" className="rounded-l-md">
                Previous
              </Button>
              <Button variant="outline" size="sm" className="rounded-r-md">
                Next
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinksList;
