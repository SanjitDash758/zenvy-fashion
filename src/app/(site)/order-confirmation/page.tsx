import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder } from "@/lib/orders";
import {
  FiCheckCircle,
  FiPackage,
  FiPhone,
  FiHome,
  FiArrowRight,
} from "react-icons/fi";

interface OrderConfirmationPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function OrderConfirmationPage({
  searchParams,
}: OrderConfirmationPageProps) {
  const params = await searchParams;
  const orderId = params.id ? parseInt(params.id) : null;

  if (!orderId || isNaN(orderId)) {
    notFound();
  }

  const order = await getOrder(orderId);

  if (!order) {
    notFound();
  }

  const orderDate = new Date(order.date_created).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50/40 to-amber-50/40 py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
            <FiCheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            অর্ডার সফলভাবে সম্পন্ন হয়েছে!
          </h1>
          <p className="text-gray-600">
            ধন্যবাদ! আমরা আপনার অর্ডারটি গ্রহণ করেছি।
          </p>
        </div>

        {/* Order Info Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-rose-100 overflow-hidden mb-6">
          {/* Order Number */}
          <div className="bg-gradient-to-r from-rose-500 to-rose-600 text-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm opacity-90 mb-1">অর্ডার নম্বর</p>
                <p className="text-3xl font-bold">#{order.number}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90 mb-1">তারিখ</p>
                <p className="text-sm font-semibold">{orderDate}</p>
              </div>
            </div>
          </div>

          {/* Status + Payment */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
                <FiPackage className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  স্ট্যাটাস
                </p>
                <p className="font-bold text-gray-900 capitalize">
                  {order.status === "pending" && "অপেক্ষমাণ"}
                  {order.status === "processing" && "প্রসেসিং"}
                  {order.status === "completed" && "সম্পন্ন"}
                  {order.status === "cancelled" && "বাতিল"}
                  {order.status === "on-hold" && "স্থগিত"}
                  {![
                    "pending",
                    "processing",
                    "completed",
                    "cancelled",
                    "on-hold",
                  ].includes(order.status) && order.status}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
                <FiHome className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  পেমেন্ট পদ্ধতি
                </p>
                <p className="font-bold text-gray-900">
                  {order.payment_method_title}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              ডেলিভারি তথ্য
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  নাম
                </p>
                <p className="font-semibold text-gray-900">
                  {order.billing.first_name} {order.billing.last_name}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  মোবাইল
                </p>
                <p className="font-semibold text-gray-900">
                  {order.billing.phone}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  ঠিকানা
                </p>
                <p className="font-semibold text-gray-900">
                  {order.billing.address_1}
                  {order.billing.address_2 &&
                    `, ${order.billing.address_2}`}, {order.billing.city}
                  {order.billing.postcode && ` - ${order.billing.postcode}`}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              অর্ডারকৃত পণ্য
            </h2>
            <div className="space-y-3">
              {order.line_items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 pb-3 border-b border-gray-50 last:border-0"
                >
                  {item.image?.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image.src}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg bg-gray-100"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-gray-100" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      ৳{item.price.toLocaleString("bn-BD")} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      ৳{parseFloat(item.total).toLocaleString("bn-BD")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="p-6 bg-rose-50/50">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-700">মোট</span>
              <span className="text-2xl font-bold text-rose-600">
                ৳{parseFloat(order.total).toLocaleString("bn-BD")}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiPhone className="text-rose-500" />
            সহায়তা প্রয়োজন?
          </h2>
          <p className="text-gray-600 text-sm mb-3">
            অর্ডার সংক্রান্ত যেকোনো প্রশ্নে আমাদের সাথে যোগাযোগ করুন:
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:+8801974164273"
              className="inline-flex items-center gap-2 text-rose-600 font-semibold hover:text-rose-700"
            >
              📞 01974-164273
            </a>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-2">পরবর্তী ধাপ</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {order.payment_method === "cod"
              ? "আমাদের টিম শীঘ্রই আপনার অর্ডারটি কনফার্ম করতে কল করবে। এরপর পণ্য হাতে পেয়ে টাকা পরিশোধ করবেন।"
              : "আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করে বিকাশ পেমেন্টের জন্য নম্বর দেবে। পেমেন্ট সম্পন্ন হলে আপনার অর্ডারটি প্রসেস করা হবে।"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href={`/track-order?order=${order.number}&phone=${order.billing.phone}`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold px-6 py-3.5 rounded-xl hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-rose-500/30"
          >
            <FiPackage size={18} />
            অর্ডার ট্র্যাক করুন
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white border-2 border-rose-300 text-rose-600 font-semibold px-6 py-3.5 rounded-xl hover:bg-rose-50 transition"
          >
            আরও কিনুন
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </main>
  );
}
