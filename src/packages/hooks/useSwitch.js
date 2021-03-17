import * as React from "react";

export default function useSwitch(initialValue = false, initialState) {
  const initialValueRef = React.useRef(initialValue);
  const initialStateRef = React.useRef(initialState);
  const [isOn, switchState] = React.useState(initialValue);
  const [state, setState] = React.useState(initialState);

  const switchOn = React.useCallback((stateUpdate) => {
    switchState(true);
    if (typeof stateUpdate === "function") {
      setState(stateUpdate);
      return;
    }
    if (stateUpdate !== undefined) {
      setState(stateUpdate);
    }
  }, []);
  const switchOff = React.useCallback((stateUpdate) => {
    switchState(false);
    if (typeof stateUpdate === "function") {
      setState(stateUpdate);
      return;
    }
    if (stateUpdate !== undefined) {
      setState(stateUpdate);
    }
  }, []);
  const toggle = React.useCallback((stateUpdate) => {
    switchState((prevState) => !prevState);
    if (typeof stateUpdate === "function") {
      setState(stateUpdate);
      return;
    }
    if (stateUpdate !== undefined) {
      setState(stateUpdate);
    }
  }, []);
  const reset = React.useCallback(() => {
    switchState(initialValueRef.current);
    setState(initialStateRef.current);
  }, []);

  return React.useMemo(
    () => ({
      isOn,
      isOff: !isOn,
      reset,
      status: isOn ? "on" : "off",
      state,
      setState,
      switchOn,
      switchOff,
      toggle
    }),
    [isOn, reset, switchOn, switchOff, state, toggle]
  );
}
