import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleButton } from "./google-button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { fetchRegister } from "@/auth/fetch/fetch-client";

export function RegisterForm() {
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    whatsapp: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "As senhas não coincidem",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetchRegister(formData);

      if (response.ok) {
        toast({
          title: "Sucesso",
          variant: "default",
          description: response.message || "Cadastro realizado com sucesso!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erro",
          description: response.message || "Erro ao realizar cadastro",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || "Erro ao realizar cadastro",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  return (
    <div className="space-y-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nome</Label>
            <Input
              id="firstName"
              placeholder="John"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Sobrenome</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="exemplo@gmail.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPasswords ? "text" : "password"}
              placeholder="******"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPasswords(!showPasswords)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPasswords ? (
                <EyeOff className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Eye className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar senha</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showPasswords ? "text" : "password"}
              placeholder="******"
              required
              value={confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPasswords(!showPasswords)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPasswords ? (
                <EyeOff className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Eye className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="whatsapp">Número do WhatsApp</Label>
          <Input
            id="whatsapp"
            type="tel"
            placeholder="ex: 11999999999"
            required
            value={formData.whatsapp}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Criando conta..." : "Criar conta"}
        </Button>
      </form>
      <GoogleButton />
      <p className="text-center text-sm">
        Já possui uma conta?{" "}
        <Link
          href="/entrar"
          className="text-blue-600 dark:text-blue-500 hover:underline"
        >
          Entrar
        </Link>
      </p>
    </div>
  );
}
