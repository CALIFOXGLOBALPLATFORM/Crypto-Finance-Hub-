await prisma.auditLog.create({
  data: {
    userId,
    action: 'BANK_WITHDRAWAL',
    reason: `Account: ${bankAccount}`,
    newValue: JSON.stringify(transaction),
  },
});

res.json({ message: 'Bank withdrawal submitted', transaction });