const prisma = require('../db/prisma');

async function findAll() {
  return prisma.user.findMany({ orderBy: { id: 'asc' } });
}

async function findById(id) {
  return prisma.user.findUnique({ where: { id: Number(id) } });
}

async function create(fields) {
  return prisma.user.create({
    data: { name: fields.name },
  });
}

async function update(id, patch) {
  const existing = await findById(id);
  if (!existing) return null;
  return prisma.user.update({
    where: { id: Number(id) },
    data: patch,
  });
}

async function remove(id) {
  const existing = await findById(id);
  if (!existing) return false;
  await prisma.user.delete({ where: { id: Number(id) } });
  return true;
}

module.exports = { findAll, findById, create, update, remove };
