import React, { useState, useMemo } from 'react';
import { FamilyMember } from '../types/family';
import { FamilyMemberCard } from './FamilyMemberCard';
import { SearchBar } from './SearchBar';
import { Users, TreePine } from 'lucide-react';

interface FamilyTreeProps {
  familyData: { [key: string]: FamilyMember };
  onEdit: (member: FamilyMember) => void;
  onDelete: (memberId: string) => void;
  onAddChild: (parentId: string) => void;
}

export const FamilyTree: React.FC<FamilyTreeProps> = ({
  familyData,
  onEdit,
  onDelete,
  onAddChild
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) {
      return Object.values(familyData);
    }

    const query = searchQuery.toLowerCase();
    const matchesQuery = (member: FamilyMember): boolean => {
      return (
        member.name.toLowerCase().includes(query) ||
        member.description.toLowerCase().includes(query) ||
        member.phone.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query)
      );
    };

    const filterMemberAndChildren = (member: FamilyMember): FamilyMember | null => {
      const memberMatches = matchesQuery(member);
      const filteredChildren = member.children
        .map(child => filterMemberAndChildren(child))
        .filter(Boolean) as FamilyMember[];

      if (memberMatches || filteredChildren.length > 0) {
        return {
          ...member,
          children: filteredChildren
        };
      }

      return null;
    };

    return Object.values(familyData)
      .map(member => filterMemberAndChildren(member))
      .filter(Boolean) as FamilyMember[];
  }, [familyData, searchQuery]);

  const totalMembers = useMemo(() => {
    const countMembers = (member: FamilyMember): number => {
      return 1 + member.children.reduce((sum, child) => sum + countMembers(child), 0);
    };
    return Object.values(familyData).reduce((sum, member) => sum + countMembers(member), 0);
  }, [familyData]);

  if (Object.keys(familyData).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <TreePine className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Family Members Yet</h3>
        <p className="text-gray-600 mb-6 max-w-md">
          Start building your family tree by adding the first family member.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-primary-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Family Members</h2>
              <p className="text-sm text-gray-600">{totalMembers} total members</p>
            </div>
          </div>
        </div>
        
        <SearchBar onSearch={setSearchQuery} />
        
        {searchQuery && (
          <div className="mt-3 text-sm text-gray-600">
            Showing results for "{searchQuery}"
          </div>
        )}
      </div>

      {/* Family Tree */}
      <div className="space-y-6">
        {filteredMembers.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or browse all family members.
            </p>
          </div>
        ) : (
          filteredMembers.map((member) => (
            <FamilyMemberCard
              key={member.id}
              member={member}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddChild={onAddChild}
              level={0}
            />
          ))
        )}
      </div>
    </div>
  );
};