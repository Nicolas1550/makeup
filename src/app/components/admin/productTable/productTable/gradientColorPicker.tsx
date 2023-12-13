import { useState, useEffect, useCallback } from "react";
import { ChromePicker, ColorResult } from "react-color";
import tinycolor from "tinycolor2";
import React, { CSSProperties } from "react";

// Estilos definidos
const colorPickerContainer: CSSProperties = {
  marginBottom: "20px",
  position: "relative",
  marginRight: "10px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Sombra sutil
};

const removeButtonStyle: CSSProperties = {
  position: "absolute",
  top: "-30px",
  right: "0",
  cursor: "pointer",
  background: "#e63946", // Rojo más moderno
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "5px 10px",
  transition: "background-color 0.3s",
};

const gradientCircleStyle: CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  margin: "5px",
  transition: "transform 0.3s",
};

const buttonStyle: CSSProperties = {
  marginTop: "20px",
  cursor: "pointer",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  background: "#264653", // Azul oscuro moderno
  color: "white",
  transition: "background-color 0.3s",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Sombra sutil
};

interface GradientColorPickerProps {
  onColorsChange: (colors: string[]) => void;
  onClose: () => void;
}

const GradientColorPicker: React.FC<GradientColorPickerProps> = ({
  onColorsChange,
  onClose,
}) => {
  const [colors, setColors] = useState<string[]>(["#ffffff", "#000000"]);
  const [gradientColors, setGradientColors] = useState<string[]>([]);

  const generateGradientBetweenColors = useCallback(
    (start: string, end: string, steps: number) => {
      const stepPercentage = 100 / (steps - 1);
      const gradientColors: string[] = [];

      for (let i = 0; i < steps; i++) {
        const mixedColor = tinycolor.mix(start, end, i * stepPercentage);
        gradientColors.push(mixedColor.toHexString());
      }

      return gradientColors;
    },
    []
  );

  useEffect(() => {
    const generateGradient = () => {
      let newGradientColors: string[] = [];
      for (let i = 0; i < colors.length - 1; i++) {
        newGradientColors = [
          ...newGradientColors,
          ...generateGradientBetweenColors(colors[i], colors[i + 1], 5),
        ];
      }
      setGradientColors(newGradientColors);
      onColorsChange(newGradientColors);
    };

    generateGradient();
  }, [colors, onColorsChange, generateGradientBetweenColors]);

  const handleColorChange = (color: ColorResult, index: number) => {
    const newColors = [...colors];
    newColors[index] = color.hex;
    setColors(newColors);
  };

  const addColorHandler = () => {
    setColors([...colors, "#888888"]);
  };

  const removeColorHandler = (index: number) => {
    if (colors.length > 2) {
      const newColors = [...colors];
      newColors.splice(index, 1);
      setColors(newColors);
    }
  };

  return (
    <div
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <h2 style={{ marginBottom: "15px" }}>Selector de Gradiente</h2>
      <p style={{ marginBottom: "20px" }}>
        Selecciona los colores base y ajusta como prefieras.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "25px",
        }}
      >
        {colors.map((color, index) => (
          <div key={index} style={colorPickerContainer}>
            <ChromePicker
              color={color}
              onChange={(colorResult) => handleColorChange(colorResult, index)}
            />
            {colors.length > 2 && (
              <button
                style={removeButtonStyle}
                onClick={() => removeColorHandler(index)}
              >
                X
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addColorHandler}
          style={{ ...buttonStyle, background: "#2a9d8f", marginTop: "0" }}
        >
          Agregar manejador de color
        </button>
      </div>
      <h3 style={{ marginBottom: "15px" }}>Previsualización del Gradiente</h3>
      <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
        {gradientColors.map((color, index) => (
          <div
            key={index}
            style={{ ...gradientCircleStyle, backgroundColor: color }}
          ></div>
        ))}
      </div>
      <button style={buttonStyle} onClick={onClose}>
        Aceptar
      </button>
    </div>
  );
};

export default GradientColorPicker;
