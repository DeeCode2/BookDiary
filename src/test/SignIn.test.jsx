import { describe, expect, test } from "vitest";
import { render, screen} from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "../config/AuthContext";
import SignIn from "../components/registration/SignIn";

//correct headings are rendered
//incorrect email/password should show warning
//clicking links should render correct page

describe("Registration test", () => {
  test("Should show header", () => {
    render(
      <Router>
        <AuthContextProvider>
          <Routes>
            <Route path='/' element={<SignIn />}/>
          </Routes>
        </AuthContextProvider>
      </Router>
    );
    expect(screen.getByText(/Welcome Back/i)).toBeDefined();
  });
});
