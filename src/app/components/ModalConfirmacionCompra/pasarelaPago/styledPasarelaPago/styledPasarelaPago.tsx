import styled from "styled-components";

export const StyledPasarelaPago = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 550px;
  margin: 40px auto;
  padding: 35px;
  border-radius: 15px;
  background-color: #fff5f5;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.25);
  font-family: "Poppins", sans-serif;

  h5.main-title {
    font-size: 2em;
    text-align: center;
    color: #e74c6f;
    margin-bottom: 30px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .section-card {
    padding: 20px;
    border-radius: 10px;
    background-color: #fef3f7;
    box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.25);

    h6 {
      font-size: 1.3em;
      margin-bottom: 20px;
      color: #e74c6f;
      border-bottom: 2px solid #f7c6d0;
      padding-bottom: 10px;
    }

    .user-details,
    .products-list,
    .shipping-details {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .shipping-details {
      p {
        margin-bottom: 10px;
      }
    }
  }

  p {
    font-size: 1.05em;
    color: #333;
    margin-bottom: 20px;
  }

  .products-list {
    list-style-type: none;
    padding: 0;
  }

  .products-list li {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }

  .product-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.25);
  }

  .MuiButton-root {
    align-self: center;
    margin: 10px 0;
    padding: 12px 25px;
    font-weight: 600;
    letter-spacing: 0.5px;
    background: linear-gradient(45deg, #f67280 30%, #e74c6f 90%);
    color: white;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.05);
      background: linear-gradient(45deg, #e55a5a 30%, #d43a3a 90%);
      box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.25);
    }
  }

  .notifications {
    gap: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .success-message,
  .error-message {
    text-align: center;
    font-weight: bold;
    font-size: 1.2em;
    margin-top: 25px;
  }

  .success-message {
    color: #2ecc71;
  }

  .error-message {
    color: #e74c3c;
  }

  .payment-actions {
    gap: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media screen and (max-width: 533px) {
    padding: 20px;
    margin: 20px;

    .section-card {
      padding: 10px;
    }
  }
`;

export default StyledPasarelaPago;
