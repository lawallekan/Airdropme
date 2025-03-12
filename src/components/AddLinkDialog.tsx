import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Link as LinkIcon, Plus } from "lucide-react";

interface AddLinkDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSave?: (link: { title: string; url: string }) => void;
  onCancel?: () => void;
  defaultTag?: string;
}

const AddLinkDialog = ({
  open = false,
  onOpenChange = () => {},
  onSave = () => {},
  onCancel = () => {},
  defaultTag = "Airdrop",
}: AddLinkDialogProps) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState<{ title?: string; url?: string }>({});

  const handleSave = () => {
    // Validate inputs
    const newErrors: { title?: string; url?: string } = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!url.trim()) {
      newErrors.url = "URL is required";
    } else if (!isValidUrl(url)) {
      newErrors.url = "Please enter a valid URL";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and save
    setErrors({});
    onSave({
      title,
      url: ensureHttpPrefix(url),
    });

    // Reset form
    setTitle("");
    setUrl("");
  };

  const isValidUrl = (urlString: string) => {
    try {
      // Add http:// prefix if missing to make URL constructor work
      const urlToCheck = ensureHttpPrefix(urlString);
      new URL(urlToCheck);
      return true;
    } catch (e) {
      return false;
    }
  };

  const ensureHttpPrefix = (urlString: string) => {
    if (!/^https?:\/\//i.test(urlString)) {
      return `https://${urlString}`;
    }
    return urlString;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Link</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <div className="col-span-3">
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter link title"
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              URL
            </Label>
            <div className="col-span-3">
              <div className="relative">
                <Input
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className={`pl-9 ${errors.url ? "border-red-500" : ""}`}
                />
                <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              {errors.url && (
                <p className="text-red-500 text-xs mt-1">{errors.url}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                The link will be saved with the default tag: {defaultTag}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSave}>
            Add Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddLinkDialog;

export const AddLinkButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      <Plus className="h-4 w-4" />
      Add Link
    </Button>
  );
};
