import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@/components/ui/theme-provider-simple";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({error}: {error: Error}) {
  console.error("Application Error:", error);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Application Error</h1>
        <p className="text-gray-600 mb-4">Something went wrong. Please try refreshing the page.</p>
        <pre className="text-sm text-left bg-gray-100 p-4 rounded overflow-auto">
          {error.message}
        </pre>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}

try {
  console.log("Starting application...");
  const rootElement = document.getElementById("root");
  console.log("Root element found:", !!rootElement);
  
  createRoot(rootElement!).render(
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider defaultTheme="light" storageKey="virtualoffices-theme">
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  );
  console.log("Application rendered successfully");
} catch (error) {
  console.error("Failed to render application:", error);
  document.body.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui;">
      <div style="text-align: center; max-width: 500px; padding: 2rem;">
        <h1 style="color: #dc2626; margin-bottom: 1rem;">Application Failed to Load</h1>
        <p style="color: #6b7280; margin-bottom: 1rem;">There was an error starting the application.</p>
        <pre style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; text-align: left; overflow: auto;">${error}</pre>
        <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 0.375rem; cursor: pointer;">
          Refresh Page
        </button>
      </div>
    </div>
  `;
}
