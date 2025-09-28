import { useState, useEffect } from 'react';
import { FamilyMember, FamilyData } from '../types/family';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'family_tree_data';

const initialFamilyData: FamilyData = {
  'root-1': {
    id: 'root-1',
    name: 'Oumer Mohammed',
    description: 'The eldest in the family, known for his wisdom and guidance.',
    phone: '',
    email: '',
    birthDate: '',
    children: [],
    generation: 0
  },
  'root-2': {
    id: 'root-2',
    name: 'Sefo Mohammed',
    description: 'Second child of the family, caring and supportive.',
    phone: '',
    email: '',
    birthDate: '',
    children: [],
    generation: 0
  },
  'root-3': {
    id: 'root-3',
    name: 'Ayro Mohammed',
    description: 'Third child, always there for family members.',
    phone: '',
    email: '',
    birthDate: '',
    children: [],
    generation: 0
  },
  'root-4': {
    id: 'root-4',
    name: 'Reshad Mohammed',
    description: 'Fourth child, adventurous and energetic.',
    phone: '',
    email: '',
    birthDate: '',
    children: [],
    generation: 0
  },
  'root-5': {
    id: 'root-5',
    name: 'Selima Mohammed',
    description: 'Fifth child, kind and artistic.',
    phone: '',
    email: '',
    birthDate: '',
    children: [],
    generation: 0
  },
  'root-6': {
    id: 'root-6',
    name: 'Fetiya Mohammed',
    description: 'Sixth child, known for her generosity.',
    phone: '',
    email: '',
    birthDate: '',
    children: [],
    generation: 0
  },
  'root-7': {
    id: 'root-7',
    name: 'Ali Mohammed',
    description: 'Seventh child, hardworking and determined.',
    phone: '',
    email: '',
    birthDate: '',
    children: [],
    generation: 0
  },
  'root-8': {
    id: 'root-8',
    name: 'Neja Mohammed',
    description: 'Youngest child, curious and bright.',
    phone: '',
    email: '',
    birthDate: '',
    children: [],
    generation: 0
  }
};

export const useFamilyData = () => {
  const [familyData, setFamilyData] = useState<FamilyData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialFamilyData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(familyData));
  }, [familyData]);

  const addMember = (parentId: string, memberData: Omit<FamilyMember, 'id' | 'children' | 'generation'>) => {
    const newMember: FamilyMember = {
      ...memberData,
      id: uuidv4(),
      children: [],
      generation: findMemberById(parentId)?.generation + 1 || 0
    };

    setFamilyData(prev => {
      const updated = { ...prev };
      const parent = findMemberById(parentId, updated);
      if (parent) {
        parent.children.push(newMember);
      }
      return updated;
    });
  };

  const editMember = (memberId: string, memberData: Partial<FamilyMember>) => {
    setFamilyData(prev => {
      const updated = { ...prev };
      const member = findMemberById(memberId, updated);
      if (member) {
        Object.assign(member, memberData);
      }
      return updated;
    });
  };

  const deleteMember = (memberId: string) => {
    setFamilyData(prev => {
      const updated = { ...prev };
      
      // Check if it's a root member
      if (updated[memberId]) {
        delete updated[memberId];
        return updated;
      }

      // Find and remove from parent's children
      const removeFromChildren = (members: FamilyMember[]): boolean => {
        for (let i = 0; i < members.length; i++) {
          if (members[i].id === memberId) {
            members.splice(i, 1);
            return true;
          }
          if (removeFromChildren(members[i].children)) {
            return true;
          }
        }
        return false;
      };

      Object.values(updated).forEach(rootMember => {
        removeFromChildren(rootMember.children);
      });

      return updated;
    });
  };

  const findMemberById = (id: string, data: FamilyData = familyData): FamilyMember | null => {
    // Check root members
    if (data[id]) {
      return data[id];
    }

    // Search in children recursively
    const searchInChildren = (members: FamilyMember[]): FamilyMember | null => {
      for (const member of members) {
        if (member.id === id) {
          return member;
        }
        const found = searchInChildren(member.children);
        if (found) return found;
      }
      return null;
    };

    for (const rootMember of Object.values(data)) {
      const found = searchInChildren(rootMember.children);
      if (found) return found;
    }

    return null;
  };

  const exportData = () => {
    const dataStr = JSON.stringify(familyData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'family_tree_data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        setFamilyData(data);
      } catch (error) {
        console.error('Error importing data:', error);
      }
    };
    reader.readAsText(file);
  };

  return {
    familyData,
    addMember,
    editMember,
    deleteMember,
    findMemberById,
    exportData,
    importData
  };
};