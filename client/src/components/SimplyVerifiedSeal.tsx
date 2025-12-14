import { Shield, CheckCircle } from "lucide-react";

interface SimplyVerifiedSealProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function SimplyVerifiedSeal({ className = "", size = "md" }: SimplyVerifiedSealProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5", 
    lg: "text-base px-4 py-2"
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <div className={`inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full ${sizeClasses[size]} ${className}`}>
      <div className="flex items-center gap-1">
        <Shield className={`${iconSizes[size]} text-green-600`} />
        <CheckCircle className={`${iconSizes[size]} text-green-600`} />
      </div>
      <span className="font-medium text-green-800">
        SimplyVerified
      </span>
    </div>
  );
}