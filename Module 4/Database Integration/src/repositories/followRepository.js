const prisma = require('../db/prisma');
const { Prisma } = require('@prisma/client');

async function findAll() { return prisma.follow.findMany(); }
async function create(fields) {
  try {
    return await prisma.follow.create({ data: { followerId: Number(fields.followerId), followingId: Number(fields.followingId) } });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      throw new Error('Already following this user');
    }
    throw e;
  }
}
async function remove(followerId, followingId) {
  const existing = await prisma.follow.findUnique({ where: { followerId_followingId: { followerId: Number(followerId), followingId: Number(followingId) } } });
  if (!existing) return false;
  await prisma.follow.delete({ where: { followerId_followingId: { followerId: Number(followerId), followingId: Number(followingId) } } });
  return true;
}
module.exports = { findAll, create, remove };
