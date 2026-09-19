import { getPujaCollectionProducts } from "@/lib/api";
import PujaCollectionCard from "./PujaCollectionCard";

export default async function PujaCollection() {
  const products = await getPujaCollectionProducts(8);

  console.log("🔵 PujaCollection Render:", { count: products?.length });

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50/60 via-rose-50/40 to-amber-50/60">
      <div className="container mx-auto px-4">
        {/* হেডিং */}
        <div className="flex items-start gap-5 mb-14">
          <div className="relative flex items-end gap-[7px] -rotate-[8deg] mt-1">
            <span className="block w-[9px] h-[36px] rounded-[4px] border-[2.5px] border-gray-900 bg-[#FBC4CF] shadow-[2px_2px_0_0_#1a1a1a]" />
            <span className="block w-[9px] h-[48px] rounded-[4px] border-[2.5px] border-gray-900 bg-[#F9A8B8] shadow-[2px_2px_0_0_#1a1a1a]" />
            <span className="block w-[9px] h-[36px] rounded-[4px] border-[2.5px] border-gray-900 bg-[#FBC4CF] shadow-[2px_2px_0_0_#1a1a1a]" />
          </div>

          <div className="relative -rotate-[2deg]">
            <span className="block text-[10px] md:text-xs font-bold tracking-[0.35em] text-[#E8748A] uppercase mb-1 ml-1">
              Festive Edit
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.15] tracking-tight">
              পূজার{" "}
              <span className="relative inline-block text-[#E8748A]">
                কালেকশন
                <svg
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  className="absolute left-0 -bottom-1 w-full h-[10px]"
                >
                  <path
                    d="M 2,7 C 40,3 80,10 120,5 C 150,2 180,8 198,4"
                    stroke="#E8748A"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
          </div>
        </div>

        {/* প্রোডাক্ট গ্রিড */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <PujaCollectionCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
