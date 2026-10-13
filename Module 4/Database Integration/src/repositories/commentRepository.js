const prisma = require('../db/prisma');

async function findAll() { return prisma.comment.findMany({ orderBy: { id: 'asc' } }); }
async function findById(id) { return prisma.comment.findUnique({ where: { id: Number(id) } }); }
async function create(fields) {
  return prisma.comment.create({ data: { body: fields.body, authorId: Number(fields.authorId), postId: Number(fields.postId) } });
}
async function update(id, patch) {
  const existing = await findById(id);
  if (!existing) return null;
  return prisma.comment.update({ where: { id: Number(id) }, data: patch });
}
async function remove(id) {
  const existing = await findById(id);
  if (!existing) return false;
  await prisma.comment.delete({ where: { id: Number(id) } });
  return true;
}
module.exports = { findAll, findById, create, update, remove };
