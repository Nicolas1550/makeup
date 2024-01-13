"use client";
import React, { useState, useEffect, Fragment, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store/appHooks";
import { logout } from "../../../redux/authSlice/authSlice";
import { openLoginModal } from "../../../redux/loginModalSlice/loginModalSlice";
import AdminLogin from "../../admin/login/loginUserAdmin/loginUserAdmin";
import ModalPanel from "../../admin/modalPanel/modalPanel/modalPanel";
import DropdownMenu from "../dropDownMenu/DropdownMenuu";
import Cart from "../../products/cart/cartComponent/cart";
import ModalConfirmacionCompra from "../../ModalConfirmacionCompra/modalConfirmacion/modalConfirmacion/modalConfirmacionCompra";
import Historial from "../../ModalConfirmacionCompra/historial/historial/historial";
import Modal from "../../ModalConfirmacionCompra/modalOrders/modalOrders/modalOrders";
import {
  AdminButton,
  CartIconContainer,
  CartItemCount,
  DesktopNavLinks,
  InnerMenuContent,
  LoginButton,
  LogoImage,
  LogoSection,
  LogoText,
  MobileMenuContainer,
  NavbarContainer,
  NavbarInner,
  UserButton,
  UserSection,
  colors,
} from "../navbarStyles/navbarStyles";
import { verifyToken } from "../../../redux/authSlice/authThunks";
import Badge from "@mui/material/Badge";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink as StyledNavLink } from "../navbarStyles/navbarStyles";
import {
  InnerMenuContainer,
  MenuWrapper,
  MobileMenuButton,
} from "../navbarStyles/navBarResponsiveStyles";
import MenuIcon from "@mui/icons-material/Menu";
import { useSocket } from "../../admin/login/loginUserAdmin/useSocket";

const linkVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};

