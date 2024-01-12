import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaRegSmile, FaRegEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/rootReducer";
import {
  setSearchTerm,
  setPriceRange,
  setSelectedColor,
  setSelectedMarca,
  setSelectedCategory,
} from "../../../../redux/ProductsFilterSlice/filterSlice";
import {
  SidebarTitle,
  StickyFilterContainer,
  FilterSectionItem,
  HamburgerButton,
  colors,
} from "../sideBarStyles/sideBarStyle";
import {
  PriceRangeInputs,
  PriceRangeContainer,
} from "../sideBarStyles/priceRangeStyles";
import { FilterInput, PriceRangeInput } from "../sideBarStyles/inputStyles";
import { FilterButtons } from "../sideBarStyles/buttonStyles";
import Slider from "@mui/material/Slider";

import { makeStyles } from "@mui/styles";
import {
  setSidebarExpanded,
  setSidebarOpenedByButton,
} from "@/app/redux/uiSlice/uiSlice";
import Select, {
  components,
  GroupBase,
  MenuListProps,
  OptionProps,
  StylesConfig,
} from "react-select";
import { motion } from "framer-motion";
const menuAnimation = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const CustomMenuList = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: MenuListProps<Option, IsMulti, Group>
) => {
  // Definir estilos con el tipo CSSProperties
  const menuListContainerStyles: CSSProperties = {
    maxHeight: "190px",
    overflowY: "auto" as const, // 'as const' ayuda a TypeScript a inferir el valor literal correcto
  };

  return (
    <div style={menuListContainerStyles}>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={menuAnimation}
        transition={{ duration: 0.3 }}
      >
        <components.MenuList {...props} />
      </motion.div>
    </div>
  );
};

const CustomOption = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: OptionProps<Option, IsMulti, Group>
) => <components.Option {...props} />;

const useStyles = makeStyles({
  sliderHorizontal: {
    width: "100%",
    "& .MuiSlider-thumb": {
      color: colors.pinkDark,
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: colors.pinkLight,
      },
      "&.Mui-active": {
        boxShadow: `0px 0px 0px 14px rgba(${colors.pinkLight}, 0.16)`,
      },
    },
    "& .MuiSlider-rail": {
      backgroundColor: "#000",
    },
    "& .MuiSlider-track": {
      backgroundColor: colors.pinkLight,
      border: "none", // Añadir esta línea para quitar el borde
    },
    "& .MuiSlider-valueLabel": {
      color: colors.pinkDark,
    },
    // Añadir esta regla para eliminar el borde alrededor del thumb
    "& .MuiSlider-thumb.Mui-focusVisible, & .MuiSlider-thumb:hover": {
      boxShadow: "none",
    },
  },
});

