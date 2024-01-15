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
  const menuListContainerStyles: CSSProperties = {
    maxHeight: "190px",
    overflowY: "auto" as const,
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
      border: "none",
    },
    "& .MuiSlider-valueLabel": {
      color: colors.pinkDark,
    },
    "& .MuiSlider-thumb.Mui-focusVisible, & .MuiSlider-thumb:hover": {
      boxShadow: "none",
    },
  },
});
const isMobileDevice = () => window.innerWidth <= 768;

const CombinedFilterComponent: React.FC = () => {
  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [forceShowScrollbar, setForceShowScrollbar] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSidebarControlledByButton, setIsSidebarControlledByButton] =
    useState(false);

  const [isMobile, setIsMobile] = useState(isMobileDevice());
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };
  const dispatch = useDispatch();
  const sidebarRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollY, setScrollY] = useState(0);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);
  const priceRange = useSelector((state: RootState) => state.filter.priceRange);
  const [isSticky, setIsSticky] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!isMobile);
  const [isFilterOpen, setIsFilterOpen] = useState(!isMobile);
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
  const handleWindowChange = useCallback(() => {
    const isMobileView = isMobileDevice();
    setIsMobile(isMobileView);

    if (isMobileView) {
      setIsExpanded(false);
      setIsFilterOpen(false);
    } else {
      setIsExpanded(window.scrollY === 0);
      setIsFilterOpen(true);
    }
  }, []);
  const customStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      minWidth: "200px",
      margin: 0,
      padding: 0,
      borderRadius: "30px",
      borderColor: state.isFocused ? "#FF59B4" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px #FF59B4" : provided.boxShadow,
      "&:hover": {
        borderColor: state.isFocused ? "#FF59B4" : provided.borderColor,
      },
      marginTop: 0,
    }),
    menu: (provided) => ({
      ...provided,
      position: "absolute",
      width: "100%",
      maxHeight: "150px",
      overflowY: "auto",
      zIndex: 9999,
      borderRadius: "25px",
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
      marginTop: "0px",
      borderRadius: "25px",
    }),
    option: (provided, state) => ({
      ...provided,
      maxHeight: "150px",
      overflowY: "auto",
      borderRadius: "20px",
      backgroundColor: state.isFocused ? "rgba(255, 105, 180, 0.2)" : "rosa",
      color: state.isFocused ? "white" : "black",

      "&:hover": {
        backgroundColor: "#FFC1DC",
        color: "white",
      },
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "150px",
      overflowY: "visible",
      borderRadius: "25px",
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
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);

      // Si estamos en vista móvil y el teclado virtual está abierto, mantener el estado
      if (isMobileView && document.activeElement instanceof HTMLInputElement) {
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
    handleWindowChange();
    window.addEventListener("resize", handleWindowChange);
    window.addEventListener("scroll", handleWindowChange);

    return () => {
      window.removeEventListener("resize", handleWindowChange);
      window.removeEventListener("scroll", handleWindowChange);
    };
  }, [handleWindowChange]);

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
  }, [updateSidebarState, isMobile]);

  useEffect(() => {
    if (isMobile && isExpanded) {
      setForceShowScrollbar(true);

      // Resetear después de un breve período
      setTimeout(() => setForceShowScrollbar(false), 0);
    }
  }, [isMobile, isExpanded]);

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
  }, [isMobile]);

  useEffect(() => {
    if (!isExpanded) {
      setIsSelectMenuOpen(false);
      setIsColorMenuOpen(false);
      setIsMarcaMenuOpen(false);
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
          top: submenuTop - 20,
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
                    MenuList: CustomMenuList,
                    Option: CustomOption,
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
                    MenuList: CustomMenuList,
                    Option: CustomOption,
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
