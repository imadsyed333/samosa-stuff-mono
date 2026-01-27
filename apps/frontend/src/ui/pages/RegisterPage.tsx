import { Box, Button, Card, TextField } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ErrorBox } from "../components/ErrorBox";
import z from "zod";
import { verifyEmail } from "../../api/authClient";

type RegisterFormErrors = {
  name?: String[] | undefined;
  email?: String[] | undefined;
  password?: String[] | undefined;
  retypePassword?: String[] | undefined;
};

const RegisterFormSchema = z
  .object({
    name: z.string().nonempty({ error: "Must not be empty" }),
    email: z.email(),
    password: z
      .string()
      .min(8, { error: "Must have at least 8 characters" })
      .regex(/[a-z]+/, { error: "Must contain a lower-case letter" })
      .regex(/[A-Z]+/, { error: "Must contain an upper-case letter" })
      .regex(/[0-9]+/, { error: "Must contain a digit" }),
    retypePassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.retypePassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["retypePassword"],
      });
    }
  })
  .refine(
    async (data) => {
      if (data.email) {
        const emailExists = await verifyEmail(data.email);
        return !emailExists;
      }
      return true;
    },
    {
      message: "Email already exists",
      path: ["email"],
    }
  );

export const Register = () => {
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formErrors, setFormErrors] = useState<RegisterFormErrors>({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    retypePassword: "",
  });

  const submitForm = async () => {
    setLoading(true);
    const parsed = await RegisterFormSchema.safeParseAsync(form);
    if (parsed.success) {
      const { name, email, password } = parsed.data;
      register(email, password, name);
    } else {
      const errors = z.flattenError(parsed.error);
      setFormErrors(errors.fieldErrors);
    }
    setLoading(false);
  };

  const handleInput = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setFormErrors({
      ...formErrors,
      [e.target.name]: undefined,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 5,
          gap: 2,
          height: "fit-content",
        }}
        variant="outlined"
      >
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={form.name}
          onChange={(e) => handleInput(e)}
          error={!!formErrors?.name}
        />

        <ErrorBox errors={formErrors?.name || []} />

        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={form.email}
          onChange={(e) => handleInput(e)}
          error={!!formErrors?.email}
        />

        <ErrorBox errors={formErrors?.email || []} />

        <TextField
          label="Password"
          type="password"
          name="password"
          variant="outlined"
          value={form.password}
          onChange={(e) => handleInput(e)}
          error={!!formErrors.password}
        />

        <ErrorBox errors={formErrors?.password || []} />

        <TextField
          label="Re-type Password"
          type="password"
          name="retypePassword"
          variant="outlined"
          value={form.retypePassword}
          onChange={(e) => handleInput(e)}
        />

        <ErrorBox errors={formErrors?.retypePassword || []} />
        <Button
          variant="contained"
          onClick={() => submitForm()}
          loading={loading}
          size="large"
        >
          Sign up
        </Button>
      </Card>
    </Box>
  );
};
