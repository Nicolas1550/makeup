import React, { useEffect } from "react";
import {
  AssignButton,
  Label,
  Message,
  ModalBackground,
  ModalContent,
  RevokeButton,
  Title,
} from "./styleAssignRole";
import {
  fetchUsers,
  fetchHelpers,
  assignRole,
  revokeRole,
} from "../../../redux/usersSlice/usersSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store/appHooks";
import Select, { MultiValue, SingleValue, StylesConfig } from "react-select";
interface Props {
  onClose: () => void;
}
interface OptionType {
  label: string;
  value: string;
}
const customSelectStyles: StylesConfig<OptionType> = {
  control: (base) => ({
    ...base,
    backgroundColor: "#f7f2e8",
    borderColor: "#e5ded0",
    borderRadius: "5px",
    padding: "5px",
    fontFamily: "Georgia, serif",
    fontSize: "16px",
    color: "#6d6d6d",
    "&:hover": {
      borderColor: "#d3c9bb",
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#e5ded0" : "transparent",
    "&:active": {
      backgroundColor: "#d3c9bb",
    },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#6d6d6d",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};
const AssignRoleToUser: React.FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const helpers = useAppSelector((state) => state.users.helpers);
  const [selectedUser, setSelectedUser] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const [selectedHelper, setSelectedHelper] = React.useState<string | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchHelpers());
  }, [dispatch]);

  const error = useAppSelector((state) => state.users.error);
  const handleAssignRole = async () => {
    if (selectedUser) {
      const action = await dispatch(assignRole(selectedUser));
      if (assignRole.fulfilled.match(action)) {
        setMessage("Rol asignado exitosamente");
      } else {
        if (typeof action.payload === "string") {
          setMessage(action.payload);
        } else {
          setMessage("Error al asignar rol");
        }
      }
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleRevokeRole = async () => {
    if (selectedHelper) {
      const action = await dispatch(revokeRole(selectedHelper));
      if (revokeRole.fulfilled.match(action)) {
        setMessage("Rol revocado exitosamente");
      } else {
        setMessage(action.error.message || "Error al revocar el rol");
      }
      setTimeout(() => setMessage(null), 3000);
    }
  };
  const handleUserChange = (
    newValue: SingleValue<OptionType> | MultiValue<OptionType>
    // Se eliminó actionMeta ya que no se está usando
  ) => {
    if (newValue && !Array.isArray(newValue) && "value" in newValue) {
      setSelectedUser(newValue.value);
    } else {
      setSelectedUser(null);
    }
  };

  const handleHelperChange = (
    newValue: SingleValue<OptionType> | MultiValue<OptionType>
    // Se eliminó actionMeta ya que no se está usando
  ) => {
    if (newValue && !Array.isArray(newValue) && "value" in newValue) {
      setSelectedHelper(newValue.value);
    } else {
      setSelectedHelper(null);
    }
  };

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Title>Administrar Rol de Usuario</Title>
        {message && <Message error={!!error}>{message}</Message>}

        <div>
          <Label>Usuario:</Label>
          <Select
            value={
              selectedUser
                ? {
                    label:
                      users.find((user) => user.id.toString() === selectedUser)
                        ?.username || "",
                    value: selectedUser,
                  }
                : null
            }
            onChange={handleUserChange}
            options={users.map((user) => ({
              label: user.username,
              value: user.id.toString(),
            }))}
            placeholder="Selecciona un usuario"
            isSearchable={true}
            styles={customSelectStyles}
          />
          <AssignButton onClick={handleAssignRole}>
            Asignar rol de Ayudante
          </AssignButton>
        </div>

        <div>
          <Label>Ayudante:</Label>
          <Select
            value={
              selectedHelper
                ? {
                    label:
                      helpers.find(
                        (helper) => helper.id.toString() === selectedHelper
                      )?.username || "",
                    value: selectedHelper,
                  }
                : null
            }
            onChange={handleHelperChange}
            options={helpers.map((helper) => ({
              label: helper.username,
              value: helper.id.toString(),
            }))}
            placeholder="Selecciona un ayudante"
            isSearchable={true}
            styles={customSelectStyles}
          />
          <RevokeButton onClick={handleRevokeRole}>
            Revocar rol de Ayudante
          </RevokeButton>
        </div>
      </ModalContent>
    </ModalBackground>
  );
};

export default AssignRoleToUser;
