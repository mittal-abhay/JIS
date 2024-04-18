import React, { useEffect, useState } from "react";
import Login from "../LoginPage"; 
import Register from "../RegisterPage"; 
import styles from "./landingPage.module.css";
const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("User"));
//     if (user) {
//       // Redirect if user is already logged in
//       // Example: navigate("/chats");
//     }
//   }, []);

  return (
    <div className={styles.homepage}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.illustration}>
            {/* <img src={loginImg} alt="login" /> */}
          </div>
        </div>
        <div className={styles.right}>
          {isLogin ? (
            <>
              <Login />
              <div className={styles.info}>
                Don't have an account?{" "}
                <span className={styles.link} onClick={() => setIsLogin(false)}>
                  Register
                </span>
              </div>
            </>
          ) : (
            <>
              <Register />
              <div className={styles.info}>
                Already have an account?{" "}
                <span className={styles.link} onClick={() => setIsLogin(true)}>
                  Login
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
