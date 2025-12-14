import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, size = "lg", ...props }, ref) => {
    const sizeClasses = {
      sm: "max-w-3xl",    // 768px
      md: "max-w-5xl",    // 1024px  
      lg: "max-w-6xl",    // 1152px - Main content width
      xl: "max-w-7xl",    // 1280px - Wide layouts
      full: "max-w-none"  // No max width
    };

    return (
      <div
        ref={ref}
        className={cn(
          "container mx-auto px-4 sm:px-6 lg:px-8",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export { Container };