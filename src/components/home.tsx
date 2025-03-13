import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import SettingsDialog from "./SettingsDialog";
import LinkEditDialog from "./LinkEditDialog";
import Header from "./Header";
import Footer from "./Footer";
import { Sparkles } from "lucide-react";

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

    // For web app, we'll use localStorage events
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "airdrop-links" || e.key === null) {
        loadLinks();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
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
    localStorage.setItem("airdrop-settings", JSON.stringify(newSettings));
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

  const handleAddNewLink = async (linkData: { title: string; url: string }) => {
    try {
      const newLink = await addLink(linkData.url, linkData.title, [
        settings.defaultTag,
      ]);
      setLinks((prevLinks) => [...prevLinks, newLink]);
      toast({
        title: "Link Added",
        description: `"${linkData.title}" has been added to your collection`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add the link",
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
    // Check if this is a single link being added manually
    if (
      importedLinks &&
      typeof importedLinks === "object" &&
      !Array.isArray(importedLinks) &&
      importedLinks.url
    ) {
      return handleAddNewLink(importedLinks);
    }

    // Otherwise, proceed with normal import
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
    <div className="min-h-screen flex flex-col bg-background">
      <Header onOpenSettings={handleOpenSettings} />

      <main className="flex-1 container py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-8">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text inline-block">
                Airdrop Linker
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Collect, organize, and batch-open links for airdrop farming and
                web3 opportunities.
              </p>
              <div className="flex justify-center gap-2 mt-4">
                <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-600/30">
                  <Sparkles className="mr-1 h-3 w-3" /> Crypto
                </span>
                <span className="inline-flex items-center rounded-md bg-purple-50 dark:bg-purple-900/30 px-2 py-1 text-xs font-medium text-purple-700 dark:text-purple-300 ring-1 ring-inset ring-purple-700/10 dark:ring-purple-600/30">
                  <Sparkles className="mr-1 h-3 w-3" /> NFTs
                </span>
                <span className="inline-flex items-center rounded-md bg-green-50 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300 ring-1 ring-inset ring-green-700/10 dark:ring-green-600/30">
                  <Sparkles className="mr-1 h-3 w-3" /> DeFi
                </span>
              </div>
            </div>

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

            <div className="bg-card p-8 rounded-lg shadow-sm border max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4">
                About Airdrop Linker
              </h2>
              <p className="text-muted-foreground mb-6">
                Airdrop Linker is a powerful web application designed to help
                you collect, organize, and batch-open links for airdrop farming
                and other web3 opportunities.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Key Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Save links with custom titles and tags</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Organize links with tags and categories</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Batch open multiple links with a single click</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Export and import your link collections</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Benefits</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Save time with batch link opening</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Keep your airdrop opportunities organized</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Never miss an important airdrop again</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Customize settings to match your workflow</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

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
