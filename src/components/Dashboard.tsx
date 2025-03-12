import React, { useState } from "react";
import LinksList from "./LinksList";
import ActionBar from "./ActionBar";
import FilterBar from "./FilterBar";
import ImportExport from "./ImportExport";
import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface Link {
  id: string;
  title: string;
  url: string;
  tags: string[];
  createdAt: string;
}

interface DashboardProps {
  links?: Link[];
  onOpenSettings?: () => void;
}

const Dashboard = ({
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
  onOpenSettings = () => console.log("Open settings"),
}: DashboardProps) => {
  const [selectedLinks, setSelectedLinks] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Get all unique tags from links
  const availableTags = Array.from(
    new Set(links.flatMap((link) => link.tags)),
  ).sort();

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

  const handleOpenSelected = () => {
    // In a real implementation, this would open the selected links in new tabs
    console.log("Opening selected links:", Array.from(selectedLinks));
    filteredLinks
      .filter((link) => selectedLinks.has(link.id))
      .forEach((link) => {
        // This would actually open tabs in a real extension
        console.log(`Opening: ${link.title} - ${link.url}`);
      });
  };

  const handleOpenAll = () => {
    // In a real implementation, this would open all links in new tabs
    console.log("Opening all links");
    filteredLinks.forEach((link) => {
      // This would actually open tabs in a real extension
      console.log(`Opening: ${link.title} - ${link.url}`);
    });
  };

  const handleDeleteSelected = () => {
    // In a real implementation, this would delete the selected links
    console.log("Deleting selected links:", Array.from(selectedLinks));
    // After deletion, clear the selection
    setSelectedLinks(new Set());
  };

  const handleEditLink = (link: Link) => {
    // In a real implementation, this would open a dialog to edit the link
    console.log("Editing link:", link);
  };

  const handleDeleteLink = (id: string) => {
    // In a real implementation, this would delete the link
    console.log("Deleting link:", id);
  };

  const handleTagLink = (id: string, tag: string) => {
    // In a real implementation, this would add a tag to the link
    console.log("Adding tag to link:", id, tag);
  };

  const handleImport = (importedLinks: any[]) => {
    // In a real implementation, this would import the links
    console.log("Importing links:", importedLinks);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Airdrop Linker</h1>
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSettingsOpen(true)}
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>
              <DialogDescription>
                Configure your Airdrop Linker preferences.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-500">
                Settings panel would go here. Configure maximum tabs to open,
                default tag settings, and auto-backup options.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <ActionBar
        selectedCount={selectedLinks.size}
        totalCount={filteredLinks.length}
        onOpenSelected={handleOpenSelected}
        onOpenAll={handleOpenAll}
        onDeleteSelected={handleDeleteSelected}
        onSettings={() => setIsSettingsOpen(true)}
        onTagSelected={() => console.log("Tag selected")}
        onExport={() => console.log("Export links")}
        onImport={() => console.log("Import links")}
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
          onEditLink={handleEditLink}
          onDeleteLink={handleDeleteLink}
          onTagLink={handleTagLink}
        />
      </div>

      <ImportExport links={links} onImport={handleImport} />
    </div>
  );
};

export default Dashboard;
