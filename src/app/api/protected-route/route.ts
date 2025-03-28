import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]"; // นำเข้า authOptions จากไฟล์ NextAuth

export async function GET(req, res) {
  // ตรวจสอบ session ของผู้ใช้
  const session = await getServerSession(authOptions);

  // ถ้าผู้ใช้ไม่มี session หรือไม่ได้ล็อกอิน
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // ถ้าผู้ใช้ล็อกอินแล้วสามารถเข้าถึง API ได้
  return res.status(200).json({ message: "This is a protected resource", user: session.user });
}
