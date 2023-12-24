import Link from "next/link";
import React from "react";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  // Agrega aquí cualquier otra prop que necesites
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ href, children }) => {
  return (
    <Link href={href} passHref>
      {children}
    </Link>
  );
};

export default ButtonLink;
