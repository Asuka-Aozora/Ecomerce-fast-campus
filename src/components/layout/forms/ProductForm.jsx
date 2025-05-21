import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const productFormSchema = z.object({
    name: z
        .string()
        .min(3, "Your product is under 3 characters")
        .max(80, "Your product is over 16 characters"),
    price: z
        .coerce.number()
        .min(10000, "Price cannot be under Rp 10.000"),
    stock: z
        .coerce.number()
        .min(1, "Stock cannot be under 1"),
    imageUrl: z
        .string()
        .url("User a valid URL"),
});

const ProductForm = (props) => {
  const {
    onSubmit,
    cardTitle,
    defaultName,
    defaultPrice,
    defaultStock,
    defaultImageUrl,
    loading,
  } = props;

    
  const form = useForm({
    defaultValues: {
      name: defaultName || "",
      price: defaultPrice || 0,
      stock: defaultStock || 0,
      imageUrl: defaultImageUrl || "",
    },
    resolver: zodResolver(productFormSchema),
    mode: "onChange",
  });

  return (
    <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-[540px] w-full">
            <Card>
              <CardHeader>
                <CardTitle className="font-bold">{cardTitle}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormDescription>
                            Product name has to be between 3 and 80 characters
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                            <Input type="number" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                            <Input type="number" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Product Image</FormLabel>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormDescription>
                            Please use a valid image URL
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </CardContent>
              <CardFooter> 
                <Button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 px-4 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
                  `}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-2 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        ></path>
                      </svg>
                      Submiting...
                    </div>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
  )
}

export default ProductForm
