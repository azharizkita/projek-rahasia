import { BareSphereProps } from "@/components/MainCanvas/Fragments/Sphere";
import { ControlModeProps } from "@/constants/controlMode";
import React, { createContext, useMemo, useReducer, useState } from "react";
import { Color, Vector3 } from "three";

type SelectOptionProps = { label: string; value: number };

interface GlobalStateProps {
  spheres: BareSphereProps[];
  selectedSphere: BareSphereProps;
  controlMode: ControlModeProps;
  lookAtVector: Vector3;
}

interface AddSphereActionProps {
  type: "addSphere";
  payload: BareSphereProps;
}

interface EditSphereActionProps {
  type: "editSphere";
  payload: BareSphereProps;
}

interface RemoveSphereActionProps {
  type: "removeSphere";
  payload: number;
}

interface SelectSphereActionProps {
  type: "selectSphere";
  payload: number | null;
}

interface ChangeControlModeActionProps {
  type: "changeControlMode";
  payload: ControlModeProps;
}

interface LookAtVectorActionProps {
  type: "lookAtVector";
  payload: Vector3;
}

interface ResetActionProps {
  type: "reset";
}

type GlobalActionProps =
  | AddSphereActionProps
  | EditSphereActionProps
  | RemoveSphereActionProps
  | SelectSphereActionProps
  | ChangeControlModeActionProps
  | LookAtVectorActionProps
  | ResetActionProps;

interface GlobalContextType extends GlobalStateProps {
  selectOptions: SelectOptionProps[];
  isFocused: Boolean;
  addSphere: (vector: Vector3) => void;
  editSphere: (sphere: BareSphereProps) => void;
  removeSphere: (sphereId: number) => void;
  selectSphere: (sphereId: number | null) => void;
  changeControlMode: (mode: ControlModeProps) => void;
  changeLookAtVector: (sphereId: number | null) => void;
  reset: () => void;
}

const defaultSelectedSphere: BareSphereProps = {
  color: new Color(),
  name: "",
  position: new Vector3(),
  sphereId: 0,
};

const defaultStateValue: GlobalStateProps = {
  spheres: [],
  selectedSphere: defaultSelectedSphere,
  controlMode: "NONE",
  lookAtVector: new Vector3(),
};

const defaultContextValue: GlobalContextType = {
  ...defaultStateValue,
  selectOptions: [],
  isFocused: false,
  addSphere: () => {},
  editSphere: () => {},
  removeSphere: () => {},
  selectSphere: () => {},
  changeControlMode: () => {},
  changeLookAtVector: () => {},
  reset: () => {},
};

const generateSelectOptionProps = (
  spheres: BareSphereProps[]
): SelectOptionProps[] => {
  return spheres.map(({ name, sphereId }, i) => ({
    label: name,
    value: sphereId,
  }));
};

const generateNewSphere = (
  vector: Vector3,
  sphereId: number
): BareSphereProps => {
  return {
    color: new Color(Math.random() * 0xffffff),
    name: `Sphere - ${sphereId}`,
    position: vector,
    sphereId,
  };
};

const reducer = (
  state: GlobalStateProps,
  action: GlobalActionProps
): GlobalStateProps => {
  switch (action.type) {
    case "addSphere": {
      state.spheres.push(action.payload);
      return { ...state };
    }
    case "editSphere": {
      state.spheres[action.payload.sphereId] = action.payload;
      return { ...state };
    }
    case "removeSphere": {
      state.spheres.splice(action.payload, 1);
      return { ...state };
    }
    case "selectSphere": {
      if (typeof action.payload === "number") {
        state.selectedSphere = state.spheres[action.payload];
        return { ...state };
      }
      state.selectedSphere = defaultSelectedSphere;
      return { ...state };
    }
    case "changeControlMode": {
      state.controlMode = action.payload;
      return { ...state };
    }
    case "lookAtVector": {
      state.lookAtVector = action.payload;
      return { ...state };
    }
    case "reset": {
      return {
        spheres: [],
        selectedSphere: defaultSelectedSphere,
        controlMode: "NONE",
        lookAtVector: new Vector3(),
      };
    }
    default:
      return state;
  }
};

export const GlobalContext = createContext(defaultContextValue);

export const GlobalContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, { ...defaultStateValue });
  const [isFocused, setIsFocused] = useState(false);
  const selectOptions = useMemo(() => {
    return generateSelectOptionProps(state.spheres);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.spheres.length]);

  const addSphere = (vector: Vector3) => {
    const sphereId = state.spheres.length;
    const payload = generateNewSphere(vector, sphereId);
    dispatch({ type: "addSphere", payload });
  };

  const editSphere = (sphere: BareSphereProps) => {
    dispatch({ type: "editSphere", payload: sphere });
  };

  const removeSphere = (sphereId: number) => {
    dispatch({ type: "removeSphere", payload: sphereId });
  };

  const selectSphere = (sphereId: number | null) => {
    dispatch({ type: "selectSphere", payload: sphereId });
  };

  const changeControlMode = (mode: ControlModeProps) => {
    dispatch({ type: "changeControlMode", payload: mode });
  };

  const changeLookAtVector = (sphereId: number | null) => {
    if (!sphereId) {
      setIsFocused(false);
      return;
    }
    const { position } = state.spheres[sphereId];
    dispatch({ type: "lookAtVector", payload: position });
    setIsFocused(true);
  };

  const reset = () => {
    dispatch({ type: "reset" });
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        selectOptions,
        isFocused,
        addSphere,
        editSphere,
        removeSphere,
        selectSphere,
        changeControlMode,
        changeLookAtVector,
        reset,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
