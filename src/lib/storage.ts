// Chrome storage utility functions

export interface Link {
  id: string;
  title: string;
  url: string;
  tags: string[];
  createdAt: string;
}

// Get all links from Chrome storage
export const getLinks = (): Promise<Link[]> => {
  return new Promise((resolve) => {
    if (
      typeof window !== "undefined" &&
      typeof chrome !== "undefined" &&
      chrome.storage
    ) {
      chrome.storage.local.get(["links"], (result) => {
        resolve(result.links || []);
      });
    } else {
      // Fallback for development environment
      const storedLinks = localStorage.getItem("airdrop-links");
      resolve(storedLinks ? JSON.parse(storedLinks) : []);
    }
  });
};

// Save links to Chrome storage
export const saveLinks = (links: Link[]): Promise<void> => {
  return new Promise((resolve) => {
    if (
      typeof window !== "undefined" &&
      typeof chrome !== "undefined" &&
      chrome.storage
    ) {
      chrome.storage.local.set({ links }, () => {
        resolve();
      });
    } else {
      // Fallback for development environment
      localStorage.setItem("airdrop-links", JSON.stringify(links));
      resolve();
    }
  });
};

// Add a new link
export const addLink = async (
  url: string,
  title: string,
  tags: string[] = ["new"],
): Promise<Link> => {
  const links = await getLinks();

  const newLink: Link = {
    id: Date.now().toString(),
    url,
    title,
    tags,
    createdAt: new Date().toISOString(),
  };

  await saveLinks([...links, newLink]);
  return newLink;
};

// Delete a link by ID
export const deleteLink = async (id: string): Promise<void> => {
  const links = await getLinks();
  const updatedLinks = links.filter((link) => link.id !== id);
  await saveLinks(updatedLinks);
};

// Update a link
export const updateLink = async (updatedLink: Link): Promise<void> => {
  const links = await getLinks();
  const updatedLinks = links.map((link) =>
    link.id === updatedLink.id ? updatedLink : link,
  );
  await saveLinks(updatedLinks);
};

// Delete multiple links by IDs
export const deleteLinks = async (ids: string[]): Promise<void> => {
  const links = await getLinks();
  const updatedLinks = links.filter((link) => !ids.includes(link.id));
  await saveLinks(updatedLinks);
};

// Add a tag to multiple links
export const addTagToLinks = async (
  ids: string[],
  tag: string,
): Promise<void> => {
  const links = await getLinks();
  const updatedLinks = links.map((link) => {
    if (ids.includes(link.id) && !link.tags.includes(tag)) {
      return {
        ...link,
        tags: [...link.tags, tag],
      };
    }
    return link;
  });
  await saveLinks(updatedLinks);
};

// Export links to JSON file
export const exportLinks = async (): Promise<string> => {
  const links = await getLinks();
  return JSON.stringify(links, null, 2);
};

// Import links from JSON
export const importLinks = async (jsonData: string): Promise<void> => {
  try {
    const importedLinks = JSON.parse(jsonData);
    if (!Array.isArray(importedLinks)) {
      throw new Error("Invalid format");
    }
    await saveLinks(importedLinks);
  } catch (error) {
    throw new Error("Failed to import links: Invalid JSON format");
  }
};
