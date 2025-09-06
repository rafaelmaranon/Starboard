import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, Lightbulb } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Product title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  targetMarket: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ProductIdeaFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export function ProductIdeaForm({ onSubmit, isLoading = false }: ProductIdeaFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <Lightbulb className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Validate Your Product Idea</h2>
          <p className="text-gray-600">Get AI-powered insights from a product manager perspective</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            Product Title *
          </label>
          <input
            id="title"
            type="text"
            placeholder="e.g., AI-powered fitness tracker for remote workers"
            {...register("title")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
            Product Description *
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="Describe your product idea in detail. What problem does it solve? How does it work? What makes it unique?"
            {...register("description")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
          />
          {errors.description && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="targetMarket" className="block text-sm font-semibold text-gray-700 mb-2">
            Target Market <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <input
            id="targetMarket"
            type="text"
            placeholder="e.g., Remote workers aged 25-40, Small business owners, Enterprise teams"
            {...register("targetMarket")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing your idea...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Validate with AI
            </>
          )}
        </button>
      </form>
    </div>
  );
}
