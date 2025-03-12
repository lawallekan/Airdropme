import React, { useState } from "react";
import { Download, Upload, FileJson } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

interface ImportExportProps {
  links?: Array<{
    id: string;
    url: string;
    title: string;
    tags?: string[];
    createdAt: string;
  }>;
  onImport?: (links: any[]) => void;
}

const ImportExport = ({
  links = [
    {
      id: "1",
      url: "https://example.com/airdrop1",
      title: "Example Airdrop 1",
      tags: ["crypto", "new"],
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      url: "https://example.com/airdrop2",
      title: "Example Airdrop 2",
      tags: ["defi"],
      createdAt: new Date().toISOString(),
    },
  ],
  onImport = () => {},
}: ImportExportProps) => {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importData, setImportData] = useState("");
  const [importError, setImportError] = useState("");

  const handleExport = () => {
    // Create a JSON file with the links data
    const dataStr = JSON.stringify(links, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    // Create a download link and trigger it
    const exportFileDefaultName = `airdrop-links-${new Date().toISOString().split("T")[0]}.json`;
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = () => {
    try {
      // Parse the JSON data
      const parsedData = JSON.parse(importData);

      // Basic validation
      if (!Array.isArray(parsedData)) {
        setImportError("Invalid format: Data must be an array of links");
        return;
      }

      // Process the import
      onImport(parsedData);
      setIsImportDialogOpen(false);
      setImportData("");
      setImportError("");
    } catch (error) {
      setImportError("Invalid JSON format");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setImportData(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center justify-between w-full p-3 bg-white border-t border-gray-200 rounded-b-md">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleExport}
        >
          <Download size={16} />
          Export Links
        </Button>

        <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Upload size={16} />
              Import Links
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Import Links</DialogTitle>
              <DialogDescription>
                Upload a JSON file containing your link collection or paste the
                JSON data below.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <FileJson size={24} />
                <Input type="file" accept=".json" onChange={handleFileUpload} />
              </div>

              <div>
                <label
                  htmlFor="json-input"
                  className="block text-sm font-medium mb-2"
                >
                  Or paste JSON data:
                </label>
                <textarea
                  id="json-input"
                  rows={5}
                  className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  placeholder='{"links": [...]}'
                />
              </div>

              {importError && (
                <div className="text-red-500 text-sm">{importError}</div>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsImportDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleImport}>Import</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="text-xs text-gray-500">
        {links.length} links in collection
      </div>
    </div>
  );
};

export default ImportExport;
