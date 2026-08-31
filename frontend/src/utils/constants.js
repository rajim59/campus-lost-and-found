// API
export const API_BASE_URL = 'http://localhost:5000/api';
export const SERVER_URL = 'http://localhost:5000';

// Categories
export const CATEGORIES = [
  { value: 'id_card', label: 'ID Card' },
  { value: 'wallet', label: 'Wallet' },
  { value: 'phone', label: 'Phone' },
  { value: 'book', label: 'Book' },
  { value: 'key', label: 'Key' },
  { value: 'other', label: 'Other' },
];

// Locations
export const LOCATIONS = [
  { value: 'library', label: 'Library' },
  { value: 'cafeteria', label: 'Cafeteria' },
  { value: 'dormitory', label: 'Dormitory' },
  { value: 'academic_building', label: 'Academic Building' },
  { value: 'playground', label: 'Playground' },
  { value: 'other', label: 'Other' },
];

// Departments
export const DEPARTMENTS = [
  { value: 'cse', label: 'CSE' },
  { value: 'eee', label: 'EEE' },
  { value: 'ece', label: 'ECE' },
  { value: 'bba', label: 'BBA' },
  { value: 'english', label: 'English' },
  { value: 'law', label: 'Law' },
  { value: 'other', label: 'Other' },
];

// Post status
export const POST_STATUS = {
  open: 'Open',
  claimed: 'Claimed',
  resolved: 'Resolved',
};

// Claim status
export const CLAIM_STATUS = {
  pending: 'Pending',
  accepted: 'Accepted',
  rejected: 'Rejected',
};