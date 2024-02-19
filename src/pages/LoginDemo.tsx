import {
  Box,
  Button,
  Input,
  Stack,
  Text,
  UseToastOptions,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useDemo from "../hooks/useDemo";
import { DemoData } from "../interfaces/DemoData";
import { LoginData } from "../interfaces/LoginData";

const LoginTest = () => {
  const toast = useToast();

  const showToast = (title: string, status: UseToastOptions["status"]) => {
    toast({
      title: title,
      status: status,
      position: "top",
      duration: 3000,
      isClosable: true,
    });
  };

  const [logindata, setLogindata] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [token, setToken] = useState<string | null>(null);
  const [demoData, setDemoData] = useState<DemoData | null>(null);

  const loginMutation = useAuth();
  const useDemoDataMutation = useDemo();

  const handleLogin = () => {
    loginMutation.mutate(logindata, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        showToast("Login successful", "success");

        // Clear the form
        setLogindata({ email: "", password: "" });
      },
      onError: (error) => {
        console.log(error);
        showToast("Login failed", "error");
      },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    showToast("Logged out", "success");
  };

  const handleGetData = () => {
    useDemoDataMutation.mutate(undefined, {
      onSuccess: (data) => {
        console.log(data);
        setDemoData(data);
        showToast("Data fetched", "success");
      },
      onError: (error) => {
        console.log(error);
        showToast("Data fetch failed", "error");
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogindata({ ...logindata, [name]: value });
  };

  const handleClear = () => {
    setDemoData(null);
  };

  // Used to disable the submit button if the data is not valid
  const validData = logindata?.email !== "" && logindata?.password !== "";

  // Used to disable the get data button if the token is not present
  const canFetch = token !== null;

  return (
    <Box margin={"10%"}>
      <Stack
        spacing={10}
        direction={{ sm: "column", md: "column", lg: "row" }}
        alignItems={"stretch"}
      >
        <Stack spacing={3} width={"100%"}>
          <Text>Email address (admin@admin.com)</Text>
          <Input
            name="email"
            type="email"
            value={logindata.email}
            onChange={handleChange}
          />
          <Text>Password (7EyEjfLXkw)</Text>
          <Input
            name="password"
            type="password"
            value={logindata.password}
            onChange={handleChange}
          />
          <Stack spacing={3} direction={"row"}>
            <Button
              isDisabled={!validData}
              onClick={handleLogin}
              width={"100%"}
              colorScheme="blue"
            >
              Login
            </Button>
            <Button
              isDisabled={!canFetch}
              onClick={handleLogout}
              width={"100%"}
              colorScheme="red"
            >
              Logout
            </Button>
          </Stack>
        </Stack>
        <Stack spacing={3} width={"100%"}>
          <Text
            height={"100%"}
            border={"1px"}
            borderColor={"gray.200"}
            padding={2}
            borderRadius={5}
          >
            {demoData ? JSON.stringify(demoData) : "No data fetched"}
          </Text>
          <Stack spacing={3} direction={"row"}>
            <Button
              onClick={handleGetData}
              isDisabled={!canFetch}
              colorScheme="green"
              width={"100%"}
            >
              {canFetch ? "Request data" : "You need to login to request data"}
            </Button>
            <Button
              isDisabled={!demoData}
              onClick={handleClear}
              width={"100%"}
              colorScheme="red"
            >
              Clear data
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LoginTest;
