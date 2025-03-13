import React, { useState, useEffect } from "react";
import LinksList from "./LinksList";
import ActionBar from "./ActionBar";
import FilterBar from "./FilterBar";
import ImportExport from "./ImportExport";
import { Settings, Plus, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Link } from "../lib/storage";
import AddLinkDialog, { AddLinkButton } from "./AddLinkDialog";
import LoadingState from "./LoadingState";
import StatsCard from "./StatsCard";

interface DashboardProps {
  links?: Link[];
  onOpenSettings?: () => void;
  onEditLink?: (link: Link) => void;
  onDeleteLink?: (id: string) => void;
  onDeleteSelected?: (ids: string[]) => void;
  onOpenSelected?: (ids: string[]) => void;
  onOpenAll?: () => void;
  onTagSelected?: (ids: string[], tag: string) => void;
  onExport?: () => void;
  onImport?: (links: any) => void;
}

const Dashboard = ({
  links = [],
  onOpenSettings = () => {},
  onEditLink = () => {},
  onDeleteLink = () => {},
  onDeleteSelected = () => {},
  onOpenSelected = () => {},
  onOpenAll = () => {},
  onTagSelected = () => {},
  onExport = () => {},
  onImport = () => {},
}: DashboardProps) => {
  const [selectedLinks, setSelectedLinks] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [addLinkDialogOpen, setAddLinkDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get all unique tags from links
  const availableTags = Array.from(
    new Set(links.flatMap((link) => link.tags)),
  ).sort();

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter links based on search query and tag filters
  const filteredLinks = links.filter((link) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.url.toLowerCase().includes(searchQuery.toLowerCase());

    // Tag filter
    const matchesTags =
      tagFilters.length === 0 ||
      tagFilters.some((tag) => link.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  const handleSelectLink = (id: string, selected: boolean) => {
    const newSelected = new Set(selectedLinks);
    if (selected) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedLinks(newSelected);
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedLinks(new Set(filteredLinks.map((link) => link.id)));
    } else {
      setSelectedLinks(new Set());
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTagFilter = (tags: string[]) => {
    setTagFilters(tags);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setTagFilters([]);
  };

  const handleOpenSelectedLinks = () => {
    onOpenSelected(Array.from(selectedLinks));
  };

  const handleOpenAllLinks = () => {
    onOpenAll();
  };

  const handleDeleteSelectedLinks = () => {
    onDeleteSelected(Array.from(selectedLinks));
    setSelectedLinks(new Set());
  };

  const handleTagSelectedLinks = (tag: string) => {
    onTagSelected(Array.from(selectedLinks), tag);
    setTagDialogOpen(false);
  };

  const handleTagLink = (id: string, tag: string) => {
    onTagSelected([id], tag);
  };

  const handleImportLinks = (importedLinks: any) => {
    onImport(importedLinks);
  };

  const handleAddLink = (linkData: { title: string; url: string }) => {
    // Call the parent component's handler to add the link
    onImport({
      title: linkData.title,
      url: linkData.url,
    });
    setAddLinkDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col w-full max-w-5xl mx-auto p-6 bg-card rounded-lg shadow-md border dark:border-gray-700 dark:shadow-gray-900/20">
        <LoadingState />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto p-6 bg-card rounded-lg shadow-md border dark:border-gray-700 dark:shadow-gray-900/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">Your Links</h2>
          <Sparkles className="h-4 w-4 text-yellow-500" />
        </div>
        <div className="flex items-center gap-2">
          <AddLinkButton onClick={() => setAddLinkDialogOpen(true)} />
          <Button variant="ghost" size="icon" onClick={onOpenSettings}>
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>

      <StatsCard links={links} />

      <ActionBar
        selectedCount={selectedLinks.size}
        totalCount={filteredLinks.length}
        onOpenSelected={handleOpenSelectedLinks}
        onOpenAll={handleOpenAllLinks}
        onDeleteSelected={handleDeleteSelectedLinks}
        onSettings={onOpenSettings}
        onTagSelected={() => setTagDialogOpen(true)}
        onExport={onExport}
        onImport={onImport}
      />

      <div className="my-4">
        <FilterBar
          onSearch={handleSearch}
          onTagFilter={handleTagFilter}
          onClearFilters={handleClearFilters}
          availableTags={availableTags}
        />
      </div>

      <div className="flex-1 my-4">
        <LinksList
          links={filteredLinks}
          onSelectLink={handleSelectLink}
          onSelectAll={handleSelectAll}
          onEditLink={onEditLink}
          onDeleteLink={onDeleteLink}
          onTagLink={handleTagLink}
        />
      </div>

      <ImportExport links={links} onImport={handleImportLinks} />

      {/* Tag Selection Dialog */}
      <Dialog open={tagDialogOpen} onOpenChange={setTagDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Tag to Selected Links</DialogTitle>
            <DialogDescription>
              Choose a tag to add to the {selectedLinks.size} selected links.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 gap-2">
              {availableTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  onClick={() => setSelectedTag(tag)}
                  className="text-sm"
                >
                  {tag}
                </Button>
              ))}
              <input
                type="text"
                placeholder="New tag..."
                value={
                  selectedTag === "" || availableTags.includes(selectedTag)
                    ? ""
                    : selectedTag
                }
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-3 py-2 border rounded-md col-span-4 mt-2"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setTagDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => handleTagSelectedLinks(selectedTag)}
              disabled={!selectedTag}
            >
              Add Tag
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Link Dialog */}
      <AddLinkDialog
        open={addLinkDialogOpen}
        onOpenChange={setAddLinkDialogOpen}
        onSave={handleAddLink}
        onCancel={() => setAddLinkDialogOpen(false)}
        defaultTag="Airdrop"
      />
    </div>
  );
};

export default Dashboard;
