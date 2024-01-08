import Link from "next/link";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { ProductType } from "../../../../redux/ProductsFilterSlice/filterSlice";
import {
  SectionTitle,
  SectionDescription,
} from "../styles/highlightedProductsStyles";
import {
  AddToCartButton,
  ProductCardContainer,
  ProductDescription,
  ProductImage,
  ProductName,
  ProductOptions,
  ProductPrice,
} from "../styles/styleProducts";
import {
  CarouselContainer,
  HighlightedProductCardContainer,
} from "../styles/stylesCarousel";
import {
  ProductContainer,
  ProductListContainer,
} from "../styles/stylesContainer";
import { RootState } from "../../../../redux/store/rootReducer";
import CombinedFilterComponent from "../../bar/sideBar/sideBar";
import { useHandleAddToCart } from "./cartActions";
import useProductSocket from "../products/useProductSocket";
import { useAppSelector } from "@/app/redux/store/appHooks";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BackgroundImageWithTitle from "./backgroundImageWithTitle";
import LoadingSpinner from "./loadingSpinner";

const getProductLink = (productId: number) => `/products/${productId}`;

const ProductCard: React.FC<ProductType & { highlighted?: boolean }> = ({
  id,
  imagen_url,
  nombre,
  precio,
  stock,
  descripcion,
  highlighted = false,
}) => {
  const handleAddToCart = useHandleAddToCart(); // Se llama al Hook en el nivel superior
  const product = { id, nombre, precio, imagen_url, stock, color: "" }; // Crear un objeto producto

  const CardContainer = (
    highlighted ? HighlightedProductCardContainer : ProductCardContainer
  ) as React.ElementType;

  return (
    <Link href={getProductLink(id)} passHref>
      <CardContainer
        className="product-card"
        style={{ textDecoration: "none" }}
      >
        <div style={{ cursor: "pointer" }}>
          <ProductImage
            src={
              imagen_url
                ? `http://localhost:3002${imagen_url}`
                : "/path_to_default_image.jpg"
            }
            alt={nombre}
          />

          <ProductName>{nombre}</ProductName>
        </div>
        <ProductPrice>${precio ? precio.toFixed(2) : "0.00"}</ProductPrice>
        {/* <ProductBrand>{marca}</ProductBrand>d */}
        <ProductDescription>{descripcion}</ProductDescription>
        {/*         <ProductColor>{color}</ProductColor>
         */}{" "}
        <ProductOptions className="productOptions">
          <AddToCartButton
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleAddToCart(product); // Pasar el producto al llamar a la función
            }}
          >
            Agregar al Carrito
          </AddToCartButton>
        </ProductOptions>
      </CardContainer>
    </Link>
  );
};

const HighlightedCarousel: React.FC<{ products: ProductType[] }> = ({
  products,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "80px",
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    focusOnSelect: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768, // tablet
        settings: {
          slidesToShow: 2,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 480, // mobile
        settings: {
          slidesToShow: 1,
          centerPadding: "30px",
        },
      },
    ],
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard {...product} />
          </div>
        ))}
      </Slider>
    </CarouselContainer>
  );
};

