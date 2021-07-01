export default async (req, res) => {
  const SECRET_KEY = process.env.RECAPTCHA_SECRETKEY;

  const { name, email, recaptchaResponse } = req.body;

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${recaptchaResponse}`;

  try {
    const recaptchaRes = await fetch(verifyUrl, { method: "POST" });

    const recaptchaJson = await recaptchaRes.json();

    res.status(200).json({ name, email, ...recaptchaJson });
  } catch (e) {
    res.status(400).json(e.error);
  }
};
