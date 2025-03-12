import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import SettingsDialog from "./SettingsDialog";
import LinkEditDialog from "./LinkEditDialog";

import {
  getLinks,
  updateLink,
  deleteLink,
  addLink,
  addTagToLinks,
  deleteLinks,
  exportLinks,
  importLinks,
  Link,
} from "../lib/storage";
import { useToast } from "./ui/use-toast";

const Home = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEditLinkOpen, setIsEditLinkOpen] = useState(false);
  const [currentEditLink, setCurrentEditLink] = useState<Link | null>(null);
  const [settings, setSettings] = useState({
    maxTabsToOpen: 10,
    defaultTag: "Airdrop",
    autoBackup: false,
    backupFrequency: 7,
    notificationsEnabled: true,
    confirmBeforeOpening: true,
  });
  const { toast } = useToast();

  // Load links from storage on component mount
  useEffect(() => {
    const loadLinks = async () => {
      try {
        const storedLinks = await getLinks();
        setLinks(storedLinks);
      } catch (error) {
        console.error("Failed to load links:", error);
        toast({
          title: "Error",
          description: "Failed to load your saved links",
          variant: "destructive",
        });
      }
    };

    loadLinks();

    // Listen for storage changes (for when links are added via context menu)
    const handleStorageChange = () => {
      loadLinks();
    };

    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.onChanged.addListener(handleStorageChange);
      return () => chrome.storage.onChanged.removeListener(handleStorageChange);
    }

    return undefined;
  }, []);

  // Get all unique tags from links
  const availableTags = Array.from(
    new Set(links.flatMap((link) => link.tags)),
  ).sort();

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleSaveSettings = async (newSettings: any) => {
    setSettings(newSettings);
    // Save settings to storage
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.set({ settings: newSettings });
    } else {
      localStorage.setItem("airdrop-settings", JSON.stringify(newSettings));
    }
    setIsSettingsOpen(false);
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated",
    });
  };

  const handleEditLink = (link: Link) => {
    setCurrentEditLink(link);
    setIsEditLinkOpen(true);
  };

  const handleSaveLink = async (updatedLink: Link) => {
    try {
      await updateLink(updatedLink);
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === updatedLink.id ? updatedLink : link,
        ),
      );
      setIsEditLinkOpen(false);
      toast({
        title: "Link Updated",
        description: "The link has been successfully updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update the link",
        variant: "destructive",
      });
    }
  };

  const handleDeleteLink = async (id: string) => {
    try {
      await deleteLink(id);
      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
      toast({
        title: "Link Deleted",
        description: "The link has been removed from your collection",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the link",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSelected = async (ids: string[]) => {
    try {
      await deleteLinks(ids);
      setLinks((prevLinks) =>
        prevLinks.filter((link) => !ids.includes(link.id)),
      );
      toast({
        title: "Links Deleted",
        description: `${ids.length} links have been removed from your collection`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the selected links",
        variant: "destructive",
      });
    }
  };

  const handleTagSelected = async (ids: string[], tag: string) => {
    try {
      await addTagToLinks(ids, tag);
      // Refresh links
      const updatedLinks = await getLinks();
      setLinks(updatedLinks);
      toast({
        title: "Tags Added",
        description: `Tag "${tag}" has been added to ${ids.length} links`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add tags to the selected links",
        variant: "destructive",
      });
    }
  };

  const handleOpenSelected = (ids: string[]) => {
    const linksToOpen = links.filter((link) => ids.includes(link.id));
    const maxTabs = settings.maxTabsToOpen;

    if (linksToOpen.length > maxTabs && settings.confirmBeforeOpening) {
      if (
        !window.confirm(
          `You are about to open ${linksToOpen.length} tabs. Continue?`,
        )
      ) {
        return;
      }
    }

    // Open links in new tabs
    linksToOpen.forEach((link) => {
      window.open(link.url, "_blank");
    });

    toast({
      title: "Links Opened",
      description: `Opened ${linksToOpen.length} links in new tabs`,
    });
  };

  const handleOpenAll = () => {
    const maxTabs = settings.maxTabsToOpen;

    if (links.length > maxTabs && settings.confirmBeforeOpening) {
      if (
        !window.confirm(`You are about to open ${links.length} tabs. Continue?`)
      ) {
        return;
      }
    }

    // Open all links in new tabs
    links.forEach((link) => {
      window.open(link.url, "_blank");
    });

    toast({
      title: "All Links Opened",
      description: `Opened ${links.length} links in new tabs`,
    });
  };

  const handleExport = async () => {
    try {
      const jsonData = await exportLinks();

      // Create a download link
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `airdrop-links-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: "Your links have been exported to a JSON file",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your links",
        variant: "destructive",
      });
    }
  };

  const handleImport = async (importedLinks: any) => {
    try {
      let jsonData;
      if (typeof importedLinks === "string") {
        jsonData = importedLinks;
      } else if (Array.isArray(importedLinks)) {
        jsonData = JSON.stringify(importedLinks);
      } else {
        throw new Error("Invalid import format");
      }

      await importLinks(jsonData);
      const refreshedLinks = await getLinks();
      setLinks(refreshedLinks);

      toast({
        title: "Import Successful",
        description: "Your links have been imported",
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description:
          "There was an error importing your links. Please check the file format.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Airdrop Linker Extension
        </h1>

        <div className="grid grid-cols-1 gap-8">
          <div>
            <Dashboard
              links={links}
              onOpenSettings={handleOpenSettings}
              onEditLink={handleEditLink}
              onDeleteLink={handleDeleteLink}
              onDeleteSelected={handleDeleteSelected}
              onOpenSelected={handleOpenSelected}
              onOpenAll={handleOpenAll}
              onTagSelected={handleTagSelected}
              onExport={handleExport}
              onImport={handleImport}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              About Airdrop Linker
            </h2>
            <p className="text-gray-600 mb-4">
              Airdrop Linker is a Chrome extension designed to help you collect,
              organize, and batch-open links for airdrop farming and other web3
              opportunities.
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

      {/* Dialogs */}
      <SettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        onSave={handleSaveSettings}
        defaultSettings={settings}
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
