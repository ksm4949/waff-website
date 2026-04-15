import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      toastOptions={{
        classNames: {
          toast: "border shadow-xl",
          success: "bg-emerald-600 text-white border-emerald-700",
          error: "bg-rose-600 text-white border-rose-700",
          warning: "bg-amber-500 text-black border-amber-600",
          info: "bg-sky-600 text-white border-sky-700",
          title: "font-semibold",
          description: "opacity-95",
        },
      }}
      style={
        {
          "--normal-bg": "#0b1f4d",
          "--normal-text": "#ffffff",
          "--normal-border": "#0b1f4d",
        } as Record<string, string>
      }
      {...props}
    />
  );
};

export { Toaster };
