import React, { useState } from 'react';
import { FamilyMember } from '../types/family';
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Edit3, 
  Trash2, 
  UserPlus, 
  ChevronDown, 
  ChevronRight,
  Users
} from 'lucide-react';

interface FamilyMemberCardProps {
  member: FamilyMember;
  onEdit: (member: FamilyMember) => void;
  onDelete: (memberId: string) => void;
  onAddChild: (parentId: string) => void;
  level?: number;
}

const generationColors = [
  'bg-blue-50 border-blue-200',
  'bg-green-50 border-green-200',
  'bg-purple-50 border-purple-200',
  'bg-orange-50 border-orange-200',
  'bg-pink-50 border-pink-200',
  'bg-indigo-50 border-indigo-200',
];

const generationLabels = [
  'Founder',
  'Child',
  'Grandchild',
  'Great-grandchild',
  'Great-great-grandchild',
  'Descendant'
];

export const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({
  member,
  onEdit,
  onDelete,
  onAddChild,
  level = 0
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const colorClass = generationColors[level % generationColors.length];
  const generationLabel = generationLabels[level] || 'Descendant';
  const indent = level * 20;

  return (
    <div className="w-full" style={{ marginLeft: `${indent}px` }}>
      <div className={`family-node ${colorClass} relative`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-primary-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {member.name}
              </h3>
              <p className="text-sm text-primary-600 font-medium">
                {generationLabel}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            {member.children.length > 0 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                )}
              </button>
            )}
            
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Actions"
            >
              <Edit3 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Description */}
        {member.description && (
          <p className="text-gray-700 text-sm mb-3 leading-relaxed">
            {member.description}
          </p>
        )}

        {/* Contact Info */}
        <div className="space-y-2 mb-3">
          {member.phone && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <a 
                href={`tel:${member.phone}`}
                className="hover:text-primary-600 transition-colors truncate"
              >
                {member.phone}
              </a>
            </div>
          )}
          
          {member.email && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <a 
                href={`mailto:${member.email}`}
                className="hover:text-primary-600 transition-colors truncate"
              >
                {member.email}
              </a>
            </div>
          )}
          
          {member.birthDate && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{member.birthDate}</span>
            </div>
          )}
        </div>

        {/* Children Count */}
        {member.children.length > 0 && (
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
            <Users className="w-4 h-4" />
            <span>{member.children.length} {member.children.length === 1 ? 'child' : 'children'}</span>
          </div>
        )}

        {/* Action Buttons */}
        {showActions && (
          <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200">
            <button
              onClick={() => onEdit(member)}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
            
            <button
              onClick={() => onAddChild(member.id)}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              <UserPlus className="w-3 h-3" />
              <span>Add Child</span>
            </button>
            
            <button
              onClick={() => onDelete(member.id)}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>

      {/* Children */}
      {isExpanded && member.children.length > 0 && (
        <div className="mt-4 space-y-4">
          {member.children.map((child) => (
            <FamilyMemberCard
              key={child.id}
              member={child}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddChild={onAddChild}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};