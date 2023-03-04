import User from "../@types/user";

const users: User[] = [];

// Join user to movement
export function userJoin(user: User) {
  users.push(user);
  return user;
}

// Get current user
export function getCurrentUser(id: string) {
  return users.find((user) => user.id === id);
}
// User leaves room
export function userLeave(id: string) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

//Getting all room users
export function getRoomUsers(room: string) {
  return users.filter((user) => user.room === room);
}
