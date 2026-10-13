const prisma = require('../db/prisma');
const { Prisma } = require('@prisma/client');

async function findAll() { return prisma.vote.findMany(); }
async function findById(id) { return prisma.vote.findUnique({ where: { id: Number(id) } }); }
async function create(fields) {
  try {
    return await prisma.vote.create({ data: { userId: Number(fields.userId), postId: Number(fields.postId) } });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      throw new Error('User has already voted on this post');
    }
    throw e;
  }
}
async function remove(id) {
  const existing = await findById(id);
  if (!existing) return false;
  await prisma.vote.delete({ where: { id: Number(id) } });
  return true;
}
module.exports = { findAll, findById, create, remove };
