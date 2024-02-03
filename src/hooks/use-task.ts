import { useState } from "react";

type PerformFn<T extends unknown[]> = (...params: T) => Promise<void>;

export const useTask = <T extends unknown[]>(performFn: PerformFn<T>) => {
    const [isRunning, setIsRunning] = useState(false);

    const perform = async (...params: T) => {
        try {
            setIsRunning(true);
            await performFn(...params);
        // eslint-disable-next-line no-useless-catch
        } catch (err: unknown) {
            throw err;
        } finally {
            setIsRunning(false);
        }
    };

    return {
        isRunning,
        perform,
    }
}

export type UseTaskReturnType<T extends unknown[]> = {
    isRunning: boolean;
    perform: (...params: T) => Promise<void>;
};

