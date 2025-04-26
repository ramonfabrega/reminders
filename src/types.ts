export type Reminder = {
  id: string;
  name: string;
  groupId: string | null; // null means it's at root level
};

export type Group = {
  id: string;
  name: string;
  parentGroupId: string | null; // null means it's a root level group
  childGroupIds: string[]; // array of child group IDs
};
