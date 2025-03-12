import React, { useState } from "react";
import Dashboard from "./Dashboard";
import SettingsDialog from "./SettingsDialog";
import LinkEditDialog from "./LinkEditDialog";
import ContextMenuSimulator from "./ContextMenuSimulator";

interface Link {
  id: string;
  title: string;
  url: string;
  tags: string[];
  createdAt: string;
}

const Home = () => {
  const [links, setLinks] = useState<Link[]>([
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
  ]);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEditLinkOpen, setIsEditLinkOpen] = useState(false);
  const [currentEditLink, setCurrentEditLink] = useState<Link | null>(null);

  // Get all unique tags from links
  const availableTags = Array.from(
    new Set(links.flatMap((link) => link.tags)),
  ).sort();

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleSaveSettings = (settings: any) => {
    console.log("Saving settings:", settings);
    setIsSettingsOpen(false);
  };

  const handleEditLink = (link: Link) => {
    setCurrentEditLink(link);
    setIsEditLinkOpen(true);
  };

  const handleSaveLink = (updatedLink: Link) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === updatedLink.id ? updatedLink : link,
      ),
    );
    setIsEditLinkOpen(false);
  };

  const handleDeleteLink = (id: string) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
  };

  const handleSaveContextMenuLink = (url: string, title: string) => {
    const newLink: Link = {
      id: Date.now().toString(),
      title,
      url,
      tags: ["new"],
      createdAt: new Date().toISOString(),
    };
    setLinks((prevLinks) => [...prevLinks, newLink]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Airdrop Linker Extension
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Dashboard
              links={links}
              onOpenSettings={handleOpenSettings}
              onEditLink={handleEditLink}
              onDeleteLink={handleDeleteLink}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Context Menu Demo
                </h2>
                <ContextMenuSimulator
                  onSaveLink={handleSaveContextMenuLink}
                  onOpenLink={(url) => window.open(url, "_blank")}
                  onAddTag={(url, tag) => console.log("Add tag", url, tag)}
                  onCopyLink={(url) => {
                    navigator.clipboard.writeText(url);
                    console.log("Copied to clipboard", url);
                  }}
                />
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  About Airdrop Linker
                </h2>
                <p className="text-gray-600 mb-4">
                  Airdrop Linker is a Chrome extension designed to help you
                  collect, organize, and batch-open links for airdrop farming
                  and other web3 opportunities.
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Save links directly from the context menu</li>
                  <li>Organize links with tags and categories</li>
                  <li>Batch open multiple links with a single click</li>
                  <li>Export and import your link collections</li>
                  <li>Customize settings to match your workflow</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <SettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        onSave={handleSaveSettings}
      />

      {currentEditLink && (
        <LinkEditDialog
          open={isEditLinkOpen}
          onOpenChange={setIsEditLinkOpen}
          link={currentEditLink}
          availableTags={availableTags}
          onSave={handleSaveLink}
          onCancel={() => setIsEditLinkOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;
