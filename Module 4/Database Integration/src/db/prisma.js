const { PrismaClient } = require('@prisma/client');

// One shared client for the entire application process.
const prisma = new PrismaClient();

module.exports = prisma;
