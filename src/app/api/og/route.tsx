import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") || "Wrongipedia";
  const summary =
    searchParams.get("summary") ||
    "The free encyclopedia where everything is wrong. That's the point.";

  // Truncate long text to fit the card
  const displayTitle = title.length > 60 ? title.slice(0, 57) + "..." : title;
  const displaySummary =
    summary.length > 200 ? summary.slice(0, 197) + "..." : summary;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Blue header bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 48px",
            backgroundColor: "#3366cc",
            color: "#ffffff",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {/* Globe icon as text */}
            <div
              style={{
                fontSize: "36px",
                lineHeight: "1",
              }}
            >
              W
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  letterSpacing: "-0.5px",
                }}
              >
                Wrongipedia
              </div>
              <div
                style={{
                  fontSize: "14px",
                  opacity: "0.85",
                }}
              >
                The Wrong Encyclopedia
              </div>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1",
            padding: "48px 48px 32px 48px",
          }}
        >
          {/* Article title */}
          <div
            style={{
              fontSize: "48px",
              fontWeight: 400,
              color: "#202122",
              lineHeight: "1.2",
              fontFamily: "Georgia, serif",
              borderBottom: "1px solid #a2a9b1",
              paddingBottom: "12px",
              marginBottom: "24px",
            }}
          >
            {displayTitle}
          </div>

          {/* Summary text */}
          <div
            style={{
              fontSize: "22px",
              color: "#54595d",
              lineHeight: "1.5",
              fontFamily:
                "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
              fontStyle: "italic",
            }}
          >
            {displaySummary}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 48px",
            borderTop: "1px solid #c8ccd1",
            backgroundColor: "#f8f9fa",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: "#54595d",
              fontFamily:
                "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
            }}
          >
            wrongipedia.com
          </div>
          <div
            style={{
              fontSize: "13px",
              color: "#a2a9b1",
              fontFamily:
                "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
            }}
          >
            From Wrongipedia, the wrong encyclopedia
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
