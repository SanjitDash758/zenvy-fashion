"use client";

import { useEffect } from "react";
import { FiX, FiInfo } from "react-icons/fi";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ===== Size Chart Data =====
const SIZE_CHART = [
  { age: "১-২ বছর", size: "১", chest: "২০", waist: "১৯", length: "২২" },
  { age: "২-৩ বছর", size: "২", chest: "২১", waist: "২০", length: "২৪" },
  { age: "৩-৪ বছর", size: "৩", chest: "২২", waist: "২১", length: "২৬" },
  { age: "৪-৫ বছর", size: "৪", chest: "২৩", waist: "২২", length: "২৮" },
  { age: "৫-৬ বছর", size: "৫", chest: "২৪", waist: "২৩", length: "৩০" },
  { age: "৬-৭ বছর", size: "৬", chest: "২৫", waist: "২৪", length: "৩২" },
  { age: "৭-৮ বছর", size: "৭", chest: "২৬", waist: "২৫", length: "৩৪" },
  { age: "৮-৯ বছর", size: "৮", chest: "২৭", waist: "২৬", length: "৩৬" },
  { age: "৯-১০ বছর", size: "৯", chest: "২৮", waist: "২৭", length: "৩৮" },
  { age: "১০-১১ বছর", size: "১০", chest: "২৯", waist: "২৮", length: "৪০" },
  { age: "১১-১২ বছর", size: "১১", chest: "৩০", waist: "২৯", length: "৪২" },
  { age: "১২-১৩ বছর", size: "১২", chest: "৩১", waist: "৩০", length: "৪৪" },
  { age: "১৩-১৫ বছর", size: "১৩", chest: "৩২", waist: "৩১", length: "৪৬" },
];

export default function SizeGuideModal({
  isOpen,
  onClose,
}: SizeGuideModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 99998,
          animation: "fadeIn 0.2s ease",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(95vw, 720px)",
          maxHeight: "90vh",
          overflowY: "auto",
          backgroundColor: "#FFFFFF",
          borderRadius: "24px",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.25)",
          zIndex: 99999,
          animation: "slideUp 0.3s ease",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1A1A1A",
            zIndex: 10,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <FiX size={18} />
        </button>

        {/* Header */}
        <div
          style={{
            padding: "24px 28px",
            borderBottom: "1px solid rgba(255, 107, 138, 0.12)",
            background: "linear-gradient(135deg, #FFF8F9 0%, #FFFFFF 100%)",
            borderRadius: "24px 24px 0 0",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "26px",
              fontWeight: 700,
              color: "#1A1A1A",
              margin: 0,
              marginBottom: "6px",
            }}
          >
            📏 সাইজ গাইড
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "13px",
              color: "#777777",
              margin: 0,
            }}
          >
            বয়স অনুযায়ী সঠিক সাইজ এবং মাপ
          </p>
        </div>

        {/* Table */}
        <div style={{ padding: "24px 28px" }}>
          <div
            style={{
              overflowX: "auto",
              borderRadius: "12px",
              border: "1px solid rgba(255, 107, 138, 0.12)",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "13px",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#FFF8F9",
                  }}
                >
                  <th style={thStyle}>বয়স</th>
                  <th style={thStyle}>সাইজ</th>
                  <th style={thStyle}>বুক (ইঞ্চি)</th>
                  <th style={thStyle}>কোমর (ইঞ্চি)</th>
                  <th style={thStyle}>লম্বা (ইঞ্চি)</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.map((row, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#FDFCFB",
                    }}
                  >
                    <td style={tdStyle}>{row.age}</td>
                    <td
                      style={{
                        ...tdStyle,
                        fontWeight: 700,
                        color: "#FF6B8A",
                      }}
                    >
                      {row.size}
                    </td>
                    <td style={tdStyle}>{row.chest}"</td>
                    <td style={tdStyle}>{row.waist}"</td>
                    <td style={tdStyle}>{row.length}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How to Measure */}
        <div
          style={{
            padding: "0 28px 28px",
          }}
        >
          <div
            style={{
              backgroundColor: "#FFF8F9",
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid rgba(255, 107, 138, 0.12)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <FiInfo size={16} style={{ color: "#FF6B8A" }} />
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#1A1A1A",
                  margin: 0,
                }}
              >
                কীভাবে সঠিক মাপ নেবেন?
              </h3>
            </div>

            {/* Measurement Guide Image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 9",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(255, 107, 138, 0.1)",
                marginBottom: "16px",
              }}
            >
              <img
                src="/images/size-guide.png"
                alt="কীভাবে মাপ নেবেন"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
                onError={(e) => {
                  // Hide broken image icon if not found
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>

            {/* Measurement Tips */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <TipItem
                number="১"
                title="বুক (Chest)"
                desc="শিশুর বুকের সবচেয়ে চওড়া অংশ থেকে মাপ নিন"
              />
              <TipItem
                number="২"
                title="কোমর (Waist)"
                desc="কোমরের সবচেয়ে সরু অংশ থেকে মাপ নিন"
              />
              <TipItem
                number="৩"
                title="লম্বা (Length)"
                desc="কাঁধ থেকে নিচের প্রান্ত পর্যন্ত মাপ নিন"
              />
            </div>
          </div>
        </div>

        {/* Animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translate(-50%, -40%);
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%);
            }
          }
        `}</style>
      </div>
    </>
  );
}

// ===== Reusable Styles =====

const thStyle: React.CSSProperties = {
  padding: "12px 14px",
  textAlign: "left",
  fontWeight: 700,
  color: "#1A1A1A",
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  borderBottom: "1px solid rgba(255, 107, 138, 0.12)",
  whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  padding: "12px 14px",
  color: "#555555",
  borderBottom: "1px solid rgba(0, 0, 0, 0.04)",
  whiteSpace: "nowrap",
};

// ===== Tip Item Component =====
function TipItem({
  number,
  title,
  desc,
}: {
  number: string;
  title: string;
  desc: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          backgroundColor: "#FF6B8A",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
          fontWeight: 700,
          flexShrink: 0,
          marginTop: "1px",
        }}
      >
        {number}
      </div>
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            color: "#1A1A1A",
            margin: 0,
            marginBottom: "2px",
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "12px",
            color: "#777777",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}
