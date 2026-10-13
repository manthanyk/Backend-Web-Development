const prisma = require('../src/db/prisma');

async function main() {
  // Clean existing data
  await prisma.postTag.deleteMany();
  await prisma.vote.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const alice = await prisma.user.create({ data: { name: 'Alice' } });
  const bob = await prisma.user.create({ data: { name: 'Bob' } });

  const post = await prisma.post.create({
    data: {
      title: 'Hello World',
      body: 'First post after DB swap.',
      authorId: alice.id,
    },
  });

  await prisma.vote.create({ data: { userId: bob.id, postId: post.id } });

  console.log('Seed complete.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
