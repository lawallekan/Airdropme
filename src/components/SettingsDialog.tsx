import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Settings, Save } from "lucide-react";

interface SettingsDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSave?: (settings: SettingsData) => void;
  defaultSettings?: SettingsData;
}

interface SettingsData {
  maxTabsToOpen: number;
  defaultTag: string;
  autoBackup: boolean;
  backupFrequency: number; // days
  notificationsEnabled: boolean;
  confirmBeforeOpening: boolean;
}

const SettingsDialog = ({
  open = true,
  onOpenChange = () => {},
  onSave = () => {},
  defaultSettings = {
    maxTabsToOpen: 10,
    defaultTag: "Airdrop",
    autoBackup: false,
    backupFrequency: 7,
    notificationsEnabled: true,
    confirmBeforeOpening: true,
  },
}: SettingsDialogProps) => {
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);

  const handleSave = () => {
    onSave(settings);
    onOpenChange(false);
  };

  const handleChange = (key: keyof SettingsData, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>Extension Settings</DialogTitle>
          <DialogDescription>
            Configure your preferences for the Airdrop Linker extension.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="maxTabs" className="text-right">
              Max Tabs
            </Label>
            <div className="col-span-3">
              <Input
                id="maxTabs"
                type="number"
                min="1"
                max="50"
                value={settings.maxTabsToOpen}
                onChange={(e) =>
                  handleChange("maxTabsToOpen", parseInt(e.target.value) || 1)
                }
              />
              <p className="text-xs text-gray-500 mt-1">
                Maximum number of tabs to open at once (1-50)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="defaultTag" className="text-right">
              Default Tag
            </Label>
            <div className="col-span-3">
              <Select
                value={settings.defaultTag}
                onValueChange={(value) => handleChange("defaultTag", value)}
              >
                <SelectTrigger id="defaultTag">
                  <SelectValue placeholder="Select a default tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Airdrop">Airdrop</SelectItem>
                  <SelectItem value="NFT">NFT</SelectItem>
                  <SelectItem value="DeFi">DeFi</SelectItem>
                  <SelectItem value="GameFi">GameFi</SelectItem>
                  <SelectItem value="Social">Social</SelectItem>
                  <SelectItem value="Important">Important</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                Default tag applied to new links
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="autoBackup" className="text-right">
              Auto Backup
            </Label>
            <div className="col-span-3 flex items-center space-x-2">
              <Switch
                id="autoBackup"
                checked={settings.autoBackup}
                onCheckedChange={(checked) =>
                  handleChange("autoBackup", checked)
                }
              />
              <span className="text-sm">
                {settings.autoBackup ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>

          {settings.autoBackup && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="backupFrequency" className="text-right">
                Backup Every
              </Label>
              <div className="col-span-3">
                <div className="flex items-center space-x-2">
                  <Slider
                    id="backupFrequency"
                    min={1}
                    max={30}
                    step={1}
                    value={[settings.backupFrequency]}
                    onValueChange={(value) =>
                      handleChange("backupFrequency", value[0])
                    }
                    className="w-full"
                  />
                  <span className="w-12 text-center">
                    {settings.backupFrequency}{" "}
                    {settings.backupFrequency === 1 ? "day" : "days"}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notifications" className="text-right">
              Notifications
            </Label>
            <div className="col-span-3 flex items-center space-x-2">
              <Switch
                id="notifications"
                checked={settings.notificationsEnabled}
                onCheckedChange={(checked) =>
                  handleChange("notificationsEnabled", checked)
                }
              />
              <span className="text-sm">
                {settings.notificationsEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirmOpening" className="text-right">
              Confirm Opening
            </Label>
            <div className="col-span-3 flex items-center space-x-2">
              <Switch
                id="confirmOpening"
                checked={settings.confirmBeforeOpening}
                onCheckedChange={(checked) =>
                  handleChange("confirmBeforeOpening", checked)
                }
              />
              <span className="text-sm">
                {settings.confirmBeforeOpening
                  ? "Ask before opening multiple tabs"
                  : "Open tabs without confirmation"}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
