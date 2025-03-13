import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Settings, Bell, Database, Maximize2, Tag } from "lucide-react";

interface SettingsDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSave?: (settings: SettingsType) => void;
  defaultSettings?: SettingsType;
}

interface SettingsType {
  maxTabsToOpen: number;
  defaultTag: string;
  autoBackup: boolean;
  backupFrequency: number;
  notificationsEnabled: boolean;
  confirmBeforeOpening: boolean;
}

const SettingsDialog = ({
  open = false,
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
  const [settings, setSettings] = useState<SettingsType>(defaultSettings);

  const handleSave = () => {
    onSave(settings);
    onOpenChange(false);
  };

  const handleReset = () => {
    setSettings({
      maxTabsToOpen: 10,
      defaultTag: "Airdrop",
      autoBackup: false,
      backupFrequency: 7,
      notificationsEnabled: true,
      confirmBeforeOpening: true,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </DialogTitle>
          <DialogDescription>
            Configure your Airdrop Linker preferences
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            {/* Maximum tabs to open */}
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex items-center gap-2 justify-end">
                <Maximize2 className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="maxTabs" className="text-right">
                  Max tabs to open
                </Label>
              </div>
              <div className="col-span-3">
                <Input
                  id="maxTabs"
                  type="number"
                  min="1"
                  max="50"
                  value={settings.maxTabsToOpen}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      maxTabsToOpen: parseInt(e.target.value) || 10,
                    })
                  }
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum number of tabs to open at once
                </p>
              </div>
            </div>

            {/* Default tag */}
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex items-center gap-2 justify-end">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="defaultTag" className="text-right">
                  Default tag
                </Label>
              </div>
              <div className="col-span-3">
                <Input
                  id="defaultTag"
                  value={settings.defaultTag}
                  onChange={(e) =>
                    setSettings({ ...settings, defaultTag: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Default tag applied to new links
                </p>
              </div>
            </div>

            {/* Confirm before opening */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirmOpening" className="text-right">
                Confirm before opening
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Switch
                  id="confirmOpening"
                  checked={settings.confirmBeforeOpening}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, confirmBeforeOpening: checked })
                  }
                />
                <Label htmlFor="confirmOpening" className="text-sm">
                  {settings.confirmBeforeOpening ? "Enabled" : "Disabled"}
                </Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            {/* Notifications */}
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex items-center gap-2 justify-end">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="notifications" className="text-right">
                  Notifications
                </Label>
              </div>
              <div className="col-span-3 flex items-center space-x-2">
                <Switch
                  id="notifications"
                  checked={settings.notificationsEnabled}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, notificationsEnabled: checked })
                  }
                />
                <Label htmlFor="notifications" className="text-sm">
                  {settings.notificationsEnabled ? "Enabled" : "Disabled"}
                </Label>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm">
                When notifications are enabled, you'll receive alerts for:
              </p>
              <ul className="mt-2 space-y-1 text-sm list-disc list-inside">
                <li>New links saved via context menu</li>
                <li>Batch operations completion</li>
                <li>Import/export success</li>
                <li>Backup status</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="backup" className="space-y-4">
            {/* Auto backup */}
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex items-center gap-2 justify-end">
                <Database className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="autoBackup" className="text-right">
                  Auto backup
                </Label>
              </div>
              <div className="col-span-3 flex items-center space-x-2">
                <Switch
                  id="autoBackup"
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, autoBackup: checked })
                  }
                />
                <Label htmlFor="autoBackup" className="text-sm">
                  {settings.autoBackup ? "Enabled" : "Disabled"}
                </Label>
              </div>
            </div>

            {/* Backup frequency */}
            {settings.autoBackup && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="backupFrequency" className="text-right">
                  Backup frequency
                </Label>
                <div className="col-span-3">
                  <div className="flex flex-col space-y-2">
                    <Slider
                      id="backupFrequency"
                      min={1}
                      max={30}
                      step={1}
                      value={[settings.backupFrequency]}
                      onValueChange={(value) =>
                        setSettings({ ...settings, backupFrequency: value[0] })
                      }
                    />
                    <div className="flex justify-between">
                      <span className="text-xs">1 day</span>
                      <span className="text-xs font-medium">
                        {settings.backupFrequency} days
                      </span>
                      <span className="text-xs">30 days</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm">
                Backups are stored locally in your browser's storage. You can
                also manually export your links collection at any time.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter className="flex justify-between mt-6">
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              Save Changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
