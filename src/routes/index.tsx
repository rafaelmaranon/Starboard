import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTRPC } from "~/trpc/react";
import { Hero } from "~/components/Hero";
import { ProductIdeaForm } from "~/components/ProductIdeaForm";
import { ValidationResults } from "~/components/ValidationResults";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [validationResult, setValidationResult] = useState<any>(null);
  const trpc = useTRPC();
  
  const validateMutation = useMutation(
    trpc.validateProductIdea.mutationOptions({
      onSuccess: (data) => {
        setValidationResult(data.validation);
        toast.success("Product idea validated successfully!");
      },
      onError: (error) => {
        toast.error("Failed to validate product idea. Please try again.");
        console.error("Validation error:", error);
      },
    })
  );

  const handleFormSubmit = (formData: { title: string; description: string; targetMarket?: string }) => {
    const validationPromise = validateMutation.mutateAsync(formData);
    
    toast.promise(validationPromise, {
      loading: "AI is analyzing your product idea...",
      success: "Analysis complete!",
      error: "Analysis failed. Please try again.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <ProductIdeaForm 
              onSubmit={handleFormSubmit}
              isLoading={validateMutation.isPending}
            />
          </div>
          
          <div className="order-1 lg:order-2">
            {validationResult ? (
              <ValidationResults data={validationResult} />
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to validate your idea?</h3>
                  <p className="text-gray-600">Fill out the form to get AI-powered insights about your product idea.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Make Better Product Decisions</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our AI-powered validation helps you understand your market, users, and risks before you invest time and resources into building your product.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
