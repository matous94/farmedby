import * as React from "react";
import logger from "../logger";

const StatusEnum = Object.freeze({
  initial: "initial",
  loading: "loading",
  resolved: "resolved",
  error: "error"
});
function getInitialStatus({ runOnMount, cachedResult }) {
  let status = StatusEnum.initial;
  if (cachedResult) status = StatusEnum.resolved;
  if (runOnMount) status = StatusEnum.loading;
  return status;
}

export default function useAsync(
  asyncFunction,
  {
    runOnMount = false,
    cachedResult,
    memorizeFunction = false,
    errorLogger = logger.error,
    errorMessage,
    functionName = asyncFunction.name
  } = {}
) {
  // initial, loading, resolved, error
  const [status, setStatus] = React.useState(
    getInitialStatus({ runOnMount, cachedResult })
  );
  const [result, setResult] = React.useState(cachedResult);
  const memorizedFunction = React.useRef(
    memorizeFunction ? asyncFunction : undefined
  ).current;
  const functionToExecute =
    typeof memorizedFunction === "function" ? memorizedFunction : asyncFunction;

  const execute = React.useCallback(
    async (...args) => {
      try {
        setStatus(StatusEnum.loading);
        const response = await functionToExecute(...args);
        setResult(response);
        setStatus(StatusEnum.resolved);
        return { result: response, error: false };
      } catch (error) {
        errorLogger(
          errorMessage || `useAsync > execute > ${functionName} failed`,
          error
        );
        setStatus(StatusEnum.error);
        return { error: true };
      }
    },
    [errorLogger, errorMessage, functionToExecute, functionName]
  );

  React.useEffect(() => {
    if (runOnMount) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return React.useMemo(
    () => ({
      status,
      isLoading: status === StatusEnum.loading,
      hasError: status === StatusEnum.error,
      result,
      StatusEnum,
      execute,
      reset: () => {
        setStatus(StatusEnum.initial);
        setResult(undefined);
      }
    }),
    [status, result, execute]
  );
}
