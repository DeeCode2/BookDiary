import { describe, expect, test } from "vitest";
import { render, screen} from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "../config/AuthContext";
import SignUp from "../components/registration/SignUp";

//correct headings are rendered
//clicking links should render correct page

describe("Registration test", () => {
  test("Should show header", () => {
    render(
      <Router>
        <AuthContextProvider>
          <Routes>
            <Route path='/' element={<SignUp />}/>
          </Routes>
        </AuthContextProvider>
      </Router>
    );
    expect(screen.getByText(/Create an account/i)).toBeDefined();
  });
});
