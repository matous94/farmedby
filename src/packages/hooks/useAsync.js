import * as React from "react";
import logger from "../logger";

const StatusEnum = Object.freeze({
  initial: "initial",
  loading: "loading",
  resolved: "resolved",
  error: "error"
});
function getInitialStatus({ runIfEmpty, cachedResult }) {
  let status = StatusEnum.initial;
  if (cachedResult) status = StatusEnum.resolved;
  if (runIfEmpty && cachedResult == null) status = StatusEnum.loading;
  return status;
}

export default function useAsync(
  asyncFunction,
  {
    cachedResult,
    runIfEmpty = false,
    refreshCache = false,
    failOnRefresh = false,
    memorizeFunction = false,
    ignoreMultipleCalls = true,
    errorLogger = logger.error,
    errorMessage,
    functionName = asyncFunction.name
  } = {}
) {
  const isExecuting = React.useRef(false);
  // initial, loading, resolved, error
  const [status, setStatus] = React.useState(
    getInitialStatus({ runIfEmpty, cachedResult })
  );
  const [isRefreshing, setIsRefreshing] = React.useState(
    cachedResult && refreshCache
  );
  const [result, setResult] = React.useState(cachedResult);

  const memorizedFunction = React.useRef(
    memorizeFunction ? asyncFunction : undefined
  ).current;
  const functionToExecute =
    typeof memorizedFunction === "function" ? memorizedFunction : asyncFunction;

  const execute = React.useCallback(
    async (...args) => {
      if (ignoreMultipleCalls && isExecuting.current)
        return { result, error: false };
      isExecuting.current = true;
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
      } finally {
        isExecuting.current = false;
      }
    },
    [
      errorLogger,
      errorMessage,
      functionToExecute,
      functionName,
      ignoreMultipleCalls,
      result
    ]
  );
  const refresh = React.useCallback(
    async (...args) => {
      if (ignoreMultipleCalls && isExecuting.current)
        return { result, error: false };
      isExecuting.current = true;
      try {
        setIsRefreshing(true);
        const response = await functionToExecute(...args);
        setResult(response);
        setIsRefreshing(false);
        return { result: response, error: false };
      } catch (error) {
        errorLogger(
          errorMessage || `useAsync > refresh > ${functionName} failed`,
          error
        );
        setIsRefreshing(false);
        if (failOnRefresh) {
          setStatus(StatusEnum.error);
        }
        return { error: true };
      } finally {
        isExecuting.current = false;
      }
    },
    [
      errorLogger,
      errorMessage,
      functionToExecute,
      functionName,
      failOnRefresh,
      ignoreMultipleCalls,
      result
    ]
  );

  React.useEffect(() => {
    if (runIfEmpty && result == null) {
      execute();
    } else if (refreshCache && cachedResult !== null) {
      refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return React.useMemo(
    () => ({
      status,
      isLoading: status === StatusEnum.loading,
      hasError: status === StatusEnum.error,
      isResolved: status === StatusEnum.resolved,
      isRefreshing,
      result,
      StatusEnum,
      execute,
      refresh,
      reset: () => {
        setStatus(StatusEnum.initial);
        setResult(undefined);
      }
    }),
    [status, result, execute, refresh, isRefreshing]
  );
}