const Products: React.FC<{
  displayMode: "highlighted" | "fullList" | "both";
}> = ({ displayMode = "highlighted" }) => {
  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);
  const priceRange = useSelector((state: RootState) => state.filter.priceRange);
  const [visibleProducts, setVisibleProducts] = useState<ProductType[]>([]);
  const [itemsCount, setItemsCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const selectedColor = useSelector(
    (state: RootState) => state.filter.selectedColor
  );
  const selectedMarca = useSelector(
    (state: RootState) => state.filter.selectedMarca
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.filter.selectedCategory
  );
  // Función para cargar más productos
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  const [windowWidth, setWindowWidth] = useState<number>(0);
  useEffect(() => {
    // Actualizar el ancho de la ventana al montar y en cada cambio de tamaño de la ventana
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateWindowWidth);
    updateWindowWidth(); // Llamar inmediatamente para obtener el ancho inicial

    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);
  const isSidebarOpenedByButton = useSelector(
    (state: RootState) => state.ui.sidebarOpenedByButton
  );
  useEffect(() => {
    if (isSidebarOpenedByButton) {
      document.body.style.overflow = "hidden"; // Desactiva el scroll
    } else {
      document.body.style.overflow = "auto"; // Activa el scroll
    }
  }, [isSidebarOpenedByButton]);

  const { productList } = useProductSocket();
  const loadMoreProducts = () => {
    if (!hasMoreProducts) return;

    setLoading(true);
    // Aquí iría tu lógica de carga real, por ejemplo, una solicitud a una API
    setTimeout(() => {
      const newItemsCount = itemsCount + 6;
      setItemsCount(newItemsCount);

      // Suponiendo que productList contenga todos los productos disponibles
      // Aquí, compruebas si ya se han cargado todos
      if (newItemsCount >= productList.length) {
        setHasMoreProducts(false);
      }

      setLoading(false);
    }, 2000);
  };

  const titleVariants = {
    expanded: {
      marginBottom: windowWidth > 768 ? "2.5rem" : "1rem", // Ajustar según sea necesario
    },
    collapsed: {
      marginTop: windowWidth > 768 ? "2rem" : "2rem", // Ajustar según sea necesario
    },
  };
  const filterProducts = (products: ProductType[]): ProductType[] => {
    return products
      .filter(
        (product) =>
          !priceRange ||
          (product.precio >= priceRange[0] && product.precio <= priceRange[1])
      )
      .filter((product) => {
        if (selectedColor) {
          if (Array.isArray(product.color)) {
            return product.color.includes(selectedColor);
          } else {
            return product.color === selectedColor;
          }
        } else {
          return true;
        }
      })
      .filter((product) =>
        selectedMarca ? product.marca === selectedMarca : true
      )
      .filter((product) =>
        searchTerm
          ? product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      )
      .filter((product) =>
        selectedCategory && selectedCategory !== "Todos"
          ? product.categoria === selectedCategory
          : true
      );
  };

  const displayedProducts = filterProducts(productList);
  const displayedHighlightedProducts = productList.slice(0, 6);
  const isSidebarExpanded = useAppSelector(
    (state: RootState) => state.ui.isSidebarExpanded
  );

  // Variantes para la animación de margen superior
  const contentVariants = {
    expanded: {
      marginTop: "80px", // Ajusta este valor según la altura de tu sidebar expandido
    },
    collapsed: {
      marginTop: "0px",
    },
  };
  useEffect(() => {
    // Filtrar y luego establecer los productos visibles
    const newVisibleProducts = filterProducts(productList).slice(0, itemsCount);
    setVisibleProducts(newVisibleProducts);
  }, [productList, itemsCount]);
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMoreProducts) return;

      const lastProductLoaded = document.querySelector(
        ".product-card:last-child"
      ) as HTMLElement;
      if (lastProductLoaded) {
        const lastProductLoadedOffset =
          lastProductLoaded.offsetTop + lastProductLoaded.clientHeight;
        const pageOffset = window.scrollY + window.innerHeight;

        if (pageOffset > lastProductLoadedOffset) {
          loadMoreProducts();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMoreProducts, visibleProducts]);

  return (
    <motion.div
      animate={isSidebarExpanded ? "expanded" : "collapsed"}
      variants={contentVariants}
      transition={{ duration: 0.5, ease: "linear" }}
    >
      <BackgroundImageWithTitle></BackgroundImageWithTitle>
      <ProductContainer
        displayType={displayMode === "both" ? "fullList" : displayMode}
      >
        <CombinedFilterComponent />
        <motion.div
          variants={titleVariants}
          transition={{ duration: 0.5, ease: "linear" }}
        >
          <SectionTitle>Productos Destacados</SectionTitle>
          <SectionDescription>
            Descubre los productos que están marcando tendencia esta temporada.
          </SectionDescription>
        </motion.div>

        <HighlightedCarousel products={displayedHighlightedProducts} />

        {(displayMode === "fullList" || displayMode === "both") && (
          <ProductListContainer>
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
            {loading && <LoadingSpinner />}
          </ProductListContainer>
        )}
      </ProductContainer>
    </motion.div>
  );
};

export default Products;