const CombinedFilterComponent: React.FC = () => {
  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [forceShowScrollbar, setForceShowScrollbar] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSidebarControlledByButton, setIsSidebarControlledByButton] =
    useState(false);

  const [isFilterOpen, setIsFilterOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth > 768 : false
  );

  const [isMobile, setIsMobile] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };
  const dispatch = useDispatch();
  const sidebarRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollY, setScrollY] = useState(0); // Nuevo estado para rastrear la posición del scroll
  const [isButtonVisible, setIsButtonVisible] = useState(false); // Nuevo estado para la visibilidad del botón

  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);
  const priceRange = useSelector((state: RootState) => state.filter.priceRange);
  const [isSticky, setIsSticky] = useState(false);
  const [isExpanded, setIsExpanded] = useState(
    typeof window !== "undefined" ? window.innerWidth > 768 : false
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuPortalTarget, setMenuPortalTarget] = useState<HTMLElement | null>(
    null
  );
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const [isMarcaMenuOpen, setIsMarcaMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const selectedColor = useSelector(
    (state: RootState) => state.filter.selectedColor
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.filter.selectedCategory
  );
  const selectedMarca = useSelector(
    (state: RootState) => state.filter.selectedMarca
  );

  const customStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      minWidth: "200px",
      margin: 0, // Eliminar cualquier margen
      padding: 0, // Eliminar cualquier padding
      borderRadius: "30px", // Más redondeado
      borderColor: state.isFocused ? "#FF59B4" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px #FF59B4" : provided.boxShadow,
      "&:hover": {
        borderColor: state.isFocused ? "#FF59B4" : provided.borderColor,
      },
      marginTop: 5, // Ajustar el margen superior del menú para reducir el espacio
    }),
    menu: (provided) => ({
      ...provided,
      position: "absolute",
      width: "100%",
      maxHeight: "200px",
      overflowY: "auto",
      zIndex: 9999,
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
      marginTop: "-7px", // Ajustar si es necesario para cerrar la brecha
    }),
    option: (provided, state) => ({
      ...provided,
      maxHeight: "350px",
      overflowY: "auto",
      borderRadius: "20px",
      backgroundColor: state.isFocused ? "rgba(255, 105, 180, 0.2)" : "rosa", // 'rosa' debería ser un color en formato válido
      color: state.isFocused ? "white" : "black", // Cambia el color del texto al pasar el ratón
      "&:hover": {
        backgroundColor: "#FFC1DC",
        color: "white",
      },
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "none", // Elimina cualquier límite en la altura
      overflowY: "hidden", // Oculta el scroll vertical
    }),
  };

  useEffect(() => {
    setMenuPortalTarget(document.getElementById("menu-portal"));
  }, []);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    dispatch(setSidebarExpanded(isExpanded));
  }, [isExpanded, dispatch]);
  const colorOptions = [
    { value: "", label: "Selecciona un color" },
    { value: "Blanco", label: "Blanco" },
    { value: "Negro", label: "Negro" },
    { value: "Nude", label: "Nude" },
    { value: "Rojo", label: "Rojo" },
    { value: "Rosa", label: "Rosa" },
    { value: "Azul", label: "Azul" },
    { value: "Marron", label: "Marron" },
  ];

  const marcaOptions = [
    { value: "", label: "Selecciona una marca" },
    { value: "Ruby Rous", label: "Ruby Rous" },
    { value: "Natacha nina", label: "Natacha nina" },
    { value: "Idraet", label: "Idraet" },
    { value: "Prodermic ", label: "Prodermic " },
    { value: "Liderma", label: "Liderma" },
  ];
  interface OptionType {
    value: string;
    label: string;
  }
  interface MyRange {
    min: number;
    max: number;
  }

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      const newRange: MyRange = { min: value[0], max: value[1] };
      dispatch(setPriceRange([newRange.min, newRange.max]));
    }
  };

  const handleFilterClick = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setLocalSearchTerm(newSearchTerm);
    dispatch(setSearchTerm(newSearchTerm));
  };

  useEffect(() => {
    const handleResize = () => {
      console.log("handleResize called");
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);

      // Si estamos en vista móvil y el teclado virtual está abierto, mantener el estado
      if (isMobileView && document.activeElement instanceof HTMLInputElement) {
        console.log("Keyboard is open - Keeping current sidebar state");
      } else {
        // Ajustar el estado basado en si estamos en vista móvil o no
        setIsExpanded(!isMobileView);
        setIsFilterOpen(!isMobileView);
      }
    };

    // Ejecutar inmediatamente para establecer el estado inicial basado en el ancho de la ventana
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFilterOpen]);
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      // Actualizar isExpanded y isFilterOpen solo en el montaje del componente
      if (isMobileView) {
        setIsExpanded(false);
        setIsFilterOpen(false);
      } else {
        setIsExpanded(true);
        setIsFilterOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleScroll = useCallback(() => {
    console.log("handleScroll called");

    const currentScrollY = window.scrollY;
    setIsButtonVisible(currentScrollY > 200);
    setScrollY(currentScrollY);
    setIsSticky(currentScrollY > 150);

    // Solo modificar isExpanded en escritorio
    if (!isMobile) {
      setIsExpanded(currentScrollY === 0);
    }
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, isMobile]);

  const updateSidebarState = useCallback(() => {
    console.log("updateSidebarState called");

    const atTop = window.scrollY === 0;

    if (isMobile) {
      // En móviles, el estado de apertura se maneja exclusivamente a través del botón.
      setIsFilterOpen(atTop);
    } else {
      // En escritorio, se puede manejar de forma diferente si es necesario
      setIsExpanded(atTop);
    }
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("scroll", updateSidebarState);
    return () => window.removeEventListener("scroll", updateSidebarState);
  }, [updateSidebarState, isMobile]); // Añadir 'updateSidebarState' aquí

  useEffect(() => {
    if (isMobile && isExpanded) {
      setForceShowScrollbar(true);

      // Resetear después de un breve período
      setTimeout(() => setForceShowScrollbar(false), 0);
    }
  }, [isMobile, isExpanded]);

  // Asegúrate de que isMobile esté definido y actualizado correctamente en tus dependencias de useEffect.
  const handleMouseEnter = () => {
    if (!isMobile && !isColorMenuOpen && !isMarcaMenuOpen) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (
      !isMobile &&
      !isColorMenuOpen &&
      !isMarcaMenuOpen &&
      window.scrollY !== 0
    ) {
      setIsExpanded(false);
    }
  };
  useEffect(() => {
    // Cuando se cierra el filtro, también asegúrate de que no esté expandido.
    if (!isFilterOpen) {
      setIsExpanded(false);
      setIsSubMenuOpen(false);
    }
  }, [isFilterOpen]);
  useEffect(() => {
    const updateScrollPosition = () => {
      requestAnimationFrame(() => {
        // Eliminar la actualización de isExpanded basada en la posición del scroll para móviles
        if (!isMobile) {
          setIsExpanded(window.scrollY === 0);
        }
      });
    };

    window.addEventListener("scroll", updateScrollPosition);
    return () => window.removeEventListener("scroll", updateScrollPosition);
  }, [isMobile]); // Asegurarse de que isMobile esté en la lista de dependencias

  useEffect(() => {
    if (!isExpanded) {
      setIsSelectMenuOpen(false);
      setIsColorMenuOpen(false); // Añadir esto
      setIsMarcaMenuOpen(false); // Añadir esto
    }
  }, [isExpanded]);
  useEffect(() => {
    const isMobileView = window.innerWidth <= 768;
    setIsMobile(isMobileView);
    if (isMobileView) {
      setIsExpanded(false);
      setIsFilterOpen(false);
    }
  }, []);
  const scrollToSubMenu = () => {
    if (sidebarRef.current) {
      const submenuElement = sidebarRef.current.querySelector(
        ".submenu"
      ) as HTMLElement;

      if (submenuElement) {
        const submenuTop = submenuElement.offsetTop;
        sidebarRef.current.scrollTo({
          top: submenuTop - 20, // ajusta este valor según necesites
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      {isMobile && isButtonVisible && (
        <HamburgerButton
          onClick={() => {
            const newState = !isFilterOpen;
            setIsFilterOpen(newState);
            setIsExpanded(newState);
            setIsSidebarControlledByButton(true);
            dispatch(setSidebarOpenedByButton(newState));
          }}
        >
          {isFilterOpen ? "Ocultar Filtros" : "Mostrar Filtros"}
        </HamburgerButton>
      )}
      <StickyFilterContainer
        ref={sidebarRef}
        isSticky={isSticky}
        isExpanded={isExpanded}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${isExpanded ? "expanded" : "collapsed"} ${
          isFilterOpen ? "open" : "closed"
        }`}
      >
        <SidebarTitle>Filtros</SidebarTitle>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <AiOutlineSearch
                size={24}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "grey",
                }}
              />
              <FilterInput
                style={{ paddingLeft: "40px" }}
                value={localSearchTerm}
                onChange={handleSearchInputChange}
                placeholder="Buscar productos..."
              />
            </div>

            <FilterSectionItem className="color-section">
              <label>Colores</label>
              {isMounted && (
                <Select
                  styles={customStyles}
                  options={colorOptions}
                  menuIsOpen={isColorMenuOpen}
                  onMenuOpen={() => setIsColorMenuOpen(true)}
                  onMenuClose={() => setIsColorMenuOpen(false)}
                  value={colorOptions.find(
                    (option) => option.value === selectedColor
                  )}
                  onChange={(newValue) => {
                    const option = newValue as OptionType | null;
                    dispatch(setSelectedColor(option?.value || ""));
                  }}
                  menuPortalTarget={menuPortalTarget}
                  placeholder="Selecciona un color"
                  components={{
                    Option: CustomOption, // Opcional, si tienes un componente de opción personalizado
                  }}
                />
              )}
            </FilterSectionItem>

            <FilterSectionItem className="brand-section">
              <label>Marcas</label>
              {isMounted && (
                <Select
                  styles={customStyles}
                  options={marcaOptions}
                  menuIsOpen={isMarcaMenuOpen}
                  onMenuOpen={() => setIsMarcaMenuOpen(true)}
                  onMenuClose={() => setIsMarcaMenuOpen(false)}
                  value={marcaOptions.find(
                    (option) => option.value === selectedMarca
                  )}
                  onChange={(newValue) => {
                    const option = newValue as OptionType | null;
                    dispatch(setSelectedMarca(option?.value || ""));
                  }}
                  menuPortalTarget={menuPortalTarget}
                  placeholder="Selecciona una marca"
                  components={{
                    MenuList: CustomMenuList, // Usar el componente personalizado
                    Option: CustomOption, // Opcional, si tienes un componente de opción personalizado
                  }}
                />
              )}
            </FilterSectionItem>
          </div>

          {!isMobile && (
            <div style={{ display: "flex", flexDirection: "column", flex: 2 }}>
              <FilterButtons>
                <button
                  className={selectedCategory === "Todos" ? "active" : ""}
                  onClick={() => handleFilterClick("Todos")}
                >
                  Todos los productos
                </button>
                <button
                  className={selectedCategory === "Ojos" ? "active" : ""}
                  onClick={() => handleFilterClick("Ojos")}
                >
                  <FaRegEye size={24} style={{ marginRight: "0px" }} />
                  Productos para ojos
                </button>
                <button
                  className={selectedCategory === "Rostro" ? "active" : ""}
                  onClick={() => handleFilterClick("Rostro")}
                >
                  <FaRegSmile size={24} style={{ marginRight: "0px" }} />
                  Productos para rostro
                </button>
              </FilterButtons>
              <div className="price-section" style={{ marginTop: "20px" }}>
                <PriceRangeContainer>
                  <Slider
                    className={classes.sliderHorizontal}
                    orientation="horizontal"
                    value={priceRange}
                    onChange={(event, newValue) => handleSliderChange(newValue)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100000}
                    track="inverted"
                  />
                  <PriceRangeInputs>
                    <PriceRangeInput
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        dispatch(
                          setPriceRange([+e.target.value, priceRange[1]])
                        )
                      }
                    />
                    <PriceRangeInput
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        dispatch(
                          setPriceRange([priceRange[0], +e.target.value])
                        )
                      }
                    />
                  </PriceRangeInputs>
                </PriceRangeContainer>
              </div>
            </div>
          )}

          {isMobile && (
            <>
              <FilterButtons>
                <button
                  onClick={() => {
                    toggleSubMenu();
                    scrollToSubMenu();
                  }}
                >
                  Categorías
                </button>{" "}
                {isSubMenuOpen && (
                  <div className="submenu">
                    <button
                      className={selectedCategory === "Todos" ? "active" : ""}
                      onClick={() => handleFilterClick("Todos")}
                    >
                      Todos los productos
                    </button>
                    <button
                      className={selectedCategory === "Ojos" ? "active" : ""}
                      onClick={() => handleFilterClick("Ojos")}
                    >
                      <FaRegEye size={24} style={{ marginRight: "0px" }} />
                      Productos para ojos
                    </button>
                    <button
                      className={selectedCategory === "Rostro" ? "active" : ""}
                      onClick={() => handleFilterClick("Rostro")}
                    >
                      <FaRegSmile size={24} style={{ marginRight: "0px" }} />
                      Productos para rostro
                    </button>
                  </div>
                )}
              </FilterButtons>
              <div className="price-section">
                <PriceRangeContainer>
                  <Slider
                    orientation="horizontal"
                    className={classes.sliderHorizontal}
                    value={priceRange}
                    onChange={(event, newValue) => handleSliderChange(newValue)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100000}
                  />
                  <PriceRangeInputs>
                    <PriceRangeInput
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        dispatch(
                          setPriceRange([+e.target.value, priceRange[1]])
                        )
                      }
                    />
                    <PriceRangeInput
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        dispatch(
                          setPriceRange([priceRange[0], +e.target.value])
                        )
                      }
                    />
                  </PriceRangeInputs>
                </PriceRangeContainer>
              </div>
            </>
          )}
        </div>
      </StickyFilterContainer>
    </>
  );
};

export default CombinedFilterComponent;
