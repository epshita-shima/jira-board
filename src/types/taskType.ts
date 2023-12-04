import { ISingleTask } from "./singleTask";

export interface IAllTask {
  flower: Record<string, { name: string; listData: ISingleTask[] }>;
}
