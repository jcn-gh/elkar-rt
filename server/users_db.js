import Database from './database'; // Assume a database module is imported
import { Mutex } from 'async-mutex';

const userLock = new Mutex();

const validateInput = ({ id, name, room }) => {
  if (!id || typeof id !== 'string' || !name || typeof name !== 'string' || !room || typeof room !== 'string') {
    throw new Error('Invalid input. Please provide valid id, name, and room.');
  }
}

const addUser = async ({ id, name, room }) => {
  try {
    await userLock.acquire();
    validateInput({ id, name, room });

    const existingUser = await Database.getUserById(id);
    if (existingUser) {
      return { error: 'Username is taken.' };
    }

    const user = { id, name: name.trim().toLowerCase(), room: room.trim().toLowerCase() };

    await Database.addUser(user);
    return { user };
  } finally {
    userLock.release();
  }
}

const removeUser = async (id) => {
  try {
    await userLock.acquire();
    const success = await Database.removeUser(id);
    return success;
  } finally {
    userLock.release();
  }
};

const getUser = async (id) => {
  try {
    await userLock.acquire();
    return await Database.getUserById(id);
  } finally {
    userLock.release();
  }
}

const getUsersInRoom = async (room) => {
  try {
    await userLock.acquire();
    return await Database.getUsersInRoom(room);
  } finally {
    userLock.release();
  }
}

export default { addUser, removeUser, getUser, getUsersInRoom };
