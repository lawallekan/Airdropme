import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { BookmarkPlus, ExternalLink, Tag, Link2 } from "lucide-react";
import { Badge } from "./ui/badge";

interface ContextMenuSimulatorProps {
  onSaveLink?: (url: string, title: string) => void;
  onOpenLink?: (url: string) => void;
  onAddTag?: (url: string, tag: string) => void;
  onCopyLink?: (url: string) => void;
}

const ContextMenuSimulator = ({
  onSaveLink = () => {},
  onOpenLink = () => {},
  onAddTag = () => {},
  onCopyLink = () => {},
}: ContextMenuSimulatorProps) => {
  const [demoLinks] = useState([
    {
      url: "https://example.com/airdrop-opportunity",
      title: "New Crypto Airdrop Opportunity",
    },
    {
      url: "https://example.com/nft-whitelist",
      title: "Exclusive NFT Whitelist",
    },
    {
      url: "https://example.com/defi-staking",
      title: "High APY DeFi Staking",
    },
  ]);

  const [savedLinks, setSavedLinks] = useState<string[]>([]);

  const handleSaveLink = (url: string, title: string) => {
    if (!savedLinks.includes(url)) {
      setSavedLinks([...savedLinks, url]);
      onSaveLink(url, title);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-medium">Context Menu Simulator</h3>
        <p className="text-sm text-gray-500">
          Right-click on any link below to see the extension context menu
        </p>
      </div>

      <div className="space-y-4">
        {demoLinks.map((link) => (
          <div key={link.url} className="flex items-center justify-between">
            <ContextMenu>
              <ContextMenuTrigger asChild>
                <div className="flex-1 cursor-pointer">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {link.title}
                  </a>
                  <p className="text-xs text-gray-500 truncate">{link.url}</p>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-64">
                <ContextMenuItem
                  onClick={() => handleSaveLink(link.url, link.title)}
                  className="cursor-pointer"
                >
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  <span>Save to Airdrop Linker</span>
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => onOpenLink(link.url)}
                  className="cursor-pointer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>Open Link</span>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem
                  onClick={() => onAddTag(link.url, "Airdrop")}
                  className="cursor-pointer"
                >
                  <Tag className="mr-2 h-4 w-4" />
                  <span>Add Tag</span>
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => onCopyLink(link.url)}
                  className="cursor-pointer"
                >
                  <Link2 className="mr-2 h-4 w-4" />
                  <span>Copy Link</span>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>

            {savedLinks.includes(link.url) && (
              <Badge variant="outline" className="ml-2">
                Saved
              </Badge>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200">
        <h4 className="text-sm font-medium mb-2">How to use:</h4>
        <ol className="text-xs text-gray-600 space-y-1 list-decimal pl-4">
          <li>Right-click on any link above</li>
          <li>Select "Save to Airdrop Linker" from the context menu</li>
          <li>The link will be saved to your collection</li>
          <li>Access all saved links from the extension popup</li>
        </ol>
      </div>

      <div className="mt-4 text-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSavedLinks([])}
          className="text-xs"
        >
          Reset Demo
        </Button>
      </div>
    </div>
  );
};

export default ContextMenuSimulator;
