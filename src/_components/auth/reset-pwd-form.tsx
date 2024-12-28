import { Loader } from "lucide-react";
import { useState } from "react";
import { Button } from "@/_components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { fetchResetPwdConfirm } from "@/_auth/client/api-client";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { AuthHeader } from "./auth-header";
import { PasswordToggle } from "../pwd-toggle";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPwdForm({ token }: ResetPasswordFormProps) {
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast({
        variant: "error",
        title: "Erro",
        description: "As senhas não coincidem",
      });
      return;
    }

    setLoading(true);
    try {
      await delay(500);
      const response = await fetchResetPwdConfirm(token, formData.newPassword);

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: response.message,
        });
      } else {
        toast({
          variant: "error",
          title: "Erro",
          description: response.message,
        });
      }
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Erro",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <AuthHeader
        title="Definir nova senha"
        description="Defina sua nova senha abaixo."
      />
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <Label>Nova senha</Label>
            <Input
              required
              maxLength={15}
              id="newPassword"
              type={showPasswords ? "text" : "password"}
              value={formData.newPassword}
              onChange={handleChange}
            />
            <PasswordToggle
              showPasswords={showPasswords}
              onClick={() => setShowPasswords(!showPasswords)}
            />
          </div>
          <div className="relative">
            <Label>Confirmar senha</Label>
            <Input
              required
              maxLength={15}
              id="confirmNewPassword"
              type={showPasswords ? "text" : "password"}
              value={formData.confirmNewPassword}
              onChange={handleChange}
            />
            <PasswordToggle
              showPasswords={showPasswords}
              onClick={() => setShowPasswords(!showPasswords)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader className="animate-spin ml-4" />
            ) : (
              "Salvar senha"
            )}
          </Button>
          <Link href={"/entrar"}>
            <Button variant="secondary" className="w-full mt-4">
              Entrar
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
}
