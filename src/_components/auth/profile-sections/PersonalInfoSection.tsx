import { Label } from "@/_components/ui/label";
import { ProfileFormData } from "@/_auth/types/auth.types";
import { insertMaskInCpf, insertMaskInPhone } from "@/lib/helpers/masks";
import { validateCPF } from "@/lib/helpers/validator-cpf";
import { validatePhone } from "@/lib/helpers/validator-phone";
import { useState } from "react";
import { Input } from "@/_components/ui/input";

interface PersonalInfoSectionProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsCpfValid: (value: boolean) => void;
  setIsPhoneValid: (value: boolean) => void;
}

export const PersonalInfoSection = ({
  formData,
  onChange,
  setIsCpfValid,
  setIsPhoneValid,
}: PersonalInfoSectionProps) => {
  const [localCpfValid, setLocalCpfValid] = useState(true);
  const [localPhoneValid, setLocalPhoneValid] = useState(true);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = insertMaskInCpf(e.target.value);
    e.target.value = maskedValue;
    const cpfValue = maskedValue.replace(/\D/g, "");
    const isValid = cpfValue.length === 0 || validateCPF(cpfValue);
    setLocalCpfValid(isValid);
    setIsCpfValid(isValid);
    onChange(e);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = insertMaskInPhone(e.target.value);
    e.target.value = maskedValue;
    const isValid = maskedValue.length === 0 || validatePhone(maskedValue);
    setLocalPhoneValid(isValid);
    setIsPhoneValid(isValid);
    onChange(e);
  };

  return (
    <div>
      <div className="flex flex-col items-start justify-between mt-6 mb-4">
        <h2 className="text-lg font-semibold tracking-tight">
          Informações pessoais
        </h2>
        <h2 className="text-sm tracking-tight text-text-foreground">
          Atualize seus dados pessoais.
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="space-y-2">
            <Label>CPF</Label>
            <Input
              name="cpf"
              value={formData.cpf}
              onChange={handleCpfChange}
              placeholder="CPF"
              maxLength={14}
            />
            {!localCpfValid && (
              <p className="text-red-500 text-sm mt-1">CPF inválido</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Telefone</Label>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="Telefone"
            maxLength={15}
          />
          {!localPhoneValid && (
            <p className="text-red-500 text-sm mt-1">Telefone inválido</p>
          )}
        </div>
      </div>
    </div>
  );
};
