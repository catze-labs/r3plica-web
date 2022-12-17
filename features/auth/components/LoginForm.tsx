import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLogin } from "@/requests/auth";
import { toast } from "react-toastify";
import { useSession } from "@/states/session";
import NoSSR from "@/components/NoSSR";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import Link from "next/link";

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const LoginForm = () => {
  const router = useRouter();
  const { saveToken } = useSession();

  const { mutate, isLoading } = useLogin(
    (res) => {
      saveToken({
        sessionTicket: res.SessionTicket,
      });

      toast.success("Login success", {
        toastId: "login-success",
      });

      router.push("/assets");
    },
    (error) => {
      toast.error(error.message, {
        toastId: "login-error",
      });
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth.Login.Payload>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (formData: Auth.Login.Payload) => {
    mutate(formData);
  };

  return (
    <NoSSR>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 p-6 lg:p-10 w-full bg-gray-dark rounded-lg"
      >
        <h1 className="text-3xl font-bold text-center w-72 lg:w-80">Login</h1>
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
            disabled={isLoading || Object.keys(errors).length > 0}
          >
            Submit
          </Button>
        </div>
        <div className="flex justify-center items-center gap-4 text-center">
          <p>Have no account?</p>
          <Link href="/signup">
            <a className="text-yellow underline">Sign Up</a>
          </Link>
        </div>
      </form>
    </NoSSR>
  );
};

export default LoginForm;
