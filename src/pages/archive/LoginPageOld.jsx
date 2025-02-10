import { Button } from "@/components/ui/button";
import { 
    Card, 
    CardContent, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const LoginPage = () => {
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    const [inputUsernameMassage, setInputUsernameMassage] = useState('')
    const [inputPasswordMassage, setInputPasswordMassage] = useState('')

    const [checked, setChecked] = useState(false)

    const handleLogin = () => {
        const usernameIsValid = inputUsername.length >= 3
        const passwordIsValid = inputPassword.length >= 8

        if (!usernameIsValid) {
            alert("Username needs to be 3 characters or more")
            return
        }

        if (!passwordIsValid) {
            alert("Password needs to be 8 characters or more")
            return
        }


        alert(`username: ${inputUsername} | password: ${inputPassword}`)
    }
    
    return (
        <main className="flex flex-col items-center justify-center py-4 px-8 h-[85vh]">
            <form onSubmit={handleLogin} className="w-full max-w-[540px]">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Welcome Back!
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <div>
                        <Label htmlFor="username">Username</Label>
                        <Input 
                            onChange={(e) => { 
                                if (e.target.value.length < 3) {
                                    setInputUsernameMassage("Username needs to be 3 characters or more")
                                } else {
                                    setInputUsernameMassage("")                            
                                }
                                setInputUsername(e.target.value);        
                            }} 
                            id="username"
                        />
                        <p className="text-sm text-muted-foreground pt-1">
                            {inputUsernameMassage}
                        </p>
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input 
                            onChange={(e) => {
                                if (e.target.value.length < 8) {
                                    setInputPasswordMassage("Password needs to be 8 characters or more")
                                } else {
                                    setInputPasswordMassage("")
                                }
                            setInputPassword(e.target.value);
                            }} 
                            type={checked ?  "text" : "password"} id="password"
                        />
                        <p className="text-sm text-muted-foreground pt-1">
                            {inputPasswordMassage}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox 
                        onCheckedChange={(checked) => setChecked(checked)}
                        id="show-password"/>
                        <Label htmlFor="show-password">Show Password</Label>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex flex-col space-y-4 w-full">
                        <Button
                            type="submit"
                            disabled={inputPassword.length < 8 || inputUsername.length < 3} 
                        >
                            Login
                        </Button>
                        <Button variant="link" className="w-full">
                            Sign up instead
                        </Button>
                    </div>
                </CardFooter>
            </Card>
            </form>
        </main>
    )
}

export default LoginPage;