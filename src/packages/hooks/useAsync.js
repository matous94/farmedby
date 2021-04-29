import * as React from "react";
import logger from "../logger";

const StatusEnum = Object.freeze({
  initial: "initial",
  loading: "loading",
  resolved: "resolved",
  error: "error"
});
function getInitialStatus({ runOnMount, hasCache }) {
  let status = StatusEnum.initial;
  if (hasCache) status = StatusEnum.resolved;
  if (runOnMount && !hasCache) status = StatusEnum.loading;
  return status;
}

export default function useAsync(
  asyncFunction,
  {
    cache,
    hasCache = false,
    runOnMount = false,
    failOnRefresh = false,
    ignoreMultipleCalls = true,
    errorLogger = logger.error,
    errorMessage,
    functionName = asyncFunction.name
  } = {}
) {
  const isExecuting = React.useRef(false);
  // initial, loading, resolved, error
  const [status, setStatus] = React.useState(
    getInitialStatus({ runOnMount, hasCache })
  );
  const [isRefreshing, setIsRefreshing] = React.useState(
    hasCache && runOnMount
  );
  const [result, setResult] = React.useState(hasCache ? cache : undefined);

  const execute = React.useCallback(
    async (...args) => {
      if (ignoreMultipleCalls && isExecuting.current) {
        logger.info("useAsync is executing, ignoring this call");
        return { result, error: false };
      }
      isExecuting.current = true;
      try {
        setStatus(StatusEnum.loading);
        const response = await asyncFunction(...args);
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
      asyncFunction,
      functionName,
      ignoreMultipleCalls,
      result
    ]
  );
  const refresh = React.useCallback(
    async (...args) => {
      if (ignoreMultipleCalls && isExecuting.current) {
        logger.info("useAsync is executing, ignoring this call");
        return { result, error: false };
      }
      isExecuting.current = true;
      try {
        setIsRefreshing(true);
        const response = await asyncFunction(...args);
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
      asyncFunction,
      functionName,
      failOnRefresh,
      ignoreMultipleCalls,
      result
    ]
  );

  React.useEffect(() => {
    if (runOnMount && hasCache) {
      refresh();
    } else if (runOnMount) {
      execute();
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
