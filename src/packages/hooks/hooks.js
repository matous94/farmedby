import * as React from "react";

export function useSwitch(initialValue = false, initialState) {
  const [isOn, switchState] = React.useState(initialValue);
  const [state, setState] = React.useState(initialState);

  const switchOn = React.useCallback((stateUpdate) => {
    switchState(true);
    if (stateUpdate !== undefined) {
      setState(stateUpdate);
    }
  }, []);
  const switchOff = React.useCallback((stateUpdate) => {
    switchState(false);
    if (stateUpdate !== undefined) {
      setState(stateUpdate);
    }
  }, []);

  return React.useMemo(
    () => ({
      isOn,
      isOff: !isOn,
      status: isOn ? "on" : "off",
      state,
      setState,
      switchOn,
      switchOff,
      toggle: isOn ? switchOff : switchOn
    }),
    [isOn, switchOn, switchOff, state]
  );
}
