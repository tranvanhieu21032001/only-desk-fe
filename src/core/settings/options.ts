import avatarDefault from '@/assets/images/avatar-default.png';

export const notifications = [
  {
    id: 1,
    title: 'Crips',
    subtitle: 'John Smith submitted web form',
    time: '10m',
    badge: 2,
    avatar: avatarDefault,
    selected: false,
  },
  {
    id: 2,
    title: 'Admin 1',
    subtitle: 'John Smith submitted web form',
    time: '10m',
    badge: 2,
    avatar: avatarDefault,
    selected: false,
  },
  {
    id: 3,
    title: 'Admin 2',
    subtitle: 'John Smith submitted web form',
    time: '10m',
    badge: null,
    avatar: avatarDefault,
    selected: false,
  },
  {
    id: 4,
    title: 'Admin 3',
    subtitle: 'John Smith submitted web form',
    time: '10m',
    badge: null,
    avatar: avatarDefault,
    selected: true,
  },
];

export const options = ['None assigned', 'User 1', 'User 2', 'User 3'];

export const initialTags = ['Tag', 'Tag', 'Tag'];

export const participant = ['participant 1', 'participant 2', 'participant 3'];

export const conversationOptions = ['Support', 'Sales', 'Marketing', 'Other'];

export const notificationOptions = [
  {
    id: 1,
    title: 'Admin 1 sent you a messages',
    content: 'Hi',
    time: '10 minutes ago',
    read: false,
  },
  {
    id: 2,
    title: 'Admin 1 sent you a messages',
    content: 'Hi',
    time: '10 minutes ago',
    read: false,
  },
  {
    id: 3,
    title: 'Admin 1 sent you a messages',
    content: 'Hi',
    time: '10 minutes ago',
    read: false,
  },
  {
    id: 4,
    title: 'Admin 1 sent you a messages',
    content: 'Hi',
    time: '10 minutes ago',
    read: false,
  },
  {
    id: 5,
    title: 'Admin 1 sent you a messages',
    content: 'Hi',
    time: '10 minutes ago',
    read: false,
  },
];

export const filterOptions = [
  'All',
  'Unread',
  'Unresolved',
  'Resolved',
  'Most recent',
  'Longest waiting',
  'Mentions',
];

export const mockOperators = [
  {
    avatar: avatarDefault,
    name: 'ChauLB',
    email: 'misa.le.dn@gmail.com',
    role: 'Owner',
    status: 'Active',
    isYou: true,
  },
  {
    avatar: avatarDefault,
    name: 'MisaLe',
    email: 'misa.le.dn@gmail.com',
    role: 'Member',
    status: 'Active',
    isYou: false,
  },
  {
    avatar: avatarDefault,
    name: 'LeBaoChau',
    email: 'misa.le.dn@gmail.com',
    role: 'Member',
    status: 'Invited',
    isYou: false,
  },
];

export const filtersDropdown = [
  'User email',
  'User phone',
  'User IP address',
  'Conversation state',
  'User availability',
  'Creation date',
  'Update date',
];
