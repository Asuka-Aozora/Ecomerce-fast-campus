import { Button } from "@/components/ui/button";
import { 
    Card, 
    CardContent, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { 
    Form, 
    FormItem,
    FormMessage,
    FormLabel,
    FormField,
    FormControl,
    FormDescription
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/lib/axios";
import { GuestPage } from "@/components/guard/GuestPage";
import { useDispatch } from "react-redux";

const registerFormSchema = z.object({
    username: z.string()
        .min(3, "Your username is under 3 characters")
        .max(16, "Your username is over 16 characters")
        .refine((val) => !val.includes(" "), {
            message: "Username should not contain spaces",
        }),
    password: z
        .string()
        .min(8, "Your password is under 8 characters"),
    confirmPassword: z
        .string()
    
})
.superRefine(({ password, confirmPassword: confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ["confirmPassword"],
        })
    }
});

const RegisterPage = () => {    
    const dispatch = useDispatch()
    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
        },
        resolver: zodResolver(registerFormSchema),
        reValidateMode: "onSubmit",
    });


    const handleRegister = async (values) => {
        try {
            const userResponse = await axiosInstance.get("/users", {
                params: {
                    username: values.username
                }
            });

            if (userResponse.data.length) {
                alert("Username already taken");
                return;
            }

            const newUserResponse = await axiosInstance.post("/users", {
                username: values.username.trim(),
                password: values.password,
                role: "user",
            });

            alert("User Registered");

            dispatch({
                type: "USER_LOGIN",
                payload: {
                    username: values.username,
                    id: newUserResponse.data.id,
                }
            });

            localStorage.setItem("current-user", newUserResponse.data.id);

            form.reset();
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <GuestPage>
        <main className="flex flex-col items-center justify-center py-4 px-8 mt-2 h-[105vh]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleRegister)} className="w-full max-w-[540px]">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Create an account!
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field}/>
                                    </FormControl>
                                    <FormDescription>
                                        Username has to be between 3 and 16 characters
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />                           
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password"/>
                                    </FormControl>
                                    <FormDescription>
                                        Password has to be 8 characters or more
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />      

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Repeat Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password"/>
                                    </FormControl>
                                    <FormDescription>
                                        Make sure your password match
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />     

                    </CardContent>
                    <CardFooter>
                        <div className="flex flex-col space-y-4 w-full">
                            <Button
                                type="submit"
                            >
                                Register
                            </Button>
                            <Button variant="link" className="w-full">
                                Log in instead
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
                </form>
            </Form>
        </main>
    </GuestPage>

    )
}

export default RegisterPage;