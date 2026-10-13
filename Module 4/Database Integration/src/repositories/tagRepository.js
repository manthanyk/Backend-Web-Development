const prisma = require('../db/prisma');
const { Prisma } = require('@prisma/client');

async function findAll() { return prisma.tag.findMany({ orderBy: { id: 'asc' } }); }
async function findById(id) { return prisma.tag.findUnique({ where: { id: Number(id) } }); }
async function create(fields) {
  try {
    return await prisma.tag.create({ data: { name: fields.name } });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      throw new Error('Tag already exists');
    }
    throw e;
  }
}
async function remove(id) {
  const existing = await findById(id);
  if (!existing) return false;
  await prisma.tag.delete({ where: { id: Number(id) } });
  return true;
}
module.exports = { findAll, findById, create, remove };
