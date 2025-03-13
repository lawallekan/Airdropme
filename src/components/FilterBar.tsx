import React, { useState } from "react";
import { Search, Tag, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FilterBarProps {
  onSearch?: (query: string) => void;
  onTagFilter?: (tags: string[]) => void;
  onClearFilters?: () => void;
  availableTags?: string[];
}

const FilterBar = ({
  onSearch = () => {},
  onTagFilter = () => {},
  onClearFilters = () => {},
  availableTags = ["Airdrop", "NFT", "DeFi", "GameFi", "Social", "Important"],
}: FilterBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
      onTagFilter(newTags);
    }
  };

  const handleTagRemove = (tag: string) => {
    const newTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(newTags);
    onTagFilter(newTags);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    onClearFilters();
  };

  return (
    <div className="w-full bg-card p-4 rounded-md shadow-sm border">
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Input
            type="text"
            placeholder="Search links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1.5 h-6 w-6"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </form>

        <div className="flex gap-2 items-center min-w-[200px]">
          <Select onValueChange={handleTagSelect}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent>
              {availableTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
            className="whitespace-nowrap"
          >
            Clear filters
          </Button>
        </div>
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="flex items-center gap-1"
            >
              <Tag className="h-3 w-3" />
              {tag}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => handleTagRemove(tag)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
