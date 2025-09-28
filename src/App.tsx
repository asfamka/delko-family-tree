import React, { useState } from 'react';
import { FamilyMember } from './types/family';
import { useFamilyData } from './hooks/useFamilyData';
import { Header } from './components/Header';
import { FamilyTree } from './components/FamilyTree';
import { MemberForm } from './components/MemberForm';

function App() {
  const {
    familyData,
    addMember,
    editMember,
    deleteMember,
    exportData,
    importData
  } = useFamilyData();

  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [parentId, setParentId] = useState<string | null>(null);

  const totalMembers = React.useMemo(() => {
    const countMembers = (member: FamilyMember): number => {
      return 1 + member.children.reduce((sum, child) => sum + countMembers(child), 0);
    };
    return Object.values(familyData).reduce((sum, member) => sum + countMembers(member), 0);
  }, [familyData]);

  const handleAddRootMember = () => {
    setEditingMember(null);
    setParentId(null);
    setShowForm(true);
  };

  const handleAddChild = (parentMemberId: string) => {
    setEditingMember(null);
    setParentId(parentMemberId);
    setShowForm(true);
  };

  const handleEditMember = (member: FamilyMember) => {
    setEditingMember(member);
    setParentId(null);
    setShowForm(true);
  };

  const handleSaveMember = (memberData: Omit<FamilyMember, 'id' | 'children' | 'generation'>) => {
    if (editingMember) {
      // Edit existing member
      editMember(editingMember.id, memberData);
    } else if (parentId) {
      // Add child to existing member
      addMember(parentId, memberData);
    } else {
      // Add new root member
      const newRootId = `root-${Date.now()}`;
      const newMember: FamilyMember = {
        ...memberData,
        id: newRootId,
        children: [],
        generation: 0
      };
      
      // Add to familyData as root member
      const updatedData = { ...familyData, [newRootId]: newMember };
      localStorage.setItem('family_tree_data', JSON.stringify(updatedData));
      window.location.reload(); // Simple way to refresh the data
    }
    
    setShowForm(false);
    setEditingMember(null);
    setParentId(null);
  };

  const handleDeleteMember = (memberId: string) => {
    if (window.confirm('Are you sure you want to delete this family member? This action cannot be undone.')) {
      deleteMember(memberId);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingMember(null);
    setParentId(null);
  };

  const getFormTitle = () => {
    if (editingMember) return 'Edit Family Member';
    if (parentId) return 'Add Child';
    return 'Add Family Member';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onAddRootMember={handleAddRootMember}
        onExport={exportData}
        onImport={importData}
        totalMembers={totalMembers}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FamilyTree
          familyData={familyData}
          onEdit={handleEditMember}
          onDelete={handleDeleteMember}
          onAddChild={handleAddChild}
        />
      </main>

      {showForm && (
        <MemberForm
          member={editingMember}
          onSave={handleSaveMember}
          onCancel={handleCancelForm}
          title={getFormTitle()}
        />
      )}
    </div>
  );
}

export default App;