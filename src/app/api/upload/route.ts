import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// 動画アップロードに対応するためボディサイズ上限を拡大
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const targetPath = formData.get("path") as string | null;

    if (!file || !targetPath) {
      return NextResponse.json(
        { error: "file と path が必要です" },
        { status: 400 }
      );
    }

    // セキュリティ: images/, videos/, audio/ 以下のみ許可
    const normalizedPath = path.normalize(targetPath);
    if (
      (!normalizedPath.startsWith("images/") &&
        !normalizedPath.startsWith("videos/") &&
        !normalizedPath.startsWith("audio/")) ||
      normalizedPath.includes("..")
    ) {
      return NextResponse.json(
        { error: "不正なパスです" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const publicDir = path.join(process.cwd(), "public");
    const fullPath = path.join(publicDir, normalizedPath);

    // ディレクトリがなければ作成
    await mkdir(path.dirname(fullPath), { recursive: true });

    await writeFile(fullPath, buffer);

    return NextResponse.json({
      success: true,
      path: `/${normalizedPath}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "アップロードに失敗しました" },
      { status: 500 }
    );
  }
}