interface NavLinkProps {
  href: string;
  label: string;
}
const menuContainerVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const dropdownVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.5,
    },
    display: "block",
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      ease: "easeInOut",
      duration: 0.5,
      transitionEnd: {
        display: "none",
      },
    },
  },
};
const NavLink: React.FC<NavLinkProps> = React.memo(function NavLink({
  href,
  label,
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isHovered, setIsHovered] = useState(false);
  return (
    <StyledNavLink
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </StyledNavLink>
  );
});
const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};
const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const newOrdersCount = useAppSelector((state) => state.order.newOrdersCount);
  const userRoles = useAppSelector((state) => state.auth.userRoles) || [];
  const isLoginModalOpen = useAppSelector(
    (state) => state.loginModal.isLoginModalOpen
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comprobanteCargado, setComprobanteCargado] = useState<{
    comprobante: File;
  } | null>(null);
  useSocket();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [userClicked, setUserClicked] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [windowWidth, windowHeight] = useWindowSize();
  // Dentro de Navbar
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const isMobile = windowWidth < 768; // Define un umbral para la versión móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const menuButtonVariants = {
    opened: {
      rotate: 45,
      scale: 1.1,
      backgroundColor: "#6e6e6e",
      color: "#ffffff",
      transition: {
        rotate: {
          type: "spring",
          stiffness: 200,
          damping: 12,
        },
        backgroundColor: {
          duration: 0.3,
        },
      },
    },
    closed: {
      rotate: 0,
      scale: 1,
      backgroundColor: colors.pinkDark,
      color: colors.neutralLight,
      transition: {
        rotate: {
          type: "spring",
          stiffness: 100, // Menor rigidez para una transición más suave
          damping: 20, // Mayor amortiguación para una transición más fluida
        },
        backgroundColor: {
          duration: 0.3,
        },
      },
    },
  };
  const totalItemsInCart = cartItems.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );
  const openConfirmationModal = () => setIsConfirmationOpen(true);
  const closeConfirmationModal = () => setIsConfirmationOpen(false);
  const MotionMenuButton = motion(MobileMenuButton);
  const isReservationsModalOpen = useAppSelector(
    (state) => state.reservationsModal.isReservationsModalOpen
  );
  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowCartModal(false);
      dispatch(openLoginModal());
    } else {
      setShowCartModal(false);
      openConfirmationModal();
    }
  };
  const handleLogout = () => dispatch(logout());

  // Manejar clic en el botón de usuario
  const handleUserButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Alternar el estado del menú desplegable
    setIsDropdownOpen(!isDropdownOpen);

    // Detener la propagación para evitar que se active handleClickOutside
    event.stopPropagation();
  };

  const handleSuccessfulLogin = () => {
    setIsDropdownOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Agrega la comprobación para el modal de órdenes
      const isAnyModalOpen = isReservationsModalOpen || isHistoryModalOpen;

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        !isAnyModalOpen // Ahora se verifica si alguno de los modales está abierto
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isReservationsModalOpen, isHistoryModalOpen]); // Incluye ambos estados en las dependencias

  ``;

  useEffect(() => {
    const handleScroll = () => {
      // Comprueba si el menú está abierto y si no se muestra ninguno de los modales
      if (isDropdownOpen && !isReservationsModalOpen && !isHistoryModalOpen) {
        setIsDropdownOpen(false);
      }
    };

    // Añadir listener para el scroll
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Limpiar el listener para el scroll
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDropdownOpen, isReservationsModalOpen, isHistoryModalOpen]);

  const handleMobileMenuToggle = () => {
    // Cambiar el estado del menú móvil
    setIsMenuOpen(!isMenuOpen);

    // Si el menú móvil se está cerrando, también cierra el DropdownMenu
    if (isMenuOpen && isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    console.log("isDropdownOpen changed to:", isDropdownOpen);
  }, [isDropdownOpen]);
  useEffect(() => {
    console.log("useEffect - verifyToken, isDropdownOpen:", isDropdownOpen);
  }, [isDropdownOpen, dispatch]);
  useEffect(() => {
    if (isDropdownOpen && isMobile) {
      // Asegúrate de que este tiempo de espera sea suficiente para la animación
      setTimeout(() => {
        if (dropdownContainerRef.current) {
          // Cambia 'block' a 'start' o 'end' según sea necesario
          dropdownContainerRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100); // Ajusta este tiempo según sea necesario
    }
  }, [isDropdownOpen, isMobile]);
  /* useEffect(() => {
    // Elimina el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); */
  useEffect(() => {
    // Lógica para manejar el cierre del menú
    if (!isDropdownOpen && userClicked) {
      // Realiza acciones necesarias aquí
      setUserClicked(false); // Restablece el estado
    }
  }, [isDropdownOpen, userClicked]);
  useEffect(() => {
    const verifyUserToken = async () => {
      try {
        await dispatch(verifyToken()).unwrap();
      } catch (error) {
        console.log("Token verification failed. Logging out.");
        dispatch(logout());
        if (isDropdownOpen) {
          setIsDropdownOpen(false);
        }
      }
    };
    verifyUserToken();
  }, [dispatch, isDropdownOpen]);
  const handleCloseConfirmationModal = () => {
    setIsConfirmationOpen(false);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <NavbarContainer>
      <NavbarInner>
        <LogoSection>
          <LogoImage
            src="/img/logo.png"
            alt="Makeup Magic Logo"
            width={100}
            height={50}
          />
          <LogoText>Fabiana Gimenez</LogoText>
        </LogoSection>

        {isMobile ? (
          <>
            {/* Botón para abrir/cerrar el menú móvil */}
            <MotionMenuButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isMenuOpen ? "opened" : "closed"}
              variants={menuButtonVariants}
              onClick={handleMobileMenuToggle} // Utiliza la nueva función aquí
            >
              <MenuIcon fontSize="large" />
            </MotionMenuButton>
            <AnimatePresence>
              {isMenuOpen && (
                <MenuWrapper>
                  <motion.div
                    variants={menuContainerVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <MobileMenuContainer
                      variants={menuContainerVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      <InnerMenuContainer>
                        <InnerMenuContent>
                          <motion.div
                            variants={linkVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                          >
                            <NavLink href="/" label="Inicio" />
                          </motion.div>
                          <motion.div
                            variants={linkVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                          >
                            <NavLink href="/products" label="Productos" />
                          </motion.div>

                          <motion.div
                            variants={linkVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                          >
                            <NavLink href="/acercaDe" label="Sobre Nosotros" />
                          </motion.div>
                          <motion.div
                            variants={linkVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                          >
                            <NavLink href="/contacto" label="Contacto" />
                          </motion.div>
                          <motion.div
                            variants={linkVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                          >
                            <CartIconContainer
                              onClick={() => {
                                setShowCartModal(true);
                                setIsMenuOpen(false);
                              }}
                            >
                              🛒
                              <CartItemCount>{totalItemsInCart}</CartItemCount>
                            </CartIconContainer>
                          </motion.div>
                          {isAuthenticated ? (
                            <UserSection>
                              <UserButton
                                ref={buttonRef}
                                onClick={handleUserButtonClick}
                              >
                                <Badge
                                  badgeContent={newOrdersCount}
                                  color="error"
                                >
                                  👤
                                </Badge>
                              </UserButton>
                              <AnimatePresence>
                                {isDropdownOpen && (
                                  <motion.div
                                    ref={dropdownContainerRef} // Agrega la referencia aquí
                                    variants={dropdownVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                  >
                                    <DropdownMenu
                                      onLogout={handleLogout}
                                      onViewHistory={() =>
                                        setIsHistoryModalOpen(true)
                                      }
                                      toggleDropdown={toggleDropdown}
                                      closeDropdown={() =>
                                        setIsDropdownOpen(false)
                                      }
                                      buttonRef={buttonRef} // Si lo estás utilizando en DropdownMenu
                                    />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </UserSection>
                          ) : (
                            <LoginButton
                              onClick={() => dispatch(openLoginModal())}
                            >
                              Iniciar Sesión
                            </LoginButton>
                          )}
                        </InnerMenuContent>
                      </InnerMenuContainer>
                    </MobileMenuContainer>
                  </motion.div>
                </MenuWrapper>
              )}
            </AnimatePresence>
          </>
        ) : (
          <DesktopNavLinks>
            <NavLink href="/" label="Inicio" />
            <NavLink href="/products" label="Productos" />
            {isAuthenticated && userRoles?.includes("admin") && (
              <AdminButton onClick={() => setShowAdminModal(true)}>
                Panel de Administración
              </AdminButton>
            )}
            <NavLink href="/acercaDe" label="Sobre Nosotros" />
            <NavLink href="/contacto" label="Contacto" />
            <CartIconContainer onClick={() => setShowCartModal(true)}>
              <Badge badgeContent={totalItemsInCart} color="error">
                🛒
              </Badge>
            </CartIconContainer>
            {isAuthenticated ? (
              <UserSection>
                <UserButton ref={buttonRef} onClick={handleUserButtonClick}>
                  <Badge badgeContent={newOrdersCount} color="error">
                    👤
                  </Badge>
                </UserButton>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      ref={dropdownContainerRef}
                    >
                      {/* Componente DropdownMenu */}
                      <DropdownMenu
                        onLogout={handleLogout}
                        onViewHistory={() => setIsHistoryModalOpen(true)}
                        toggleDropdown={toggleDropdown}
                        closeDropdown={() => setIsDropdownOpen(false)}
                        ref={dropdownRef} // Aquí pasas la referencia al contenedor principal del menú
                        buttonRef={buttonRef}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </UserSection>
            ) : (
              <LoginButton onClick={() => dispatch(openLoginModal())}>
                Iniciar Sesión
              </LoginButton>
            )}
          </DesktopNavLinks>
        )}
      </NavbarInner>

      <Fragment>
        {isLoginModalOpen && <AdminLogin onSuccess={handleSuccessfulLogin} />}
        {showAdminModal && (
          <ModalPanel
            isOpen={showAdminModal}
            onClose={() => setShowAdminModal(false)}
          />
        )}
        {showCartModal && (
          <Cart
            onClose={() => setShowCartModal(false)}
            onCheckout={handleCheckout}
          />
        )}
        <Modal
          isOpen={isHistoryModalOpen}
          title="Historial de Órdenes"
          onClose={() => setIsHistoryModalOpen(false)}
        >
          <Historial />
        </Modal>
        <ModalConfirmacionCompra
          isOpen={isConfirmationOpen}
          onClose={closeConfirmationModal}
          onContinuar={closeConfirmationModal}
          loadedComprobante={comprobanteCargado?.comprobante}
          closeModal={handleCloseConfirmationModal} // Nueva prop
        />
      </Fragment>
    </NavbarContainer>
  );
};

export default Navbar;
