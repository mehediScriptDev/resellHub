"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { authClient } from "@/lib/auth-client";

const setAuthCookie = (token) => {
  document.cookie = `auth_token=${token}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
};

const storeSessionAndRedirect = (token, user) => {
  localStorage.setItem("token", token);
  setAuthCookie(token);
  localStorage.setItem("user", JSON.stringify(user));
  window.location.href = `/dashboard/${user.role}`;
};

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");
    const role = searchParams.get("role") || "buyer";

    if (error) {
      router.replace(`/login?error=${error}`);
      return;
    }

    const finish = async () => {
      if (token) {
        localStorage.setItem("token", token);
        setAuthCookie(token);

        try {
          const { data } = await api.get("/auth/me");
          if (data.success) {
            storeSessionAndRedirect(token, data.data);
            return;
          }
        } catch {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          document.cookie = "auth_token=; path=/; max-age=0";
        }

        router.replace("/login?error=profile_failed");
        return;
      }

      try {
        const { data: session } = await authClient.getSession();
        const user = session?.user;

        if (!user?.email) {
          router.replace("/login?error=google_auth_failed");
          return;
        }

        const { data } = await api.post("/auth/google-sync", {
          email: user.email,
          name: user.name,
          picture: user.image,
          googleId: user.id,
          role,
        });

        if (data.success) {
          storeSessionAndRedirect(data.token, data.user);
          return;
        }
      } catch {
        router.replace("/login?error=google_auth_failed");
      }
    };

    finish();
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <p className="text-muted-foreground">Signing you in with Google...</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
