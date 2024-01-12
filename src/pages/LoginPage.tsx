/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const LoginPage = () => {
    const navigate = useNavigate();

    const submitSignIn = async (user: { email: any; passWord: any }) => {
        const response = await fetch(
            "https://mock-api.arikmpt.com/api/user/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: user.email,
                    password: user.passWord,
                }),
            }
        );

        const data = await response.json();
        console.log(data);
        if (data?.data.token) {
            localStorage.setItem("token", data.data.token);
            navigate("/weather");
        }
    };

    const formMik = useFormik({
        initialValues: {
            email: "",
            passWord: "",
        },
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            submitSignIn(values);
            resetForm();
        },

        validationSchema: yup.object({
            email: yup
                .string()
                .email("Email is not valid")
                .required("Valid email is required."),
            passWord: yup
                .string()
                .matches(passwordRules, {
                    message: "Password does not follow the required format.",
                })
                .required(
                    "Password must at least have 5 character, 1 upper case letter, 1 lower case letter, 1 numeric digit."
                ),
        }),
    });

    const { errors, values, handleChange, handleSubmit } = formMik;
    const { email, passWord } = values;

    return (
        <>
            <div className="flex justify-center content-center pt-32">
                <Card className="w-96 bg-opacity-40 bg-teal-700 border-none">
                    <CardHeader>
                        <CardTitle>Login Form</CardTitle>
                        <CardDescription>
                            Please input your registered credential to log in.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} action="#" method="POST">
                            <div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="@john.com"
                                        value={email}
                                        onChange={handleChange("email")}
                                        required
                                    />
                                    {errors.email && <p>{errors.email}</p>}
                                </div>
                                <div className="pb-4">
                                    <Label htmlFor="passWord">Pasword</Label>
                                    <Input
                                        name="passWord"
                                        type="password"
                                        placeholder="Password"
                                        value={passWord}
                                        onChange={handleChange("passWord")}
                                        required
                                    />
                                    {errors.passWord && (
                                        <p>{errors.passWord}</p>
                                    )}
                                </div>
                                <Button type="submit">Log In</Button>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                navigate("/register");
                            }}
                        >
                            Register an Account
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
};

export default LoginPage;
