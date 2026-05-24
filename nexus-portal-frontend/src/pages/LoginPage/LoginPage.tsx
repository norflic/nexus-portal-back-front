import {useContext, useEffect, useState} from "react";
import Page from "../Page";
import {type SubmitHandler, useForm} from "react-hook-form";
import Section from "../../components/Section/Section";
import {useMutation} from "@tanstack/react-query";
import {fetchEndpoint, QUERY_KEYS} from "../../utils/endpoint";
import type {User} from "../../models/User";
import type {FailureResponse, SuccessfulResponse} from "../../models/Utility";
import {NexusContext} from "../../NexusContextProvider";

interface IFormInput {
    email: string;
    password: string;
}

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { register, handleSubmit } = useForm<IFormInput>();

  const setContext = useContext(NexusContext).setContext;

  const {
    data: serverReturn,
    isError,
    isPending,
    mutate,
  } = useMutation({
    mutationKey: [QUERY_KEYS.OFFERS],
    mutationFn: (variables: IFormInput) =>
      fetchEndpoint<
        SuccessfulResponse<User> | FailureResponse,
        { data: IFormInput } | undefined
      >("POST", "login", {
        body: { data: variables },
      }),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    mutate(data);
  };

  useEffect(() => {
    if (!serverReturn) return;
    if (!serverReturn.ok) {
      setErrorMessage("Les informations données sont incorrectes");
    } else {
      setContext((prev) => ({ ...prev, user: serverReturn.data }));
    }
  }, [serverReturn]);

  useEffect(() => {
    if (isError) setErrorMessage("Les informations données sont incorrectes");
  }, [isError]);

  if (isPending) return <span>Loading...</span>;

  return (
    <Page name="Login">
      <div className="flex justify-center">
        <Section className="w-150 items-center">
          <h3 className="text-2xl font-bold">Connectez-vous</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center"
          >
            <input
              {...register("email", { required: true })}
              placeholder="Email"
              className="px-4 py-2 mt-12 border border-gray rounded-lg"
            />
            <input
              {...register("password", { required: true })}
              placeholder="Mot de Passe"
              type="password"
              className="px-4 py-2 mt-12 border rounded-lg"
            />
            <input
              type="submit"
              value="Se connecter"
              className="bg-app-blue-dark px-4 py-2 mt-12 rounded-lg border-blue-600 text-white hover:bg-app-blue hover:cursor-pointer"
            />
          </form>
          <p className="mt-4 text-red-600">{errorMessage}</p>
        </Section>
      </div>
    </Page>
  );
}
