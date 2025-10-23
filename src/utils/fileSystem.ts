import type { FileSystemItem } from '../types';

export const initialFileSystem: FileSystemItem = {
  id: 'root',
  name: '/',
  type: 'folder',
  children: [
    {
      id: 'home',
      name: 'Home',
      type: 'folder',
      parentId: 'root',
      children: [
        {
          id: 'documents',
          name: 'Documents',
          type: 'folder',
          parentId: 'home',
          children: [
            {
              id: 'readme',
              name: 'README.txt',
              type: 'file',
              parentId: 'documents',
              content: 'Welcome to WakOS!\n\nThis is a macOS-like web operating system built with React and Tailwind CSS.\n\nExplore the system using Finder or Terminal.',
            },
          ],
        },
        {
          id: 'desktop',
          name: 'Desktop',
          type: 'folder',
          parentId: 'home',
          children: [],
        },
        {
          id: 'downloads',
          name: 'Downloads',
          type: 'folder',
          parentId: 'home',
          children: [],
        },
      ],
    },
    {
      id: 'applications',
      name: 'Applications',
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
