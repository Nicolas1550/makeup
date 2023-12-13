interface ColorCircleProps {
  color: string;
  stock: number;
  isEditing: boolean;
  onStockChange: (color: string, value: number) => void;
}

const ColorCircle: React.FC<ColorCircleProps> = ({
  color,
  stock,
  isEditing,
  onStockChange,
}) => {
  const isValidColor =
    /^#([0-9A-F]{3}){1,2}$/i.test(color) ||
    ["red", "blue", "green", "yellow", "black"].includes(color);
  const backgroundColor = isValidColor ? color : "gray";

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        marginRight: "10px",
      }}
    >
      <span
        style={{
          position: "relative",
          width: "40px",
          height: "40px",
          borderRadius: "8px",
          backgroundColor: backgroundColor,
          display: "inline-block",
          margin: "10px 5px",
          border: "none",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s",
          cursor: "pointer",
          background: `linear-gradient(135deg, ${backgroundColor} 0%, ${backgroundColor} 55%, #fff 60%)`,
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.boxShadow =
            "0 8px 16px rgba(0, 0, 0, 0.1)";
          (e.target as HTMLElement).style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.boxShadow =
            "0 4px 12px rgba(0, 0, 0, 0.05)";
          (e.target as HTMLElement).style.transform = "scale(1)";
        }}
      >
        {isEditing && (
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              onStockChange(color, value);
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              textAlign: "center",
            }}
          />
        )}
      </span>
    </div>
  );
};

export default ColorCircle;
