import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { verify } from "@/Services/authServices";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);

  useEffect(() => {
    const fetchVerify = async () => {
      if (!token) return;

      try {
        const data = await verify(token);

        console.log("✅ Verify success:", data);
      } catch (error) {
        console.error("❌ Verify error:", error.message);
      }
    };
    fetchVerify();
  }, [token]);

  return (
    <div>
      <a href={`/`}>Quay về trang chủ</a>
    </div>
  );
}

export default VerifyEmail;
