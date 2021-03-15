import * as React from "react";

export function useSwitch(initialValue) {
  const [isOn, set] = React.useState(initialValue);

  const switchOn = React.useCallback(() => set(true), []);
  const switchOff = React.useCallback(() => set(false), []);

  return React.useMemo(
    () => ({
      isOn,
      isOff: !isOn,
      switchOn,
      switchOff,
      status: isOn ? "on" : "off",
      toggle: isOn ? switchOff : switchOn
    }),
    [isOn, switchOn, switchOff]
  );
}
