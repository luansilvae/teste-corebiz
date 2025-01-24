import React, { Fragment, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

import styles from "./newsletter.module.scss";

interface FormData {
  name: string;
  email: string;
}

export const Newsletter: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [submitedNewsletter, setSubmitedNewsletter] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      setSubmitedNewsletter(false);
      setErrorMessage(null);

      const response = await axios.post(
        "https://corebiz-test-server.onrender.com/api/v1/newsletter",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSubmitedNewsletter(true);
        reset();
      } else {
        throw new Error("Ocorreu um erro inesperado ao enviar os dados.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Erro ao enviar os dados."
        );
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Ocorreu um erro desconhecido. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.newsletter}>
      {submitedNewsletter ? (

        <div className={styles.newsletter__success}>
          <strong className={styles.newsletter__successMessage}>
            Seu e-mail foi cadastrado com sucesso!
            <span> A partir de agora você receberá as novidade e ofertas exclusivas.</span>
          </strong>
          <button className={styles.newsletter__successButton} onClick={() => setSubmitedNewsletter(false)}>
            Cadastrar novo e-mail
          </button>
        </div>
      ) : (
        <Fragment>
          <h3 className={styles.newsletter__title}>
            Participe de nossas news com promoções e novidades!
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.newsletter__form}
          >
            <div className={styles.newsletter__inputGroup}>
              <input
                className={`${styles.newsletter__input} ${
                  errors.name && styles["newsletter__input--error"]
                }`}
                placeholder="Digite seu nome"
                id="name"
                {...register("name", { required: "Preencha com seu nome completo" })}
              />
              {errors.name && (
                <span className={styles.newsletter__error}>
                  {errors.name.message?.toString()}
                </span>
              )}
            </div>

            <div className={styles.newsletter__inputGroup}>
              <input
                className={`${styles.newsletter__input} ${
                  errors.email && styles["newsletter__input--error"]
                }`}
                id="email"
                type="email"
                placeholder="Digite seu email"
                {...register("email", {
                  required: "E-mail é obrigatório",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Preencha com um e-mail válido",
                  },
                })}
              />
              {errors.email && (
                <span className={styles.newsletter__error}>
                  {errors.email.message?.toString()}
                </span>
              )}
            </div>

            <button type="submit" className={styles.newsletter__submit}>
              {isLoading ? "Enviando..." : "Eu quero!"}
            </button>
          </form>
        </Fragment>
      )}

      {errorMessage && (
        <p className={styles.newsletter__submitError}>{errorMessage}</p>
      )}
    </section>
  );
};
