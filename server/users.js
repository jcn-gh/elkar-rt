import { Mutex } from 'async-mutex';

const users = new Map(); // Use a database or persistent storage solution instead of an in-memory Map
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

    if (users.has(id)) {
      return { error: 'Username is taken.' };
    }

    const user = { id, name: name.trim().toLowerCase(), room: room.trim().toLowerCase() };

    users.set(id, user);
    return { user };
  } finally {
    userLock.release();
  }
}

const removeUser = async (id) => {
  try {
    await userLock.acquire();
    return users.delete(id);
  } finally {
    userLock.release();
  }
};

const getUser = async (id) => {
  try {
    await userLock.acquire();
    return users.get(id);
  } finally {
    userLock.release();
  }
}

const getUsersInRoom = async (room) => {
  try {
    await userLock.acquire();
    return Array.from(users.values()).filter((user) => user.room === room);
  } finally {
    userLock.release();
  }
}

export default { addUser, removeUser, getUser, getUsersInRoom };



