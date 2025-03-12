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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tag, X, Link as LinkIcon } from "lucide-react";

interface LinkEditDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  link?: {
    id: string;
    title: string;
    url: string;
    tags: string[];
  };
  availableTags?: string[];
  onSave?: (link: {
    id: string;
    title: string;
    url: string;
    tags: string[];
  }) => void;
  onCancel?: () => void;
}

const LinkEditDialog = ({
  open = true,
  onOpenChange = () => {},
  link = {
    id: "1",
    title: "Example Airdrop",
    url: "https://example.com/airdrop",
    tags: ["crypto", "defi"],
  },
  availableTags = ["crypto", "nft", "defi", "gamefi", "metaverse", "important"],
  onSave = () => {},
  onCancel = () => {},
}: LinkEditDialogProps) => {
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);
  const [tags, setTags] = useState<string[]>(link.tags);
  const [newTag, setNewTag] = useState("");
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
      id: link.id,
      title,
      url,
      tags,
    });
    onOpenChange(false);
  };

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
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
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="tags" className="text-right pt-2">
              Tags
            </Label>
            <div className="col-span-3 space-y-2">
              <div className="flex gap-2">
                <Select
                  onValueChange={(value) => handleAddTag(value)}
                  value={newTag}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Add a tag" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTags
                      .filter((tag) => !tags.includes(tag))
                      .map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                    >
                      <Tag className="h-3 w-3" />
                      <span>{tag}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1 hover:bg-secondary/80"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
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
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LinkEditDialog;
