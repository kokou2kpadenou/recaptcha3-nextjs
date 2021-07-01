import Proptypes from "prop-types";
import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [submit, setSubmit] = useState("REGISTER");
  const [result, setResult] = useState({});

  useEffect(() => {
    setSubmit(() => {
      if (completed) return "RESET";
      if (processing) return "PROCESSING";
      return "REGISTER";
    });
  }, [processing, completed]);

  const handleSubmit = (e) => {
    //
    e.preventDefault();

    if (completed) {
      setCompleted(false);
      setName("");
      setEmail("");
      setResult({});
    } else {
      setProcessing(true);

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(SITE_KEY, { action: "submit" })
          .then(async (token) => {
            /* send data to the server */

            const body = {
              name,
              email,
              recaptchaResponse: token,
            };

            try {
              const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json;chaset=utf-8" },
                body: JSON.stringify(body),
              });
              if (response.ok) {
                const json = await response.json();
                setResult(json);
              } else {
                throw new Error(response.statusText);
              }
            } catch (error) {
              setResult({ message: error.message });
            }

            /* End of the sending data */

            setProcessing(false);
            setCompleted(true);
          });
      });
    }
  };

  return (
    <>
      <Head>
        <title>reCaptcha v3 with Next.js</title>
        <meta name="description" content="reCaptcha v3 in Next.js" />
        <link rel="icon" href="/favicon.ico" />
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>reCaptcha v3 with Next.js</h1>
        <p className={styles.description}>
          This shows how to use reCAPTCHA v3 with Next.js without any libraries.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              disabled={processing || completed}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              disabled={processing || completed}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="submit"
              value={submit}
              disabled={!name || !email || processing}
            />
          </div>
        </form>

        <DisplayResult result={result} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.kpadenou.net"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source Code
        </a>
      </footer>
    </>
  );
}

const DisplayResult = ({ result }) => (
  <>
    {result && Object.keys(result).length > 0 && result.constructor === Object && (
      <div
        className={styles.output}
        style={{
          backgroundColor: result.success
            ? "rgba(0, 0, 255, 0.1)"
            : "rgba(255, 0, 0, 0.1)",
          borderColor: result.success ? "#00f" : "#f00",
        }}
      >
        <div className={styles.result}>{`Registration ${
          result.success ? "successfull" : "failed"
        }`}</div>
        <strong>Output:</strong>
        <br />
        <pre>{JSON.stringify(result, undefined, 2)}</pre>
      </div>
    )}
  </>
);

DisplayResult.propTypes = {
  result: Proptypes.shape({}).isRequired,
};
