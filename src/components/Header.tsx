import React from 'react';
import { Users, Download, Upload, Plus } from 'lucide-react';

interface HeaderProps {
  onAddRootMember: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
  totalMembers: number;
}

export const Header: React.FC<HeaderProps> = ({
  onAddRootMember,
  onExport,
  onImport,
  totalMembers
}) => {
  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onImport(file);
      }
    };
    input.click();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Family Tree</h1>
              <p className="text-sm text-gray-500">{totalMembers} members</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onAddRootMember}
              className="hidden sm:flex items-center space-x-2 btn-primary text-sm"
              title="Add Root Member"
            >
              <Plus className="w-4 h-4" />
              <span>Add Member</span>
            </button>

            <button
              onClick={onExport}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Export Data"
            >
              <Download className="w-5 h-5" />
            </button>

            <button
              onClick={handleImportClick}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Import Data"
            >
              <Upload className="w-5 h-5" />
            </button>

            {/* Mobile Add Button */}
            <button
              onClick={onAddRootMember}
              className="sm:hidden p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
              title="Add Root Member"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};