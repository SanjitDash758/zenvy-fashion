require("dotenv").config({ path: ".env.local" });

const axios = require("axios");

const WP_URL = process.env.NEXT_PUBLIC_WP_URL;
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

if (!WP_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
  console.error("❌ Missing environment variables");
  process.exit(1);
}

const DRY_RUN = process.argv.includes("--dry-run");

// Price tables
const DEFAULT_PRICES = {
  "1-2": 1090,
  "2-3": 1090,
  "3-4": 1190,
  "4-5": 1190,
  "5-6": 1290,
  "6-7": 1290,
  "7-8": 1290,
  "8-9": 1290,
  "9-10": 1290,
  "10-11": 1390,
  "11-12": 1390,
  "12-13": 1490,
  "13-15": 1490,
};

const JAPANI_SILK_PRICES = {
  "1-2": 1190,
  "2-3": 1190,
  "3-4": 1190,
  "4-5": 1190,
  "5-6": 1290,
  "6-7": 1290,
  "7-8": 1290,
  "8-9": 1290,
  "9-10": 1290,
  "10-11": 1390,
  "11-12": 1390,
  "12-13": 1490,
  "13-15": 1490,
};

const AGE_OPTIONS = [
  "1-2",
  "2-3",
  "3-4",
  "4-5",
  "5-6",
  "6-7",
  "7-8",
  "8-9",
  "9-10",
  "10-11",
  "11-12",
  "12-13",
  "13-15",
];

// API client
const credentials = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString(
  "base64",
);

const api = axios.create({
  baseURL: `${WP_URL}/wp-json/wc/v3`,
  headers: { Authorization: `Basic ${credentials}` },
});

function isJapaniSilk(product) {
  if (!product.sku) return false;
  return product.sku.toUpperCase().startsWith("JAPANESE-");
}

function getPriceTable(product) {
  return isJapaniSilk(product) ? JAPANI_SILK_PRICES : DEFAULT_PRICES;
}

// ===== STEP 1: Find the Age attribute ID =====
async function findAgeAttributeId() {
  console.log("\n🔍 Finding Age attribute ID...");

  const res = await api.get("/products/attributes", {
    params: { per_page: 100 },
  });

  const ageAttr = res.data.find(
    (a) => a.name.toLowerCase() === "age" || a.slug.toLowerCase() === "age",
  );

  if (!ageAttr) {
    console.error("❌ Age attribute not found!");
    console.error(
      "   Available attributes:",
      res.data.map((a) => a.name),
    );
    process.exit(1);
  }

  console.log(`✅ Age attribute found: ID=${ageAttr.id}, Name=${ageAttr.name}`);
  return ageAttr.id;
}

// ===== STEP 2: Get all products =====
async function fetchAllProducts() {
  console.log("\n📦 Fetching all products...");
  const all = [];
  let page = 1;
  while (true) {
    const res = await api.get("/products", {
      params: { per_page: 100, page, status: "publish" },
    });
    if (res.data.length === 0) break;
    all.push(...res.data);
    if (res.data.length < 100) break;
    page++;
    if (page > 10) break;
  }
  console.log(`✅ Found ${all.length} products`);
  return all;
}

// ===== STEP 3: Update product's Age attribute with all 13 terms =====
async function updateProductAttributes(product, ageAttributeId) {
  console.log(`   📝 Updating product attributes with 13 Age terms...`);

  // Preserve existing non-Age attributes
  const existingAttrs = (product.attributes || [])
    .filter((a) => a.name.toLowerCase() !== "age")
    .map((a) => ({
      id: a.id,
      name: a.name,
      position: a.position,
      visible: a.visible,
      variation: a.variation,
      options: a.options,
    }));

  // Add our Age attribute with all 13 options
  const newAttrs = [
    ...existingAttrs,
    {
      id: ageAttributeId,
      name: "Age",
      position: 0,
      visible: true,
      variation: true,
      options: AGE_OPTIONS,
    },
  ];

  if (DRY_RUN) {
    console.log(`   [DRY] Would set Age options: ${AGE_OPTIONS.join(", ")}`);
    return true;
  }

  try {
    await api.put(`/products/${product.id}`, {
      attributes: newAttrs,
    });
    return true;
  } catch (err) {
    console.error(
      `   ❌ Failed to update attributes:`,
      err.response?.data?.message || err.message,
    );
    return false;
  }
}

// ===== STEP 4: Delete existing variations =====
async function deleteAllVariations(productId) {
  const res = await api.get(`/products/${productId}/variations`, {
    params: { per_page: 100 },
  });

  for (const v of res.data) {
    if (DRY_RUN) continue;
    try {
      await api.delete(`/products/${productId}/variations/${v.id}`, {
        params: { force: true },
      });
    } catch (err) {
      console.error(`   ❌ Delete variation ${v.id} failed:`, err.message);
    }
  }

  return res.data.length;
}

