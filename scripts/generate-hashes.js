/**
 * Generate bcrypt hashes for team passwords.
 *
 * Usage:
 *   node scripts/generate-hashes.js <username> <password>
 *
 * Example:
 *   node scripts/generate-hashes.js ceo "MySecretPass123"
 */

const bcrypt = require("bcryptjs");

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.log(
    "\n❌ Usage: node scripts/generate-hashes.js <username> <password>\n",
  );
  console.log("Example:");
  console.log('  node scripts/generate-hashes.js ceo "MySecretPass123"\n');
  process.exit(1);
}

const [username, password] = args;

if (password.length < 8) {
  console.log("\n❌ Password must be at least 8 characters\n");
  process.exit(1);
}

const SALT_ROUNDS = 12;

bcrypt.hash(password, SALT_ROUNDS).then((hash) => {
  console.log("\n✅ Hash generated successfully!\n");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`Username: ${username}`);
  console.log(`Password: ${password}`);
  console.log(`Hash:     ${hash}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("\n📋 Copy the hash above and use it in your SQL INSERT.\n");
});
