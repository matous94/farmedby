import * as React from "react";
import PropTypes from "prop-types";
import logger from "../logger";

enum StatusEnum {
  initial = "initial",
  loading = "loading",
  resolved = "resolved",
  error = "error"
}

function getInitialStatus({
  runOnMount,
  hasCache
}: {
  runOnMount: boolean;
  hasCache: boolean;
}): StatusEnum {
  let status = StatusEnum.initial;
  if (hasCache) status = StatusEnum.resolved;
  if (runOnMount && !hasCache) status = StatusEnum.loading;
  return status;
}

interface IUseAsync<TResult> {
  status: StatusEnum;
  isLoading: boolean;
  hasError: boolean;
  isResolved: boolean;
  isRefreshing: boolean;
  result: TResult | undefined;
  StatusEnum: typeof StatusEnum;
  execute: () => Promise<{ result?: TResult | undefined; error: boolean }>;
  refresh: () => Promise<{ result?: TResult | undefined; error: boolean }>;
  reset: () => void;
}

interface UseAsyncOptions<TResult> {
  cache?: TResult | undefined;
  hasCache?: boolean;
  runOnMount?: boolean;
  failOnRefresh?: boolean;
  ignoreMultipleCalls?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorLogger?: (...data: any[]) => void;
  errorMessage?: string;
  functionName?: string;
  useInitialFunction?: boolean;
}

export default function useAsync<TResult>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentAsyncFunction: (...args: any[]) => Promise<TResult>,
  {
    cache,
    hasCache = false,
    runOnMount = false,
    failOnRefresh = false,
    ignoreMultipleCalls = true,
    errorLogger = logger.error,
    errorMessage,
    functionName = currentAsyncFunction.name,
    useInitialFunction = false
  }: UseAsyncOptions<TResult> = {}
): IUseAsync<TResult> {
  const initialAsyncFunction = React.useRef(currentAsyncFunction).current;
  const asyncFunction = useInitialFunction
    ? initialAsyncFunction
    : currentAsyncFunction;

  const isExecuting = React.useRef(false);
  const [status, setStatus] = React.useState(
    getInitialStatus({ runOnMount, hasCache })
  );
  const [isRefreshing, setIsRefreshing] = React.useState(
    hasCache && runOnMount
  );
  const [result, setResult] = React.useState<TResult | undefined>(
    hasCache ? cache : undefined
  );

  const execute: IUseAsync<TResult>["execute"] = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (...args: any[]) => {
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
  const refresh: IUseAsync<TResult>["refresh"] = React.useCallback(
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

  return React.useMemo<IUseAsync<TResult>>(
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

export const useAsyncPropTypes = PropTypes.shape({
  status: PropTypes.string,
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
  isResolved: PropTypes.bool,
  isRefreshing: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  result: PropTypes.any,
  StatusEnum: PropTypes.shape({
    initial: PropTypes.oneOf(["initial"]),
    loading: PropTypes.oneOf(["loading"]),
    resolved: PropTypes.oneOf(["resolved"]),
    error: PropTypes.oneOf(["error"])
  }),
  execute: PropTypes.func,
  refresh: PropTypes.func,
  reset: PropTypes.func
});
