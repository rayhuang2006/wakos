import type { FileSystemItem } from '../types';

export const initialFileSystem: FileSystemItem = {
  id: 'root',
  name: '/',
  type: 'folder',
  children: [
    {
      id: 'documents',
      name: 'Documents',
      type: 'folder',
      parentId: 'root',
      children: [
        {
          id: 'hello-txt',
          name: 'hello.txt',
          type: 'file',
          parentId: 'documents',
          content: 'Hello from the web!',
        },
      ],
    },
    {
      id: 'downloads',
      name: 'Downloads',
      type: 'folder',
      parentId: 'root',
      children: [],
    },
    {
      id: 'applications',
      name: 'Applications',
      type: 'folder',
      parentId: 'root',
      children: [],
    },
    {
      id: 'trash',
      name: '.Trash',
      type: 'folder',
      parentId: 'root',
      children: [],
    },
  ],
};

export function findItemByPath(root: FileSystemItem, path: string): FileSystemItem | null {
  if (path === '/' || path === '') return root;
  
  const parts = path.split('/').filter(p => p);
  let current = root;
  
  for (const part of parts) {
    const child = current.children?.find(c => c.name === part);
    if (!child) return null;
    current = child;
  }
  
  return current;
}

export function getPathForItem(root: FileSystemItem, itemId: string): string {
  function search(item: FileSystemItem, path: string): string | null {
    if (item.id === itemId) return path;
    
    if (item.children) {
      for (const child of item.children) {
        const result = search(child, `${path}/${child.name}`);
        if (result) return result;
      }
    }
    
    return null;
  }
  
  const result = search(root, '');
  return result || '/';
}

export function createFolder(root: FileSystemItem, path: string, folderName: string): FileSystemItem {
  const parent = findItemByPath(root, path);
  if (!parent || parent.type !== 'folder') return root;
  
  const newFolder: FileSystemItem = {
    id: `folder-${Date.now()}-${Math.random()}`,
    name: folderName,
    type: 'folder',
    parentId: parent.id,
    children: [],
  };
  
  parent.children = [...(parent.children || []), newFolder];
  return { ...root };
}

export function createFile(root: FileSystemItem, path: string, fileName: string, content = ''): FileSystemItem {
  const parent = findItemByPath(root, path);
  if (!parent || parent.type !== 'folder') return root;
  
  const newFile: FileSystemItem = {
    id: `file-${Date.now()}-${Math.random()}`,
    name: fileName,
    type: 'file',
    parentId: parent.id,
    content,
  };
  
  parent.children = [...(parent.children || []), newFile];
  return { ...root };
}

export function renameItem(root: FileSystemItem, path: string, newName: string): FileSystemItem {
  const item = findItemByPath(root, path);
  if (!item) return root;
  
  item.name = newName;
  return { ...root };
}

export function deleteItem(root: FileSystemItem, path: string): FileSystemItem {
  const parts = path.split('/').filter(p => p);
  if (parts.length === 0) return root; // Can't delete root
  
  const parentPath = '/' + parts.slice(0, -1).join('/');
  const parent = findItemByPath(root, parentPath);
  const itemName = parts[parts.length - 1];
  
  if (!parent || !parent.children) return root;
  
  const itemIndex = parent.children.findIndex(c => c.name === itemName);
  if (itemIndex === -1) return root;
  
  const [deletedItem] = parent.children.splice(itemIndex, 1);
  
  // Move to trash
  const trash = findItemByPath(root, '/.Trash');
  if (trash && trash.children) {
    // Prevent name collisions
    let newName = deletedItem.name;
    let counter = 1;
    while (trash.children.find(c => c.name === newName)) {
      newName = `${deletedItem.name} (${counter++})`;
    }
    deletedItem.name = newName;
    trash.children.push(deletedItem);
  }
  
  return { ...root };
}

export function emptyTrash(root: FileSystemItem): FileSystemItem {
  const trash = findItemByPath(root, '/.Trash');
  if (trash && trash.type === 'folder') {
    trash.children = [];
  }
  return { ...root };
}
