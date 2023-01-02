import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSignup } from "@/requests/auth";
import { toast } from "react-toastify";
import NoSSR from "@/components/NoSSR";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/router";

const signupSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const SignupForm = () => {
  const route = useRouter();

  const { mutate, isLoading } = useSignup(
    () => {
      toast.success("Signup success", {
        toastId: "signup-success",
      });

      // Redirect to login page
      route.push("/login");
    },
    (error) => {
      toast.error(error.message, {
        toastId: "signup-error",
      });
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth.Signup.Payload>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (formData: Auth.Signup.Payload) => {
    mutate(formData);
  };

  return (
    <NoSSR>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 p-6 lg:p-10 w-full bg-gray-dark rounded-lg"
      >
        <h1 className="text-3xl font-bold text-center w-72 lg:w-80">Sign up</h1>
        <div className="flex flex-col gap-7">
          <TextInput label="Email" type="text" {...register("email")} />
          <TextInput
            label="Password"
            placeholder="******"
            type="password"
            {...register("password")}
          />
          <Button
            type="submit"
            loading={isLoading}
            disabled={Object.keys(errors).length > 0}
          >
            Submit
          </Button>
        </div>
        <div className="flex justify-center items-center gap-4 text-center">
          <p>Already have account?</p>
          <Link href="/login">
            <a className="text-yellow underline">Log in</a>
          </Link>
        </div>
      </form>
    </NoSSR>
  );
};

export default SignupForm;
