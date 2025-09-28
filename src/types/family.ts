export interface FamilyMember {
  id: string;
  name: string;
  description: string;
  phone: string;
  email: string;
  birthDate: string;
  photo?: string;
  children: FamilyMember[];
  generation: number;
}

export interface FamilyData {
  [key: string]: FamilyMember;
}

export interface FamilyAction {
  type: 'ADD_MEMBER' | 'EDIT_MEMBER' | 'DELETE_MEMBER' | 'LOAD_DATA';
  payload?: any;
}