// ===== STEP 5: Create variation with proper attribute ID =====
async function createVariation(productId, ageAttributeId, age, price) {
  if (DRY_RUN) {
    console.log(
      `   [DRY] Would create "${age}" (attr id=${ageAttributeId}) → ৳${price}`,
    );
    return true;
  }

  try {
    await api.post(`/products/${productId}/variations`, {
      regular_price: String(price),
      status: "publish",
      manage_stock: false,
      stock_status: "instock",
      attributes: [
        {
          id: ageAttributeId, // ← ⚠️ IMPORTANT: Include attribute ID
          name: "Age",
          option: age,
        },
      ],
    });
    return true;
  } catch (err) {
    console.error(
      `   ❌ Create "${age}" failed:`,
      err.response?.data?.message || err.message,
    );
    return false;
  }
}

// ===== Process one product =====
async function processProduct(product, ageAttributeId, index, total) {
  const type = isJapaniSilk(product) ? "🎌 JAPANI SILK" : "📦 Default";
  console.log(`\n[${index + 1}/${total}] ${product.name}`);
  console.log(`   ID: ${product.id} | Type: ${type}`);

  // Step 1: Update attributes
  const attrOk = await updateProductAttributes(product, ageAttributeId);
  if (!attrOk) {
    console.log(`   ⚠️ Skipping due to attribute update failure`);
    return { failed: 1 };
  }

  // Small delay to allow WooCommerce to process
  await new Promise((r) => setTimeout(r, 300));

  // Step 2: Delete old variations
  const deleted = await deleteAllVariations(product.id);
  console.log(`   🗑️  Deleted ${deleted} old variations`);

  // Step 3: Create new variations
  const priceTable = getPriceTable(product);
  let created = 0;
  let failed = 0;

  for (const age of AGE_OPTIONS) {
    const ok = await createVariation(
      product.id,
      ageAttributeId,
      age,
      priceTable[age],
    );
    if (ok) created++;
    else failed++;
  }

  console.log(`   ✅ Created: ${created} | ❌ Failed: ${failed}`);
  return { created, failed, deleted };
}

// ===== MAIN =====
async function main() {
  console.log("\n╔══════════════════════════════════════════╗");
  console.log("║  Zenvy Fashion — FIX Variations          ║");
  console.log("║  With proper Age attribute ID            ║");
  console.log("╚══════════════════════════════════════════╝");

  if (DRY_RUN) {
    console.log("\n⚠️  DRY RUN MODE\n");
  } else {
    console.log("\n🔴 LIVE MODE\n");
    console.log("Starting in 5 seconds... (Ctrl+C to cancel)");
    await new Promise((r) => setTimeout(r, 5000));
  }

  console.log(`🌐 WordPress: ${WP_URL}`);

  // Find Age attribute ID
  const ageAttributeId = await findAgeAttributeId();

  // Fetch all products
  const products = await fetchAllProducts();

  console.log("\n📊 Summary:");
  console.log(`   Products:           ${products.length}`);
  console.log(`   Japani Silk:        ${products.filter(isJapaniSilk).length}`);
  console.log(`   Age attribute ID:   ${ageAttributeId}`);
  console.log(`   Variations/product: ${AGE_OPTIONS.length}`);
  console.log(
    `   Total to create:    ${products.length * AGE_OPTIONS.length}\n`,
  );

  let totalCreated = 0;
  let totalDeleted = 0;
  let totalFailed = 0;

  for (let i = 0; i < products.length; i++) {
    try {
      const result = await processProduct(
        products[i],
        ageAttributeId,
        i,
        products.length,
      );
      totalCreated += result.created || 0;
      totalDeleted += result.deleted || 0;
      totalFailed += result.failed || 0;
      await new Promise((r) => setTimeout(r, 500));
    } catch (err) {
      console.error(`   ❌ Error: ${err.message}`);
      totalFailed++;
    }
  }

  console.log("\n╔══════════════════════════════════════════╗");
  console.log("║  ✅ COMPLETE                             ║");
  console.log("╚══════════════════════════════════════════╝\n");
  console.log(`   Products processed:     ${products.length}`);
  console.log(`   Old variations deleted: ${totalDeleted}`);
  console.log(`   New variations created: ${totalCreated}`);
  console.log(`   Failed:                 ${totalFailed}\n`);

  if (DRY_RUN) {
    console.log("🧪 DRY RUN — no changes were made.\n");
  }
}

main().catch((err) => {
  console.error("\n❌ Script failed:", err.message);
  process.exit(1);
});
