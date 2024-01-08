import React, { useState, useEffect, useCallback } from "react";
import "./stylesLogin.css";
import { BeatLoader } from "react-spinners";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../redux/store/appHooks";
import { RootState } from "../../../../redux/store/rootReducer";
import {
  loginUser,
  registerUser,
} from "../../../../redux/authSlice/authThunks";
import { closeLoginModal } from "../../../../redux/loginModalSlice/loginModalSlice";
import {
  setLoginMessage,
  setLoginError,
  clearMessages,
  setLoading,
} from "../../../../redux/messagesSlice/messagesSlice";
import jwt from "jsonwebtoken";
import ForgotPasswordModal from "./forgotPasswordModal";
import styled from "styled-components";
const PasswordInputContainer = styled.div`
  position: relative;
  width: 100%;

  input {
    width: 100%;
    // Otros estilos para el input
  }

  button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    cursor: pointer;
    width: 25px !important; // Ancho más angosto para el botón
    height: 25px !important; // Puedes ajustar la altura también si es necesario
    // Otros estilos para el botón
  }
`;

interface AdminLoginProps {
  onRequestClose?: () => void;
  onSuccess?: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();
  const isLoginModalOpen = useAppSelector(
    (state: RootState) => state.loginModal.isLoginModalOpen
  );
  const isLoading = useAppSelector(
    (state: RootState) => state.messages.isLoading
  );
  const loginMessage = useAppSelector(
    (state: RootState) => state.messages.loginMessage
  );
  const loginError = useAppSelector(
    (state: RootState) => state.messages.loginError
  );
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setUsername("");
    setPassword("");
    setEmail("");
    dispatch(clearMessages());
  }, [dispatch]);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleModalClose = useCallback(() => {
    dispatch(closeLoginModal());
    setUsername("");
    setPassword("");
    setEmail("");
    dispatch(clearMessages());
  }, [dispatch]);
  const handleOpenForgotPasswordModal = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Evita que el formulario se envíe
    event.stopPropagation(); // Detiene la propagación del evento
    setIsForgotPasswordModalOpen(true);
  };

  // Función para cerrar el modal de restablecimiento de contraseña
  const handleCloseForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(false);
  };
  const handleSignInClick = () => setIsSignUp(false);
  const handleSignUpClick = () => setIsSignUp(true);
  useEffect(() => {
    if (isDropdownOpen) {
      /*       console.log("Dropdown está abierto");
       */
    }
  }, [isDropdownOpen]);
  useEffect(() => {
    if (loginMessage) {
      if (loginMessage === "Registro exitoso") {
        setIsSignUp(false);
      } else if (loginMessage === "Inicio de sesión exitoso") {
        setTimeout(() => {
          handleModalClose();
          dispatch(setLoading(false));
        }, 2000);
      }
    }
  }, [loginMessage, dispatch, handleModalClose]);

  const handleSubmitSignIn = (usernameOrEmail: string, password: string) => {
    dispatch(loginUser({ usernameOrEmail, password }))
      .then((action) => {
        if (loginUser.fulfilled.match(action)) {
          dispatch(setLoginMessage("Inicio de sesión exitoso"));
          setIsDropdownOpen(false);
          if (typeof onSuccess === "function") {
            onSuccess();
          }

          // Decodificar el token JWT
          const token = localStorage.getItem("jwt");
          console.log("Token obtenido del localStorage:", token); // Asegúrate de que este log muestra el token.
          if (token) {
            const decodedToken = jwt.decode(token);
            console.log("Token decodificado:", decodedToken); // Verifica la estructura del token decodificado aquí.
            if (
              decodedToken &&
              typeof decodedToken === "object" &&
              "id" in decodedToken
            ) {
              console.log("ID del usuario:", decodedToken.id);
            }
          }
        }
      })
      .catch((error) => {
        console.log("Error:", error); // Imprimir el error completo
        if (error.response && error.response.status === 400) {
          dispatch(setLoginError("Correo o contraseña incorrectos"));
        } else {
          dispatch(setLoginError("Error al iniciar sesión"));
        }
      });
  };

  const handleSubmitSignUp = (
    username: string,
    password: string,
    email: string
  ) => {
    dispatch(registerUser({ username, password, email }))
      .then((action) => {
        if (registerUser.fulfilled.match(action)) {
          dispatch(setLoginMessage("Registro exitoso"));
          dispatch(setLoginError(null));
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          dispatch(setLoginError("Error al registrar el usuario"));
        } else {
          dispatch(
            setLoginError(
              "Error desconocido al registrarse. Por favor, intente nuevamente."
            )
          );
        }
      });
  };

  if (!isLoginModalOpen) return null;
  return (
    <div className="container">
      <div className={`main ${isSignUp ? "sing-up" : "sing-in"}`}>
        <div className="sing-in-form form-container">
          <h1>Iniciar Sesion</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitSignIn(username, password);
            }}
          >
            <input
              type="text"
              placeholder="Nombre de usuario o correo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <PasswordInputContainer>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={(event) => {
                  event.preventDefault();
                  togglePasswordVisibility();
                }}
              >
                👁️
              </button>
            </PasswordInputContainer>

            <button type="submit" className="form-button" disabled={isLoading}>
              {isLoading ? (
                <BeatLoader size={8} color={"#123abc"} />
              ) : (
                "Iniciar sesión"
              )}
            </button>

            {loginError && <div style={{ color: "red" }}>{loginError}</div>}
            {loginMessage && (
              <div style={{ color: "green" }}>{loginMessage}</div>
            )}

            {/* Enlace para restablecer contraseña */}
            <div className="forgot-password-link">
              <button
                onClick={(event) => handleOpenForgotPasswordModal(event)}
                className="link-style-button"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </form>
        </div>

        <div className="sing-up-form form-container">
          <h1>Regístrate</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitSignUp(username, password, email);
            }}
          >
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInputContainer>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={(event) => {
                  event.preventDefault();
                  togglePasswordVisibility();
                }}
              >
                👁️
              </button>
            </PasswordInputContainer>

            <button type="submit" className="form-button" disabled={isLoading}>
              {isLoading ? (
                <BeatLoader size={8} color={"#123abc"} />
              ) : (
                "Registrarse"
              )}
            </button>

            {loginError && <div style={{ color: "red" }}>{loginError}</div>}
            {loginMessage && (
              <div style={{ color: "green" }}>{loginMessage}</div>
            )}
          </form>
        </div>

        <div className={`sliding-board ${isSignUp ? "" : "sliding"}`}>
          <div className="wide-board">
            <div className={`board sing-in ${isSignUp ? "" : "sliding"}`}>
              <h1>¡Bienvenide de nuevo!</h1>
              <p className="p">
                Para seguir conectade con nosotros, por favor inicia sesión con
                tus datos.
              </p>
              <button onClick={handleSignInClick} className="board-button">
                Iniciar sesión
              </button>
            </div>
            <div className={`board sing-up ${isSignUp ? "sliding" : ""}`}>
              <h1>¡Hola!</h1>
              <p>
                Ingresa tus datos personales y comienza tu experiencia con
                nosotros.
              </p>
              <button onClick={handleSignUpClick} className="board-button">
                Regístrate
              </button>
            </div>
          </div>
          <button
            onClick={handleModalClose}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            X
          </button>
        </div>
      </div>

      {/* Componente ForgotPasswordModal */}
      {isForgotPasswordModalOpen && (
        <ForgotPasswordModal onRequestClose={handleCloseForgotPasswordModal} />
      )}
    </div>
  );
};

export default AdminLogin;
